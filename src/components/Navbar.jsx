import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.ivoire};
  box-shadow: 0 2px 8px rgba(90,60,40,0.04);
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100vw;
  overflow-x: hidden;
  @media (max-width: 880px) {
    padding: 1.5rem 0 2rem;
  }
`;
const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 880px) {
    flex-direction: column;
    align-items: flex-start;
    background: ${({ theme }) => theme.colors.ivoire};
    position: fixed;
    top: 0;
    left: 0;
    height: 65vh;
    width: 55vw;
    max-width: 320px;
    padding: 3.5rem 1.5rem 1.5rem 1.5rem;
    gap: 0.8rem;
    box-shadow: 2px 0 16px rgba(90,60,40,0.08);
    border-radius: 0 0 30px 0;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-120%)'};
    transition: transform 0.25s cubic-bezier(.4,0,.2,1);
    z-index: 100;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    height: 50vh;
  }
    @media (max-width: 400px) {
    padding: 2rem 1rem;
    height: 65vh;
  }
`;
const NavItem = styled.li`
  @media (max-width: 880px) {
    width: 100%;
  }
`;
const StyledLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.marronFonce};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.2s, color 0.2s;
  display: block;
  &.active, &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
    color: ${({ theme }) => theme.colors.blanc};
  }
  @media (max-width: 880px) {
    padding: 0.7rem 0.7rem;
    font-size: 1.1rem;
    width: 100%;
  }
`;
const Burger = styled.button`
  display: none;
  @media (max-width: 880px) {
    display: block;
    position: absolute;
    left: 1rem;
    top: 0.1rem;
    background: none;
    border: none;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.marronFonce};
    z-index: 200;
    cursor: pointer;
  }
`;
const Overlay = styled.div`
  display: none;
  @media (max-width: 880px) {
    display: ${({ open }) => open ? 'block' : 'none'};
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.18);
    z-index: 4;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <Nav>
      <Burger onClick={() => setOpen(o => !o)} aria-label="Ouvrir le menu">
        {open ? '✕' : '☰'}
      </Burger>
      <Overlay open={open} onClick={closeMenu} />
      <NavList open={open}>
        
        <NavItem>
          <StyledLink to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Accueil</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/dresscode" className={location.pathname === '/dresscode' ? 'active' : ''} onClick={closeMenu}>Dress code</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/agenda" className={location.pathname === '/agenda' ? 'active' : ''} onClick={closeMenu}>Agenda</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/rsvp" className={location.pathname === '/rsvp' ? 'active' : ''} onClick={closeMenu}>Confirmation</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/wishlist" className={location.pathname === '/wishlist' ? 'active' : ''} onClick={closeMenu}>Cadeaux</StyledLink>
        </NavItem>
        
        <NavItem>
          <StyledLink to="/hebergement" className={location.pathname === '/hebergement' ? 'active' : ''} onClick={closeMenu}>Hébergement</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/carte" className={location.pathname === '/carte' ? 'active' : ''} onClick={closeMenu}>Carte</StyledLink>
        </NavItem>
        
      </NavList>
    </Nav>
  );
};

export default Navbar; 