/**
 * About Page - Presents the company, its team and values
 * @component
 */
import {
  Container,
  FeatureSection,
  TestimonialSection,
} from '@/app/_components/shared';
import { HeroDesktop, HeroMobile } from './_components/hero';
import {
  founderMeeting,
  heroContent,
  ourMission,
  partners,
} from './_components/hero/data';
import SectionBlock from './_components/section-block';
import { WordsPullUp } from '@/app/_components/animation';
import { TeamDesktop, TeamMobile } from './_components/team-block';
import { teamMembers } from './_components/team-block/data';

export default function AboutPage() {
  return (
    <main className="mt-20 flex flex-col gap-10" role="main" aria-label="About the company">
      {/* Hero Section - Main presentation */}
      <HeroDesktop content={heroContent} partners={partners} />
      <HeroMobile content={heroContent} partners={partners} />

      {/* Founders Meeting Section */}
      <SectionBlock data={founderMeeting} />
      
      {/* Our Mission Section */}
      <SectionBlock data={ourMission} reverse />

      {/* Team Section */}
      <section 
        className="bg-primary rounded-xl mx-2 py-10"
        aria-labelledby="team-heading"
      >
        <Container>
          <div className="text-white flex flex-col md:grid md:grid-cols-[1fr_0.5fr] gap-4 mb-10">
            <h2 id="team-heading" className="sr-only">Our Team</h2>
            <WordsPullUp
              text="Meet our team"
              containerClassName="justify-start"
              className="text-2xl md:text-4xl font-medium"
            />

            <p className="text-sm md:text-base">
              At Eat a box, our team is dedicated to promoting wellness through
              delicious and nutritious food.
            </p>
          </div>
        </Container>

        {/* Team display - Desktop and mobile versions */}
        <TeamDesktop teamMembers={teamMembers} />
        <TeamMobile teamMembers={teamMembers} />
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Testimonials Section */}
      <TestimonialSection />
    </main>
  );
}
