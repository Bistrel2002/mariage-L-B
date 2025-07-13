import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.05);
  }
`;

// Hero Section
const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.ivoireDoux} 0%, ${({ theme }) => theme.colors.beige} 100%);
  padding: 5rem 1rem 3rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.rosePoudre}20 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 2rem 1.5rem;
  }
`;

const Names = styled.h1`
  font-family: ${({ theme }) => theme.fonts.elegant};
  color: ${({ theme }) => theme.colors.marronDoux};
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: 1px;
  animation: ${fadeInDown} 1.2s ease-out, ${float} 6s ease-in-out infinite 2s;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Details = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.marronDoux};
  font-size: 1.3rem;
  margin: 0.5rem 0;
  font-weight: 300;
  animation: ${fadeInLeft} 1s ease-out 0.4s both;
  
  &:nth-child(2) {
    animation: ${fadeInRight} 1s ease-out 0.6s both;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const IntroBox = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.blanc}95;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.rosePoudre}30;
  animation: ${fadeInUp} 1.2s ease-out 0.8s both, ${pulse} 4s ease-in-out infinite 3s;
  line-height: 1.6;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.rosePoudre}40;
  }
  
  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 1.5rem;
    font-size: 1.1rem;
  }
`;

// Carousel Section
const CarouselSection = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.beige};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.elegant};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const CarouselContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PhotoSection = styled.div`
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:nth-child(1) {
    animation-delay: 0.2s;
    animation-fill-mode: both;
  }
  
  &:nth-child(2) {
    animation-delay: 0.4s;
    animation-fill-mode: both;
  }
  
  &:nth-child(3) {
    animation-delay: 0.6s;
    animation-fill-mode: both;
  }
`;

const PhotoSectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.elegant};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  animation: ${fadeInDown} 0.8s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${({ theme }) => theme.colors.doreLeger};
    animation: ${slideIn} 1s ease-out 0.5s both;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 40px ${({ theme }) => theme.colors.rosePoudre}40;
  animation: ${slideIn} 1s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px ${({ theme }) => theme.colors.rosePoudre}50;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.currentIndex * 100}%);
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  height: 600px; 
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.beige}50;
  
  @media (max-width: 768px) {
    height: 500px;
    width: 100%;
  }
`;

const CarouselImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  animation: ${slideIn} 0.8s ease-out;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? props.theme.colors.doreLeger : props.theme.colors.blanc}80;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.doreLeger};
  }
`;

const CarouselNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.blanc}4;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(3px);
  
  ${props => props.direction === 'prev' ? 'left: 15px;' : 'right: 15px;'}
  
  &:hover {
    background: ${({ theme }) => theme.colors.blanc}35;
    transform: translateY(-50%) scale(1.05);
  }
  
  @media (max-width: 768px) {
    margin-left: 5px;
    margin-right: 5px;
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
    ${props => props.direction === 'prev' ? 'left: 12px;' : 'right: 12px;'}
  }
`;

// Story Sections
const StorySection = styled.section`
  padding: 5rem 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.ivoireDoux} 0%, ${({ theme }) => theme.colors.beige} 100%);
`;

const StoryContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StoryTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.elegant};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const StoryText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.marronDoux};
  text-align: justify;
  margin-bottom: 4rem;
  background: ${({ theme }) => theme.colors.blanc}80;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.rosePoudre}25;
  
  @media (max-width: 768px) {
    padding: 2rem;
    font-size: 1rem;
    text-align: left;
  }
`;

const TestimonialContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.colors.blanc}90;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px ${({ theme }) => theme.colors.rosePoudre}30;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    ${(props) =>
      props.align === 'right'
        ? 'right: 20px; left: auto;'
        : 'left: 20px; right: auto;'}
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.doreLeger};
    font-family: ${({ theme }) => theme.fonts.elegant};
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TestimonialTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.elegant};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TestimonialText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.marronDoux};
  font-style: italic;
`;

// Quote Section
const QuoteSection = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.rosePoudre}30;
  text-align: center;
`;

const Quote = styled.blockquote`
  font-family: ${({ theme }) => theme.fonts.elegant};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  &::before, &::after {
    content: '"';
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.doreLeger};
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const QuoteAuthor = styled.cite`
  display: block;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.marronDoux};
  font-style: normal;
