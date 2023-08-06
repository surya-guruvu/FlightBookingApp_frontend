import React, { useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const About = () => {
    const {t} = useTranslation();

    const {name} = useParams();
    const navigate = useNavigate();
 
    console.log({name});

    useEffect(() => {
      
        if (name !== 'Ayrus') {
          navigate('/');
        }
      }, [name, navigate]);
  
    return (
    <>    
        <h1 style={{color:"green"}}> {t(`Hi I am ${name}`)}</h1>
    </>
    )
};


export default About;