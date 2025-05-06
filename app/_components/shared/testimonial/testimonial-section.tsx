import Container from '../container'
import TestimonialCarousel from './testimonial-carousel'

export default function TestimonialSection() {
  return (
    <section className='bg-section-background md:rounded-4xl p-4 py-16 relative'>
        <Container>
            <TestimonialCarousel />
        </Container>
    </section>
  )
}
