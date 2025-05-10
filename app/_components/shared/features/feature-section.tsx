import React from 'react';
import FeatureWithIcon from './feature-with-icon';
import Container from '../container';
import { StaggerContainer } from '../../animation';

export default function FeatureSection() {
  return (
    <Container>
      <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-10">
        <FeatureWithIcon
          icon="/icons/fast.svg"
          title="Fast & Reliable Delivery"
        />
        <FeatureWithIcon
          icon="/icons/secure.svg"
          title="Secure Multiple Payment"
          className="md:hidden"
        />
        <FeatureWithIcon
          icon="/icons/secure.svg"
          title="Secure Payment"
          className="hidden md:flex"
        />
        <FeatureWithIcon
          icon="/icons/healthy.svg"
          title="Healthy & Fresh Ingredients"
        />
        <FeatureWithIcon
          icon="/icons/click-and-collect.svg"
          title="Click & Collect"
        />
        <FeatureWithIcon
          icon="/icons/card.svg"
          title="Multiple Payment"
          className="hidden md:flex"
        />
      </StaggerContainer>
    </Container>
  );
}
