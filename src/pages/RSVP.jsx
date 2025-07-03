import React, { useState } from 'react';
import styled from 'styled-components';

const RSVPSection = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  min-height: 70vh;
  padding: 2.5rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 1.5rem 2rem 1.5rem;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    font-size: 2.6rem;
    text-align: center;
    margin-bottom: rem;
  }
`;
const Form = styled.form`
  background: ${({ theme }) => theme.colors.ivoire};
  border-radius: 18px;
  box-shadow: 0 2px 10px rgba(90,60,40,0.07);
  padding: 2.5rem 2rem;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  @media (max-width: 600px) {
    padding: 1.2rem 1.2rem;
    max-width: 98vw;
  }
`;
const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.caramel};
  font-size: 1.15rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;
const Textarea = styled.textarea`
  padding: 1rem;
  border-radius: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.caramel};
  font-size: 1.15rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;
const Button = styled.button`
  background: ${({ theme }) => theme.colors.terracotta};
  color: ${({ theme }) => theme.colors.blanc};
  border: none;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.caramel};
  }
`;


const AgendaLinks = styled.div`
  margin-top: 2.5rem;
  padding: 0rem 0rem 2.5rem 0rem;
  text-align: center;
  & > p {
    margin-bottom: 2rem;
  }
  @media (max-width: 600px) {
    margin-top: 2.5rem;
    & > p {
      margin-bottom: 4rem;
    }
    & > button, & > a {
      font-size: 1rem;

    }
  }
    @media (max-width: 400px) {
    margin-top: 2.5rem;
    & > p {
      margin-bottom: 4rem;
    }
    & > button, & > a {
      font-size: 0.8rem;

    }
  }
`;
const RSVP = () => {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <RSVPSection>
      <Title>Confirmation de présence</Title>
      <Form
        action="https://formspree.io/f/mqaqobqq"
        method="POST"
      >
        <Input type="text" name="Nom & Prénom" placeholder="Votre nom et prénom" required />
        <Input type="number" name="Nombre de personnes" min="1" max="10" placeholder="Nombre de personnes" required />
        <Textarea name="Message" rows={3} placeholder="Un petit mot. Pour plus d'une personne, merci de saisir leur nom (optionnel)"  />
        <Button type="submit">Je serai bien là !</Button>
        {sent && <div style={{color: '#5C3A2E'}}>Merci pour votre confirmation !</div>}
      </Form>
    
    </RSVPSection>
  );
};

export default RSVP; 