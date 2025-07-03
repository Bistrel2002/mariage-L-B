import React from 'react';
import styled from 'styled-components';

const GalleryWrapper = styled.section`
  background: ${({ theme }) => theme.colors.blanc};
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 2.2rem 2rem 0.9rem 2rem;
  }
`;
const Slider = styled.div`
  width: 95vw;
  max-width: 800px;
  height: 85vh;
  background: ${({ theme }) => theme.colors.ivoire};
  border-radius: 22px;
  box-shadow: 0 2px 12px rgba(90,60,40,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    height: 70vh;
    border-radius: 12px;
    max-width: 90vw;
  }
`;
const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.7rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Gallery = () => (
  <GalleryWrapper>
    <Slider>
      <Placeholder>Galerie photo (slider à venir)</Placeholder>
    </Slider>
  </GalleryWrapper>
);

export default Gallery; 