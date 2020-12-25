import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';


function Login(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
   
    
    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        // axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
        //     setLoading(false);
        //     setUserSession(response.data.token, response.data.user);
        //     props.history.push('/dashboard');
        // }).catch(error => {
        //     setLoading(false);
        //     if (error.response.status === 401) setError(error.response.data.message);
        //     else setError("Something went wrong. Please try again later.");
        // });

        axios.get('https://jsonplaceholder.typicode.com/users', { username: username.value, password: password.value }).then(response => {
            setLoading(false);
            //console.log(response);
            var i=0;

            for (i = 0; i < response.length; i++) {
                //console.log(i);
                console.log(response[i]);
            } 

            //setUserSession(response.data.token, response.data.user);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }
   
    return (
        <form>
        <h3>Sign In</h3>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Submit</button>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
    </form>
    );
  }
   
  const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
   
  export default Login;

