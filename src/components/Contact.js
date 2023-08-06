
import React from 'react';

import { useTranslation } from 'react-i18next';

const Contact = () => {
   const {t} = useTranslation();
 return (
    <>
    <h1 style={{color:"green"}}> 
        {t("This is a Contact Page.")}</h1>
  </>
  )
};
  
export default Contact;