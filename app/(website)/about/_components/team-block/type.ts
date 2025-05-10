import * as z from '@zod/mini'

const TeamMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  image: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;