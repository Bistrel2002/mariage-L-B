import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  min-height: 70vh;
  padding: 2.5rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 0.2rem 2rem 0.2rem;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
`;
const MapFrame = styled.iframe`
  border: none;
  border-radius: 20px;
  width: 95vw;
  max-width: 700px;
  height: 400px;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    height: 80vw;
    border-radius: 10px;
    max-width: 90vw;
  }
`;
const Button = styled.a`
  background: ${({ theme }) => theme.colors.terracotta};
  color: ${({ theme }) => theme.colors.blanc};
  border-radius: 12px;
  padding: 1.1rem 2rem;
  text-decoration: none;
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-top: 0.7rem;
  transition: background 0.2s;
  @media (max-width: 600px) {
    padding: 0.7rem 1.1rem;
    font-size: 1rem;
    border-radius: 8px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.caramel};
  }
`;
const MapPage = () => (
  <Section>
    <Title>Carte & Localisation</Title>
    <MapFrame
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.019282019994!2d11.50207507586913!3d3.866666796134342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7e2e2e2e2e%3A0x7e2e2e2e2e2e2e2e!2sPalais%20des%20Congr%C3%A8s%2C%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1710000000000!5m2!1sfr!2scm"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Carte Palais des congrès Yaoundé"
    ></MapFrame>
    <Button href="https://www.google.com/maps/place/Hôtel+Franco,+Yaoundé,+Rue+Onembele+Nkou,+Yaoundé,+Cameroun/data=!4m2!3m1!1s0x108bcf63f89a3ed3:0x439a5a10a99b67b2?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjI3LjQYACCenQoqmQEsOTQyODA0ODYsOTQyNzUzMTcsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyNzQ4ODMsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsNDcwODQzOTMsOTQyMTMyMDAsOTQyNTgzMjVCAkZS&skid=c108360e-e8a1-44ca-a4e9-2dc6ccea8156&g_st=aw" target="_blank" rel="noopener noreferrer">
      Ouvrir dans Google Maps
    </Button>
  </Section>
);

export default MapPage; 