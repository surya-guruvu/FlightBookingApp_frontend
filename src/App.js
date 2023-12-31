import React, {Component} from 'react'

import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';


import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';
import LoginPage from './components/login';
import SignupPage from './components/Signup';
import ChangePassword from './components/ChangePassword';
import FileUpload from './components/FileUpload';
import UploadedFiles from './components/MyFiles';
import AddFlightForm from './components/AddFlightForm';
import { FormDataProvider } from './components/FormDataContext';
import Book from './components/Book';
import MyBookings from './components/MyBookings';
import FeedbackForm from './components/FeedbackForm';
import RemoveFlightForm from './components/RemoveFlightForm';
import NotificationComponent from './components/NotificationComponent';
import axios from 'axios';
import { getSocket, initializeSocket } from './socket';



const ContentContainer = styled.div`
  /* ... (other styles) */
  margin-top: 80px; /* Adjust the value to match your header's height */
`;



 





class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      console.log(token);
      axios
        .get('users/check_auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('YeahHome\n');
          // You may need to implement the initializeSocket function here
          
          initializeSocket(token);
          this.setState({ loggedIn: true });
        })
        .catch((err) => {
          localStorage.removeItem('jwtToken');
          this.setState({ loggedIn: false });
        });
    } else {
      this.setState({ loggedIn: false });
    }


  }

  render(){
    return (
      <>
        <FormDataProvider> 
        <Router>
        <Header/>
          <ContentContainer>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path="/about/:name" element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignupPage/>}/>
            <Route path='/change-password' element={<ChangePassword/>}/>
            <Route path='/file-upload' element={<FileUpload/>}/>
            <Route path='/files' element={<UploadedFiles/>}/>
            <Route path='/add-flight' element={<AddFlightForm/>}/>
            <Route path="/book/:flightId" element={<Book/>} />
            <Route path='/my_bookings' element={<MyBookings/>}/>
            <Route path="/feedback" element={<FeedbackForm/>} />
            <Route path="/remove-flight" element={<RemoveFlightForm/>}/>
            <Route path='/my_notifications' element={<NotificationComponent/>}/>
            <Route path='*' element={<PageNotFound/>}/> 
            
             
          </Routes>      
          </ContentContainer>
        </Router>
        </FormDataProvider>
	

      </>
    ) 
  }
}

export default App;


            
