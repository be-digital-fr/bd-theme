import Container from '../container';
import SectionHeading from '../section-heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/app/_components/ui/carousel';
import BlogCard from './blog-card';

const blogPosts = [
  {
    title: 'The Benefits of Meal Prepping for a Healthy Lifestyle',
    link: '/blog/post-1',
    image: '/images/blog/blog-1.png',
  },
  {
    title: 'Quick and Nutritious Breakfast Ideas for Busy Professionals',
    link: '/blog/post-2',
    image: '/images/blog/blog-2.png',
  },
  {
    title: 'Understanding Macronutrients: A Guide to Balanced Meals',
    link: '/blog/post-3',
    image: '/images/blog/blog-3.png',
  },
  {
    title: 'Plant-Based Protein Sources for a Healthy Diet',
    link: '/blog/post-4',
    image: '/images/blog/blog-4.png',
  },
  {
    title: 'Smart Snacking: Healthy Options for Between Meals',
    link: '/blog/post-5',
    image: '/images/blog/blog-5.png',
  },
];

export default function BlogSection() {
  return (
    <Container className="space-y-14 pb-16">
      <SectionHeading title="Check Our Blog" link="/blog" />

      <div className="relative">
        <Carousel
          opts={{ align: 'start', loop: false }}
          className="w-full"
          aria-label="Blog posts carousel">
          <CarouselContent>
            {blogPosts.map((post) => (
              <CarouselItem key={post.link} className="basis-full sm:basis-1/2 md:basis-1/4">
                <BlogCard
                  title={post.title}
                  link={post.link}
                  image={post.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Container>
  );
}
