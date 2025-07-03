import React from 'react';
import styled from 'styled-components';

const WishlistSection = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  min-height: 70vh;
  padding: 2.5rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 2rem 2rem 2rem;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
`;

const GiftLink = styled.a`
  color: ${({ theme }) => theme.colors.terracotta};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-decoration: underline;
  margin-top: 0.7rem;
  font-size: 1.15rem;
`;
const WishlistText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 1.35rem;
  max-width: 800px;
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    max-width: 95vw;
  }
`;
const Cagnotte = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-size: 1.25rem;
`;

const Wishlist = () => (
  <WishlistSection>
    <Title>Wishlist & Cadeaux</Title>
    <WishlistText>
      Votre présence à nos côtés est le plus beau des cadeaux. Toutefois, pour ceux qui souhaitent marquer ce moment d'une attention particulière, nous avons rassemblé quelques idées juste ici.   
    </WishlistText>
    <Cagnotte>
     <GiftLink href="https://www.ungrandjour.com/fr/mariage-larenne-brandon" target="_blank" rel="noopener noreferrer">Laisse ton empreinte</GiftLink>
    </Cagnotte>
  </WishlistSection>
);

export default Wishlist; 