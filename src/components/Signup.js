import React, {useEffect, useState } from 'react';
import axios from 'axios';

import { useForm } from "react-hook-form";

import { FormContainer,StyledForm } from './Styles/LoginPageStyles';
import {
  LoginPageContainer,
  Title,
  FormGroup,
  Input,
  Button,
  Message,
  ErrorMessage,
} from './Styles/LoginPageStyles'; // Import the remaining styled components from LoginPageStyles.js

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [results,setResults] = useState('');

  const [loggedIn,setLoggedIn] = useState(false);

  const handleLogout = ()=>{
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
  }
  
  useEffect(()=>{
    var token = localStorage.getItem('jwtToken');
    if(token){
      axios.get('users/check_auth',{headers : {Authorization: `Bearer ${token}`}})
      .then((res)=>{
        setLoggedIn(true);
      })
      .catch((err)=>{
        localStorage.removeItem('jwtToken');
        setLoggedIn(false);
      });
    }
    else{
      setLoggedIn(false);
    }
  },[]);

  const { register, handleSubmit , formState: { errors },reset} = useForm();

  const registerOptions = {
    username: { required: "Userame is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  const URL = "/users/signup";
  const finishSignup = (data) => {
    // Perform signup logic here
    setResults('');
    let credentials = {
        "email":data.email,
        "username":data.username,
        "password":data.password
    }
    axios.post(URL,credentials,{
        headers: {'Content-Type': 'application/json'}
        })
    .then((response) => {
        setResults(response.data.status);
        setErrorMessage('');
    })
    .catch((err)=>{
        setResults('');
        console.log(err);
        if (err.response) {
            console.error(err.response.data.status);
            setErrorMessage(err.response.data.status);
        }
        else{
            setErrorMessage(err.msg);
        }
        
    });
    console.log(data);
    reset();
  };
  const handleError=()=>{
    setResults('');
  }

  return (
    // <div className="signup-page">
    //   <h2>Sign Up</h2>
    //   <form className="signup-form" onSubmit={handleSubmit(finishSignup,handleError)}>
    //     <div className="form-group">
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name='email'
    //         {...register('email',registerOptions.email)}
    //       />
    //       <small className="text-danger">
    //         {errors?.email && errors.email.message}
    //       </small>
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="username">username:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         name='username'
    //         {...register('username',registerOptions.username)}
    //       />
    //       <small className="text-danger">
    //         {errors?.username && errors.username.message}
    //       </small>
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name='password'
    //         {...register('password',registerOptions.password)}
    //       />
    //       <small className="text-danger">
    //         {errors?.password && errors.password.message}
    //       </small>
    //     </div>
    //     <button type="submit">Sign Up</button>
    //   </form>
    //   {results && <div className='repsonse'>{results}</div>}
    //   {errorMessage && <div className="error-message">{errorMessage}</div>}
    // </div>


    <LoginPageContainer>
      {loggedIn?
      (<>
      <Message>You are logged In</Message>
      <Button onClick={handleLogout}>Logout</Button>
      </>):
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(finishSignup, handleError)}>
        <Title>Sign Up</Title>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              {...register('email', registerOptions.email)}
            />
            <ErrorMessage>{errors?.email && errors.email.message}</ErrorMessage>
          </FormGroup>
          <FormGroup>
            <label htmlFor="username">Username:</label>
            <Input
              type="text"
              id="username"
              name="username"
              {...register('username', registerOptions.username)}
            />
            <ErrorMessage>
              {errors?.username && errors.username.message}
            </ErrorMessage>
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              {...register('password', registerOptions.password)}
            />
            <ErrorMessage>
              {errors?.password && errors.password.message}
            </ErrorMessage>
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </StyledForm>
        <Message>{results}</Message>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormContainer>}
      </LoginPageContainer>
  );
};

export default SignupPage;
