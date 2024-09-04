import  React,{ useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import {SignUp } from "../services/authentication";
import { useDispatch } from "react-redux";

const SignUpPage=() => {
const [username,setUsername] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [confirmPassword,setConfirmPassword] = useState('');
const [corporateAccount,setCorporateAccount]=useState(false);
const dispatch = useDispatch();

const handleSignUp = (event) => {
    event.preventDefault();
    SignUp(dispatch, { username, email, password, corporateAccount }); // Checkbox durumunu da gönder
};


    return(
        <div style={{ width: '30rem', margin: 'auto', paddingTop: '8px' }}>
        <Form onSubmit={handleSignUp}>
            <h5 style={{ textAlign: 'center' }}>Welcome to My Expenses</h5><br /><br />

        
<InputGroup className="mb-3">
<FormControl placeholder="Username"
    onChange={event => setUsername(event.target.value)}>
</FormControl>
</InputGroup>

<InputGroup className="mb-3">
<FormControl placeholder="Email"
    onChange={event => setEmail(event.target.value)}>
</FormControl>
</InputGroup>

<InputGroup className="mb-3">
<FormControl placeholder="Password" type="password"
    onChange={event => setPassword(event.target.value)}>
</FormControl>
</InputGroup>

<InputGroup className="mb-3">
<FormControl placeholder="ConfirmPassword" type="password"
    onChange={event => setConfirmPassword(event.target.value)}>
</FormControl>
</InputGroup>
<Button type="submit" variant='success' style={{margin: 'auto',display:'block' , width:'10rem'}}
disabled={password !== confirmPassword || password.length <=0} onClick={handleSignUp}>Sign Up
</Button>
<label>
  <input type="checkbox"  checked={corporateAccount} 
  onChange={() => setCorporateAccount(!corporateAccount)}/>
  <span className="checkmark"></span>
  Kurumsal hesap olsun istiyorum 
</label>



</Form>
    </div>
    )
};

export default SignUpPage;