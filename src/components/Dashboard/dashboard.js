import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [item, setItem] = useState("");
	const [itemsTracked, setItemsTracked] = useState([]);
	const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createItem();
        setItem("");
    };

    const createItem = () => {
		fetch("http://localhost:4000/api/create/item", {
			method: "POST",
			body: JSON.stringify({
				item,
				id: localStorage.getItem("_id"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.message);
				setItemsTracked(data.items);
			})
			.catch((err) => console.error(err));
	};

    useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("_id")) {
				navigate("/");
			} else {
				fetch("http://localhost:4000/api/all/items")
					.then((res) => res.json())
					.then((data) => setItemsTracked(data.items))
					.catch((err) => console.error(err));
			}
		};
		checkUser();
	}, [navigate]);

    return (
        <>
            <Navbar />
            <main className='dashboard'>
                <h2 className='dashTitle'>Include an Item to Track</h2>
                <form className='dashForm' onSubmit={handleSubmit}>
                    <div className='dashboard__container'>
                        <label htmlFor='item'>Item Name</label>
                        <input
                            type='text'
                            name='item'
                            required
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                        />
                    </div>
                    <button className='dashBtn'>CREATE THREAD</button>
                </form>
                <div className='thread__container'>
					{itemsTracked.map((item) => (
						<div className='thread__item' key={item.id}>
							<p>{item.title} {item.currentUser}</p>
							<div className='react__container'>
							</div>
						</div>
					))}
				</div>
            </main>
        </>
    );
};

export default Dashboard;