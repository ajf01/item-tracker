import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("_id");
		navigate("/");
    };

    return (
        <nav className='navbar'>
            <h2>Threadify</h2>
            <div className='navRight'>
                <button onClick={signOut}>Sign out</button>
            </div>
        </nav>
    );
};

export default Navbar;