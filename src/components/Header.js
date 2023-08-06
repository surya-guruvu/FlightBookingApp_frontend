import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
// import { useState,useEffect } from 'react';

const StyledHeader = styled.header`
  background: linear-gradient(135deg, #252850, #1b1d3e);
  padding: 20px;
  color: white;
  font-family: 'Poppins', sans-serif;

  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  margin-bottom: 80px;
`;

const CurveBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1b1d3e;
  border-radius: 0 0 50% 50% / 10px 10px 0 0;
  transform: translateY(100%);
  z-index: -1;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 0 20px;
  padding: 10px;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.3s, transform 0.2s;
  font-weight: 600;

  &:hover {
    border-bottom-color: #f39c12;
    transform: translateY(-2px);
  }

  &.active {
    border-bottom-color: #f39c12;
  }

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #f39c12;
    bottom: -5px;
    left: 0;
    transition: width 0.3s;
  }

  &:hover::before {
    width: 100%;
  }
`;

const Header = () => {
    const {t} = useTranslation();

    const [isFixed, setIsFixed] = useState(false);

    const handleScroll = () => {
      // Check the scroll position and set the fixed state accordingly
      setIsFixed(window.scrollY > 100); // Adjust the value as needed
    };
  
    // Attach scroll event listener when the component mounts
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        // Remove the event listener when the component unmounts
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
  const name = "Ayrus";

  return (
    <StyledHeader className={isFixed ? 'fixed' : ''}>
        <CurveBackground/>
      <Nav>
        <StyledNavLink to="/">{t('Home')}</StyledNavLink>
        <StyledNavLink to={`/about/${name}`}>{t('About')}</StyledNavLink>
        <StyledNavLink to="/contact">{t('Contact')}</StyledNavLink>
        <StyledNavLink to="/login">{t('Login')}</StyledNavLink>
        <StyledNavLink to="/signUp">{t('signUp')}</StyledNavLink>
        {/* <StyledNavLink to="/change-password">{t("Change password")}</StyledNavLink> */}
        <StyledNavLink to="/file-upload">{t('Upload Files')}</StyledNavLink>
        <StyledNavLink to="/files">{t('MyFiles')}</StyledNavLink>
        <StyledNavLink to="/add-flight">{t('Add Flight')}</StyledNavLink>
        <StyledNavLink to="/my_bookings">{"My Bookings"}</StyledNavLink>
        {/* ... other navigation links */}
      </Nav>
    </StyledHeader>
  );

}




export default Header;