`;

// Hook pour les animations au scroll
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.3, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Carousel Component
const PhotoCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <PhotoSection>
      <PhotoSectionTitle>{title}</PhotoSectionTitle>
      <CarouselWrapper>
        <CarouselTrack currentIndex={currentIndex}>
          {images.map((image, index) => (
            <CarouselSlide key={index}>
              <CarouselImage src={image} alt={`${title} ${index + 1}`} />
            </CarouselSlide>
          ))}
        </CarouselTrack>
        <CarouselNav direction="prev" onClick={goToPrevious}>
          ‹
        </CarouselNav>
        <CarouselNav direction="next" onClick={goToNext}>
          ›
        </CarouselNav>
        <CarouselControls>
          {images.map((_, index) => (
            <CarouselDot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </CarouselControls>
      </CarouselWrapper>
    </PhotoSection>
  );
};

// Ajout du composant AnimatedSection
const AnimatedSection = styled.section`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(60px)')};
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  will-change: opacity, transform;
`;

// Ajout du composant AnimatedTestimonialCard
const AnimatedTestimonialCard = ({ children, align = 'left', title }) => {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <TestimonialCard
      ref={ref}
      align={align}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0)'
          : align === 'left'
          ? 'translateX(-60px)'
          : 'translateX(60px)',
        transition: 'opacity 2.8s cubic-bezier(0.4,0,0.2,1), transform 2.8s cubic-bezier(0.4,0,0.2,1)',
        alignSelf: align === 'right' ? 'end' : 'start',
        textAlign: align === 'right' ? 'right' : 'left',
      }}
    >
      <TestimonialTitle style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>{title}</TestimonialTitle>
      {children}
    </TestimonialCard>
  );
};

// Ajout du composant pour la vidéo
const VideoSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.beige};
  padding: 3rem 0 2rem 0;
`;

const StyledVideo = styled.video`
  width: 80vw;
  max-width: 900px;
  border-radius: 18px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.rosePoudre}30;
  background: #000;
  outline: none;
  @media (max-width: 700px) {
    width: 98vw;
    max-width: 100%;
  }
`;

