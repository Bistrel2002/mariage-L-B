import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

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
  margin-bottom: 3rem;
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

// Gallery Components
const GalleryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.8rem;
  text-align: center;
  margin: 2rem 0 1.5rem 0;
`;

const SliderWrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  height: 400px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(90,60,40,0.15);
  @media (max-width: 600px) {
    width: 95vw;
    height: 70vw;
    max-height: 350px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0; 
  left: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(.4,0,.2,1);
  transform: ${({ direction, $active, $hovered }) =>
    $active
      ? `translateX(0) scale(${$hovered ? 1.05 : 1})`
      : direction === 'left'
      ? 'translateX(-100%) scale(1)'
      : 'translateX(100%) scale(1)'
  };
  &.active {
    opacity: 1;
    z-index: 2;
  }
  &.prev {
    opacity: 0;
    z-index: 1;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  z-index: 3;
`;

const Dot = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.terracotta : 'rgba(255,255,255,0.6)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
  ${({ active }) => active && css`
    transform: scale(1.2); 
    box-shadow: 0 0 0 3px rgba(208, 129, 97, 0.3);
  `}
  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.terracotta};
  z-index: 3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
    color: #fff;
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }
  left: ${({ left }) => left ? '12px' : 'auto'};
  right: ${({ right }) => right ? '12px' : 'auto'};
`;

// Sample images for the gallery - you can replace these with your actual images
const galleryImages = [
  '/1000235346.jpg',
  '/1000235345.jpg', 
  '/1000235325.jpg',
];

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const timerRef = useRef();
  const [auto, setAuto] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => {
      setPrevIndex(index);
      setDirection('left');
      setIndex(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [index, images.length, auto]);

  const goTo = (i) => {
    setPrevIndex(index);
    setDirection(i > index ? 'left' : 'right');
    setIndex((i + images.length) % images.length);
  };
  
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <SliderWrapper
      onMouseEnter={() => { setAuto(true); setHovered(true); }}
      onMouseLeave={() => { setAuto(false); setHovered(false); }}
      onTouchStart={() => { setAuto(true); setHovered(true); }}
      onTouchEnd={() => { setAuto(false); setHovered(false); }}
    >
      <Arrow left onClick={prev} aria-label="Image précédente">‹</Arrow>
      <Arrow right onClick={next} aria-label="Image suivante">›</Arrow>
      {images.map((src, i) => (
        <Img
          key={src}
          src={src}
          alt={`Galerie ${i + 1}`}
          className={i === index ? 'active' : i === prevIndex ? 'prev' : ''}
          direction={direction}
          $active={i === index}
          $hovered={hovered && i === index}
        />
      ))}
      <Dots>
        {images.map((_, i) => (
          <Dot 
            key={i} 
            active={i === index} 
            onClick={() => goTo(i)} 
            aria-label={`Voir l'image ${i+1}`}
          />
        ))}
      </Dots>
    </SliderWrapper>
  );
}

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
    
    <GalleryTitle>Hotel Franco</GalleryTitle>
    <ImageSlider images={galleryImages} />
  </Section>
);

export default MapPage; 