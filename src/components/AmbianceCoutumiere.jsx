import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.ivoire};
  padding: 2.5rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 98vw;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(90,60,40,0.07);
  @media (max-width: 600px) {
    height: 110px;
    border-radius: 8px;
  }
`;
const Message = styled.div`
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.1rem;
  margin-top: 1rem;
`;

// Images coutumières + images WhatsApp du dossier public
const images = [
  '/images/coutumier/photo1.jpg',
  '/images/coutumier/photo2.jpg',
  '/images/coutumier/photo3.jpg',
  '/images/coutumier/photo4.jpg',
];

const AmbianceCoutumiere = () => {
  // Vérifier si les images existent (optionnel, sinon afficher tout)
  const [loaded, setLoaded] = useState([]);
  useEffect(() => {
    Promise.all(images.map(src => new Promise(resolve => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    }))).then(results => setLoaded(results));
  }, []);

  const hasImages = loaded.some(Boolean);

  return (
    <Section>
      <Title>Ambiance coutumière</Title>
      {hasImages ? (
        <Grid>
          {images.map((src, i) => loaded[i] && <Img src={src} alt={"Ambiance coutumière " + (i+1)} key={src} />)}
        </Grid>
      ) : (
        <Message>Ajoutez vos photos coutumières dans <b>public/images/coutumier</b> ou d'autres images dans <b>public/</b> pour les voir ici !</Message>
      )}
    </Section>
  );
};

export default AmbianceCoutumiere; 