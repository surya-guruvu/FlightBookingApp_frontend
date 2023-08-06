// import React from 'react';
// import { useTranslation } from 'react-i18next';


// const LanguageSwitcher = ()=>{
//     const {i18n} = useTranslation();

//     const changeLanguage = (lng)=>{
//         i18n.changeLanguage(lng);
//     }

//     return (
//         <>
//         <button onClick={()=>changeLanguage('en')}>English</button>
//         <button onClick={()=>changeLanguage('tel')}>Telugu</button>
//         </>
//     );
// }

// export default LanguageSwitcher;


import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSwitcherContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LanguageButton = styled.button`
  padding: 8px 15px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageSwitcherContainer>
      <LanguageButton onClick={() => changeLanguage('en')}>English</LanguageButton>
      <LanguageButton onClick={() => changeLanguage('tel')}>Telugu</LanguageButton>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher;
