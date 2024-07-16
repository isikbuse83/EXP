import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import{logout} from '../app/authenticationSlice';
import { NavLink } from "react-router-dom";
import React  from "react";

const Navbar = () => {
    const isLoggedIn = useSelector(state => state.autohenticationSlice);
    const dispatch = useDispatch();

    return <Nav className='navbar' style={{backgroundColor: '#e4fff2'}}>
        <h1 style={{fontFamily: 'Brush Sprint MT, cursive'}}> My Expenses</h1>
        {
            isLoggedIn
            ? <Button variant="link" href='/singin' onClick={() => dispatch(logout())}>Log Out</Button>
            : <div style={{display: 'flex'}}>
                <NavLink to = '/signup'>Sign Up</NavLink>
                <NavLink to ='/signin' style={{marginLeft:'1rem'}}> Sign In</NavLink>
            </div>
        }


</Nav>

};

export default Navbar;