import React from 'react'
import {NavLink} from "react-router-dom";

export const Navbar = ({user}) => {
    return (
        <nav className='px-l1'>
            <div className="nav-wrapper">
                {user ? <div className='brand-logo'>{user.firstName}</div> :
                    <NavLink to="/" className="brand-logo">Chat Application</NavLink>}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/chat">В чатик</NavLink></li>
                </ul>
            </div>
        </nav>

    )
}