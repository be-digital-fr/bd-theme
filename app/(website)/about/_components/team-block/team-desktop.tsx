import React from 'react';
import TeamCard from './team-card';
import { TeamMember } from './type';
import { Container } from '@/app/_components/shared';

export default function TeamDesktop({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <Container className="hidden md:grid grid-cols-4 justify-between gap-4">
      {teamMembers.map((member) => (
        <TeamCard key={member.name} {...member} />
      ))}
    </Container>
  );
}
