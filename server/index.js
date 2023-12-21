{/*const firestore = require("../src/firebase.js");
const { addDoc, collection } = require("@firebase/firestore");*/}

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, addDoc, collection } = require('firebase-admin/firestore');
require('firebase/auth');
require('firebase/database');
const fireApp = initializeApp({
    credential: cert(require('./admin.json'))
});
const database = getFirestore(fireApp);
{/*const ref = collection(firestore, "auth");*/}
const docRef = database.collection('users');

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
const itemsTracked = [];
const threadList = [];
let currentUser = null;

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/login", async (req, res) => {
	const { email, password } = req.body;
	{/*let result = users.filter(
		(user) => user.email === email && user.password === password
    );*/}

    let exists = true;
    const snapshot = await database.collection('users').get();
    snapshot.forEach((doc) => {
        if (doc.id === email){
            if (doc.data().Password === password){
                exists = false;
            }
        }
    });

	{/*if (result.length !== 1) {*/}
    if (exists) {
		return res.json({
			error_message: "Incorrect credentials",
		});
	}

    {/*currentUser = result[0].username;*/}

	res.json({
		message: "Login successfully",
	});
});

app.post("/api/register", async (req, res) => {
	const { email, password, username } = req.body;
	const id = generateID();
	{/*const result = users.filter(
		(user) => user.email === email && user.password === password
    );*/}
    let exists = false;
    const snapshot = await database.collection('users').get();
    snapshot.forEach((doc) => {
        if (doc.id === email){
            exists = true;
        }
    });

	{/*if (result.length === 0) {*/}
    if (!exists) {
		const newUser = { id, email, password, username };

        {/*addDoc(ref, {"ID": id, "Email": email, "Password": password, "Username": username});*/}
        await docRef.doc(email).set({
            "ID": id,
            "Email": email,
            "Password": password,
            "Username": username
        });

		users.push(newUser);
		return res.json({
			message: "Account created successfully!",
		});
	}
	res.json({
		error_message: "User already exists",
	});
});

app.post("/api/create/item", async (req, res) => {
	const { item, userId } = req.body;
	let itemId = generateID();
	itemsTracked.unshift({
		id: itemId,
		title: item,
		userId,
        currentUser,
	});

    let currentUserItems = itemsTracked.filter(
		(iteTra) => iteTra.currentUser === currentUser
	);

	res.json({
		message: "Item created successfully!",
		items: currentUserItems,
	});
});

app.get("/api/all/items", (req, res) => {
    let currentUserItems = itemsTracked.filter(
		(iteTra) => iteTra.currentUser === currentUser
	);
	res.json({
		items: currentUserItems,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});