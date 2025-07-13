import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  min-height: 70vh;
  padding: 2.5rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 1.5rem 2rem ;
  }
`;
const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 2.6rem;
  margin-bottom: 1.5rem;
`;
const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 1.1rem;
  max-width: 800px;
  text-align: center;
  margin-bottom: 2rem;
`;
const Palette = styled.div`
  display: flex;
  gap: 2.5rem;
  margin: 2.5rem 0 2rem 0;
  @media (max-width: 600px) {
    gap: 1.5rem;
    padding: 1.5rem;
    justify-content: center;
  }
  @media (max-width: 400px) {
    gap: 0.8rem;
    padding: 1rem;
    justify-content: center;
  }
`;
const Color = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Swatch = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 12px;
  background: ${({ color }) => color};
  margin-bottom: 0.7rem;
  border: 2px solid #eee;
`;
const Label = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.marronFonce};
`;
const ContactBox = styled.div`
  background: ${({ theme }) => theme.colors.ivoire};
  border-radius: 14px;
  padding: 1.5rem 2rem;
  width: 700px;
  margin: 2.5rem 0 2rem 0;
  box-shadow: 0 2px 8px rgba(90,60,40,0.07);
  text-align: center;
  font-size: 1.15rem;
  @media (max-width: 600px) {
    width: 90vw;
    padding: 1.5rem 1.5rem 1.5rem 1rem;
    font-size: 1.0rem;
  }
`;

const GalleryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.7rem;
  text-align: center;
  margin: 3rem 0 1rem 0;
`;
const SliderWrapper = styled.div`
 
  width: 80vh;
  height: 120vh;
  position: relative;
  margin: 2.5rem auto 2.5rem auto;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 90vw;
    height: 130vw;
   
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  position: absolute;
  top: ; left: 0;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s, transform 0.5s cubic-bezier(.4,0,.2,1);
  transform: ${({ direction, $active, $hovered }) =>
    $active
      ? `translateX(0) scale(${$hovered ? 1.07 : 1})`
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
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  z-index: 3;
`;
const Dot = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.terracotta : '#ddd'};
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
  ${({ active }) => active && css`transform: scale(1.2); box-shadow: 0 0 0 2px #D0816133;`}
`;
const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.terracotta};
  z-index: 3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  transition: background 0.2s, opacity 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
    color: #fff;
    opacity: 1;
  }
  left: ${({ left }) => left ? '8px' : 'auto'};
  right: ${({ right }) => right ? '8px' : 'auto'};
`;
const IntroDress = styled.div`
  max-width: 800px;
  margin: 2.5rem auto 2rem auto;
  font-size: 1.18rem;
  color: ${({ theme }) => theme.colors.marronFonce};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.ivoire};
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 2px 8px rgba(90,60,40,0.07);
  border: 1.5px solid ${({ theme }) => theme.colors.caramel}22;
`;

const images = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/7.png',
  '/8.png',
  '/9.png',
  '/10.png',
];

function DressSlider({ images }) {
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
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [index, images.length, auto]);

  const goTo = (i) => {
    setPrevIndex(index);
    setDirection(i > index ? 'left' : 'right');
    setIndex((i + images.length) % images.length);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // For mobile: start auto on touch, stop on touch end
  const handleTouchStart = () => { setAuto(true); setHovered(true); };
  const handleTouchEnd = () => { setAuto(false); setHovered(false); };

  return (
    <SliderWrapper
      onMouseEnter={() => { setAuto(true); setHovered(true); }}
      onMouseLeave={() => { setAuto(false); setHovered(false); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Arrow left onClick={prev} aria-label="Image précédente">&#8592;</Arrow>
      <Arrow right onClick={next} aria-label="Image suivante">&#8594;</Arrow>
      {images.map((src, i) => (
        <Img
          key={src}
          src={src}
          alt="Dress inspiration"
          className={i === index ? 'active' : i === prevIndex ? 'prev' : ''}
          direction={direction}
          $active={i === index}
          $hovered={hovered && i === index}
          style={{ transitionDelay: i === index ? '0s' : '0s' }}
        />
      ))}
      <Dots>
        {images.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => goTo(i)} aria-label={`Voir l'image ${i+1}`}/>
        ))}
      </Dots>
    </SliderWrapper>
  );
}

const DressCode = () => (
  <Section>
    <Title>Élégance à l'africaine </Title>
    <IntroDress>
      Les familles <b style={{color: '#D08161'}}>KESSENG A ABOH</b> et <b style={{color: '#C68B59'}}>MANGWA</b> seront heureuses de célébrer avec vous la belle rencontre de leurs héritages culturels.<br /><br />
      En ce jour où les traditions <span style={{color: '#D08161', fontWeight: 600}}><i>Bafia(Diabô par Kikii)</i></span> et <span style={{color: '#C68B59', fontWeight: 600}}><i>Bassa'a(Ibong par Ndom)</i></span> s'uniront à travers l'amour de leur fils et de leur fille,<br /><br />
      Nous vous invitons à revêtir vos plus belles tenues et/ou accessoires traditionnels,<br />
      en vous inspirant de la palette de couleurs ci-dessous :
    </IntroDress>
    <Palette>
      <Color>
        <Swatch color="#D08161" />
        <Label>Terracotta</Label>
      </Color>
      <Color>
        <Swatch color="#5C3A2E" />
        <Label>Marron foncé</Label>
      </Color>
      <Color>
        <Swatch color="#C68B59" />
        <Label>Camel</Label>
      </Color>
      <Color>
        <Swatch color="#F6F1E9" />
        <Label>Ivoire</Label>
      </Color>
    </Palette>
    <ContactBox>
      <b>Pour acheter le pagne officiel :</b><br />
      Contactez&nbsp;:
      <ul style={{textAlign:'left', margin:'1em auto', maxWidth:400}}>
        <li>Mme MANGWA: +237 677535929</li>
        <li>Mme KESSENG: +237 677605851</li>
      </ul>
      <span style={{fontSize:'0.95em', color:'#C68B59'}}>Le pagne sera disponible à partir de septembre. Les photos du tissu seront ajoutées ici dès réception.</span>
    </ContactBox>
    <GalleryTitle>Quelques illustrations de l'élégance à l'Africaine</GalleryTitle>
    <DressSlider images={images} />
  </Section>
);

export default DressCode; 