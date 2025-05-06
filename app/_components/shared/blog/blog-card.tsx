import { z } from '@zod/mini';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../../ui';

const BlogSchema = z.object({
  image: z.string(),
  title: z.string(),
  link: z.string(),
});

type BlogCardProps = z.infer<typeof BlogSchema>;

export default function BlogCard({ image, title, link }: BlogCardProps) {
  return (
    <Link href={link}>
      <article
        className="group space-y-4"
        role="article"
        aria-labelledby="blog-title"
        tabIndex={0}>
        <div
          className="relative w-full h-64 rounded-lg overflow-hidden"
          role="img"
          aria-label={title}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100% "
          />

          <Badge className="absolute top-2 right-2 bg-light-lime grid place-items-center text-light-lime-foreground">
            <span className=" text-lg font-bold">31</span>
            <span className="font-normal">Sept</span>
          </Badge>
        </div>

        <h3 id="blog-title" className="pl-2 text-lg font-semibold">
          {title}
        </h3>
      </article>
    </Link>
  );
}
