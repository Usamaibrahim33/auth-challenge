import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {

    const handleLogout = () => {
        localStorage.getItem('token');
        localStorage.clear()

        window.location.href = "http://localhost:5173"
    }

    return (
        <div className="bg-blue-700">
            <header className=" h-28 flex justify-between items-center text-white lg:mx-36">
                <h1 className="text-2xl font-bold text-wrap text-white ml-12"> Auth Challenges </h1>
                <ul className="flex  text-lg space-x-4  w-auto mr-12 ">
                    <li > <Link to='/'> Home </Link></li>
                    <li > <Link to='/login'> Login</Link></li>
                    <li> <Link to='/register'>Register</Link></li>
                    <li> <Link to='/movie-list' > Movies-List</Link></li>
                    <li onClick={handleLogout} className="cursor-pointer "> Logout</li>
                </ul>
            </header>
        </div>
    );
}


export default Header;