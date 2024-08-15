
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React  from "react";

const Navbar = () => {
    const isLoggedIn = useSelector(state => state.autohenticationSlice);

    return (
        <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
            <h1 style={{ fontFamily: 'Brush Sprint MT, cursive' }}> My Expenses</h1>
            {
                isLoggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <NavLink exact style={{ marginLeft: '1rem' }} variant='link' to='/'>
                            Home
                        </NavLink>
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <NavLink exact to='/signup'>Sign Up</NavLink>
                        <NavLink exact to='/signin' style={{ marginLeft: '1rem' }}>Log Out</NavLink>
                        <NavLink exact to='/chat' style={{ marginLeft: '1rem', marginRight: '1rem' }}>AI Assistant</NavLink>
                    </div>
                )
            }
        </Nav>
    );
};

export default Navbar;
