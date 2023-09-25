import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import FlightSearchForm from './FlightSearchForm'; // Update the import path accordingly
import LanguageSwitcher from './LanguageSwitcher'; // Assuming you have a LanguageSwitcher component
import { useFormData } from './FormDataContext';
// import { socket } from './socket';
import axios from 'axios';
import { initializeSocket } from '../socket';


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); /* Subtract the header height from viewport height */
  padding: 20px 0; /* Adjust top and bottom padding as needed */
  background-size: 10px 20px;
  background-color: #c5d9e8;

  background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px); /* Pattern */


`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  max-width: 800px;
  text-align: center;
  background-color: #a8c0d9;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 24px;
`;

const Home = () => {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormData();

  // const [loggedIn,setLoggedIn] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);

  
  
  useEffect(()=>{
    var token = localStorage.getItem('jwtToken');
    if(token){
      console.log(token);
      axios.get('users/check_auth',{headers : {Authorization: `Bearer ${token}`}})
      .then((res)=>{
        console.log("YeahHome\n");
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

  

  return (
    <HomeContainer>
      <LanguageSwitcher />
      <ContentWrapper>
        <Title>{t('Welcome to Ayrus Flight Booking App')}</Title>
        <Subtitle>{t('Start searching for flights to your destination')}</Subtitle>
        <FlightSearchForm formData={formData} setFormData={setFormData}/>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