export default function Home() {
  // Images pour les carousels
  const nousImages = [
    '/Nous1.jpg', '/Nous2.jpg', '/Nous4.jpg', 
    '/Nous5.jpg', '/Nous6.jpg', '/Nous7.jpg', '/Nous8.jpg'
  ];
  
  const elleImages = ['/Elle1.jpg', '/Elle2.jpg', '/Elle3.jpg'];
  const luiImages = ['/Lui1.jpg', '/Lui2.jpg', '/Lui3.jpg'];

  // Hooks séparés pour chaque section
  const [nousGalleryRef, nousGalleryVisible] = useIntersectionObserver({ threshold: 0.02 });
  const [elleGalleryRef, elleGalleryVisible] = useIntersectionObserver({ threshold: 0.02 });
  const [luiGalleryRef, luiGalleryVisible] = useIntersectionObserver({ threshold: 0.02 });
  const [storyRef, storyVisible] = useIntersectionObserver({ threshold: 0.01 });

  // Empêcher le scroll horizontal et forcer la largeur sur Home uniquement
  React.useEffect(() => {
    const originalOverflowX = document.body.style.overflowX;
    const originalWidth = document.body.style.width;
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100vw';
    return () => {
      document.body.style.overflowX = originalOverflowX;
      document.body.style.width = originalWidth;
    };
  }, []);

  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Hero>
        <Names>Larenne MANGWA & Brandon ABOH</Names>
        <Details>11 Avril 2026 — 13h00</Details>
        <Details>Hôtel Franco Yaoundé</Details>
        <IntroBox>
          Nous avons la grande joie de vous inviter à notre <strong>mariage coutumier et civil</strong>.
          Cette célébration sera l'occasion de partager un moment unique, riche en traditions et en émotions, entourés de nos familles et amis.
          <br /><br />
          Merci de faire partie de cette belle aventure ! ✨
        </IntroBox>
      </Hero>

      {/* Section vidéo avant Notre Histoire */}
      <VideoSection>
        <StyledVideo
          src="/video.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      </VideoSection>

      {/* Notre Histoire avec animation scroll */}
      <AnimatedSection ref={storyRef} visible={storyVisible}>
        <StorySection>
          <StoryContainer>
            <StoryTitle>💫 Notre Histoire</StoryTitle>
            <StoryText>
            C'était un 17 décembre 2022, lors de l'arbre de Noël organisé par l'association des étudiants 
            camerounais de Rennes. La première rencontre se fait l'après-midi, autour d'un laser game. 
            Un bref échange, à peine un regard... chacun vaquait à ses équipes, sans se calculer plus que ça
              <br /><br />
              Mais le vrai tournant, c'est le soir. On se retrouve à la soirée… et là, impossible de faire 
              semblant : on se cherche, on se lance des pics, on se vanne comme si on se connaissait depuis 
              toujours. Une ambiance de vieux potes, naturelle, légère — et pourtant, quelque chose d'évident 
              se dessinait. Le déclic.
              <br /><br />
              Puis, plus rien... Monsieur a pris son temps. Mais lorsqu'il est finalement revenu vers elle, 
              ce fut avec une élégance rare. Galant, posé, attentionné, il s'est vite démarqué par son attitude 
              de gentleman.
              <br /><br />
              Le premier resto arrive en janvier, puis d'autres rendez-vous suivent. Larenne, elle, reste 
              catégorique : "pas envie d'être en couple pour le moment". Elle essaie tant bien que mal de le 
              rembarrer, mais ne peut s'empêcher de vouloir le garder près d'elle.
              <br /><br />
              Elle résistait, lui insistait — jusqu'au 15 mars 2023, la veille de son anniversaire. Ce jour-là, 
              avec un sourire (et une pointe d'assurance), il lui lance sa fameuse phrase devenue légendaire :
              <strong>« Je suis sur tes côtes. » 😂</strong>
              <br /><br />
              Depuis ce jour… ils ne se sont plus quittés.
            </StoryText>

            {/* Galerie "Nous" juste après Notre Histoire */}
            <AnimatedSection ref={nousGalleryRef} visible={nousGalleryVisible}>
              <CarouselSection>
                <CarouselContainer>
                  <PhotoCarousel images={nousImages} />
                </CarouselContainer>
              </CarouselSection>
            </AnimatedSection>

            <TestimonialContainer>
              <AnimatedTestimonialCard align="left" title="💕 Elle">
                <TestimonialText>
                Je ne l'ai pas vu venir, mais il s'est imposé naturellement.
                Charmant, éloquent, drôle, taquin… il a un charisme qu'on ne peut ignorer.
                Ce que j'ai découvert derrière cette assurance ? Une bienveillance immense, une générosité sincère, et une capacité rare à faire sentir qu'on est importante.
                Il m'a conquise sans pression, juste en étant lui.
                Aujourd'hui, il est mon roc, mon fou rire du jour, mon chez-moi.
                </TestimonialText>
                
                {/* Galerie "Elle" sous son texte */}
                <AnimatedSection ref={elleGalleryRef} visible={elleGalleryVisible}>
                  <CarouselSection style={{ background: 'transparent', padding: '2rem 0' }}>
                    <CarouselContainer>
                      <PhotoCarousel images={elleImages} />
                    </CarouselContainer>
                  </CarouselSection>
                </AnimatedSection>
              </AnimatedTestimonialCard>

              <AnimatedTestimonialCard align="right" title="💙 Lui">
                <TestimonialText>
                Elle est arrivée dans ma vie comme une évidence, un véritable OVNI chargé de mystère que mon cœur se hâtait de découvrir.

                Avec son intelligence, une rare finesse d'esprit mais aussi beaucoup d'humilité à propos, son humour, sa beauté naturelle venu tout droit du pays Bassa 'a… et ce léger strabisme fixant mon regard dans le sien, elle a brisé mon mur de bouclier avec acuité et à présent à ses côtés je suis comme un Viking sans défense.

                Avec elle, chaque jour est une expérience différente, une allégorie mêlant,

                Complicité
                Rire
                Découverte
                Profondeur
                Apprentissage…   

                C'est l'appui qui me manquait pour me rapprocher des voûtes célestes et tutoyer les étoiles.
                </TestimonialText>
                
                {/* Galerie "Lui" sous son texte */}
                <AnimatedSection ref={luiGalleryRef} visible={luiGalleryVisible}>
                  <CarouselSection style={{ background: 'transparent', padding: '2rem 0' }}>
                    <CarouselContainer>
                      <PhotoCarousel images={luiImages} />
                    </CarouselContainer>
                  </CarouselSection>
                </AnimatedSection>
              </AnimatedTestimonialCard>
            </TestimonialContainer>
          </StoryContainer>
        </StorySection>
      </AnimatedSection>

      {/* Citation finale */}
      <QuoteSection>
        <Quote>
          L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction.
          <QuoteAuthor>— Antoine de Saint-Exupéry</QuoteAuthor>
        </Quote>
      </QuoteSection>
    </div>
  );
} 