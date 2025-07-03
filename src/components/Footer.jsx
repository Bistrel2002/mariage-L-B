import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.ivoire};
  color: ${({ theme }) => theme.colors.marronFonce};
  text-align: center;
  padding: 1.5rem 0 1rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.caramel};
  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.terracotta};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1.2rem;
`;

const Footer = () => (
  <FooterContainer>
    <div>
    Mariage coutumier et civil de <Accent>ABOH Brandon & MANGWA Larenne</Accent>
    </div>
    <div style={{fontSize: '0.9em', marginTop: '0.3em'}}>© {new Date().getFullYear()} - {new Date().getFullYear() + 1} Tous droits réservés</div>
  </FooterContainer>
);

export default Footer; 