import React from 'react';
import styled from 'styled-components';

const StorySection = styled.section`
  background: ${({ theme }) => theme.colors.terracotta}11;
  padding: 3.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.5rem 1.5rem;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.5rem;
  margin-bottom: 1.3rem;
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;
const StoryText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 1.35rem;
  max-width: 800px;
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1rem;
    max-width: 98vw;
  }
`;
const Illustration = styled.div`
  width: 150px;
  height: 150px;
  background: ${({ theme }) => theme.colors.caramel}33;
  border-radius: 50%;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.caramel};
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    font-size: 1.7rem;
  }
`;

const Story = () => (
  <StorySection>
    <Illustration>💍</Illustration>
    <Title>Notre histoire</Title>
    <StoryText>
      Brandon et Larenne, deux âmes issues de cultures riches et différentes, se sont rencontrées lors d'un voyage inoubliable. Leur amour a grandi au fil des années, mêlant traditions, rires et rêves partagés. Aujourd'hui, ils vous invitent à célébrer leur union, symbole d'un pont entre les mondes Bafia et Bassa'a, sous le signe de l'élégance à l'africaine.
    </StoryText>
  </StorySection>
);

export default Story; 