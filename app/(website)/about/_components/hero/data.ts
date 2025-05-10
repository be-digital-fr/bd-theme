import { HeroContent, PartnerLogo, SectionBlock } from './types';

export const heroContent: HeroContent = {
  title: 'About Us – Fresh, Fast, and Hassle-Free Food Ordering',
  description:
    'We are a team of food enthusiasts who are passionate about providing the best food experience for our customers.',
  mainImage: {
    src: '/images/about/about-hero.png',
    alt: 'About Hero - Main image showing our food delivery service',
  },
  secondaryImage: {
    src: '/images/about/about-hero-2.png',
    alt: 'About Hero - Secondary image showing our team and service',
  },
};

export const partners: PartnerLogo[] = [
  {
    src: '/images/about/uber-eats.png',
    alt: 'Uber Eats - Food delivery partner',
  },
  {
    src: '/images/about/doordash.png',
    alt: 'Doordash - Food delivery partner',
  },
  {
    src: '/images/about/postmates.png',
    alt: 'Postmates - Food delivery partner',
  },
  {
    src: '/images/about/rappi.png',
    alt: 'Rappi - Food delivery partner',
  },
];

export const founderMeeting: SectionBlock = {
  image: '/images/about/founder-met.png',
  title: 'How our founder met',
  description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur occaecat cupidatat non ut enim ad minim veniam, quis nostrud exercitation sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaquis nostrud exercitation.',
};

export const ourMission: SectionBlock = {
  image: '/images/about/our-mission.png',
  title: 'Our Mission',
  description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur occaecat cupidatat non ut enim ad minim veniam, quis nostrud exercitation sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaquis nostrud exercitation.',
};

