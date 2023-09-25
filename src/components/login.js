import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
import { getSocket, initializeSocket } from '../socket';

// import { socket } from './socket';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState('');
  const [loggedIn,setLoggedIn] = useState(false);
  
  useEffect(()=>{
    var token = localStorage.getItem('jwtToken');
    if(token){
      console.log(token);
      axios.get('users/check_auth',{headers : {Authorization: `Bearer ${token}`}})
      .then((res)=>{
        initializeSocket(token);
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

  useEffect(()=>{
    if(loggedIn){
      const token1 = localStorage.getItem('jwtToken');
      if(token1){
        axios.get("/notifications", { headers: { Authorization: `Bearer ${token1}` } })
        .then((response) => {
          const unreadCount = response.data.filter(notification => !notification.is_read).length;
          const socket = getSocket();
          socket.emit("notification_count",{
            un_read : unreadCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

  },[loggedIn]);

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).max(32).required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const URL = '/users/login';

  const finishLogin = (data) => {
    setResults('');
    let credentials = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    axios
      .post(URL, credentials, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setResults(response.data.status);
        var token1 = response.data.tok;
        localStorage.setItem('jwtToken', token1);
        setLoggedIn(true);
        setErrorMessage('');
        initializeSocket(token1);
      })
      .catch((err) => {
        setResults('');
        console.log(err);
        setErrorMessage('Invalid Email/Username/Password');
      });

    reset();
  };



  const handleError = () => {
    setResults('');
  };

  const handleLogout = ()=>{
    const socket = getSocket();
    socket.emit("notification_count",{
      un_read : -1,
    });
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
  }

  return (
    <LoginPageContainer>
      {loggedIn?
      (<>
      <Message>You are logged In</Message>
      <Button onClick={handleLogout}>Logout</Button>
      </>)
      :
      (<FormContainer>
        <StyledForm onSubmit={handleSubmit(finishLogin, handleError)}>
          <Title>Login</Title>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              {...register('email')}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </FormGroup>
          <FormGroup>
            <label htmlFor="username">Username:</label>
            <Input
              type="text"
              id="username"
              name="username"
              {...register('username')}
            />
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              {...register('password')}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </FormGroup>
          <Button type="submit">Login</Button>
        </StyledForm>
        {/* <Message>{results}</Message> */}
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormContainer>
      )}
    </LoginPageContainer>
  );
};

export default LoginPage;



















// // import React, { useState } from 'react';
// // import './LoginPage.css'; // Import the CSS file for styles
// // import axios from 'axios';
// // import * as yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup';

// // import { useForm } from "react-hook-form";


// import React, { useState } from 'react';
// import axios from 'axios';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from "react-hook-form";
// import { LoginPageContainer, LoginContentWrapper, Title, Form, FormGroup, Input, Button, Message, ErrorMessage } from './LoginPageStyles';

// const LoginPage = () => {
//   const [errorMessage, setErrorMessage] = useState('');
//   const [results,setResults] = useState('');

//   //We can mention our message, or default message will be used
//   const schema = yup.object().shape({
//     username : yup.string().required("username is required"),
//     email    : yup.string().email().required(),
//     password : yup.string().min(8).max(32).required(),
//   });

//   const { register, handleSubmit , formState: { errors },reset} = useForm({resolver: yupResolver(schema)});

//   const URL = "/users/login";
//   const finishLogin = (data) => {
//     // Perform signup logic here
//     setResults('');
//     let credentials = {
//         "email":data.email,
//         "username":data.username,
//         "password":data.password
//     }
//     axios.post(URL,credentials,{
//         headers: {'Content-Type': 'application/json'}
//         })
//     .then((response) => {
//         setResults(response.data.status);
//         var token1 = response.data.tok;
//         localStorage.setItem('jwtToken',token1);
//         // console.log(localStorage.getItem('jwtToken'));
//         setErrorMessage('');
//     })
//     .catch((err)=>{
//         setResults('');
//         console.log(err);
//         setErrorMessage("Invalid Email/Username/Password");
        
//     });
//     console.log(data);
//     reset();
//   };
//   const handleError=()=>{
//     setResults('');
//   }

//   return (
//     <div className="signup-page">
//       <h2>Login</h2>
//       <form className="signup-form" onSubmit={handleSubmit(finishLogin,handleError)}>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name='email'
//             {...register('email')}
//           />
//           <small className="text-danger">
//             {errors.email?.message}
//           </small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="username">username:</label>
//           <input
//             type="text"
//             id="username"
//             name='username'
//             {...register('username')}
//           />
//           <small className="text-danger">
//             {errors.username?.message}
//           </small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name='password'
//             {...register('password')}
//           />
//           <small className="text-danger">
//             {/* {errors?.password && errors.password.message} */}
//             {errors.password?.message}

//           </small>
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {results && <div className='repsonse'>{results}</div>}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// };

// export default LoginPage;