// LoginPageStyles.js

import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #d3e1eb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 80%;
`;

export const StyledForm = styled.form`
  /* ... (other styles) */
  input {
    padding: 8px; /* Adjust the padding to your preference */
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; /* Make all inputs stretch to full width */
    box-sizing: border-box; /* Ensure padding and border are included in width */
    /* Center the text horizontally */
    text-align: center;

  }
  

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content; /* Make the button width adjust to content */
    margin: 0 auto; /* Center the button horizontally */
  }
`;

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 20px 0;
  background-size: 10px 20px;
  background-color: #c5d9e8;
  background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px);
`;

export const LoginContentWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  background-color: #a8c0d9;
`;

export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const FormGroup = styled.div`
  width: 100%;
  text-align: left;
`;



export const Input = styled.input`
  width: 100%; /* Set the width to 100% */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Message = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
