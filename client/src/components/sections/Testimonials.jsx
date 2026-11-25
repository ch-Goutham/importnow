
import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from '../../utils/cn'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const MotionQuote = motion.create(Quote)

const testimonials = [
  {
    name: 'Sai',
    initials: 'S',
    role: 'Ad-tech startup · Siddipet',
    quote:
      'I came to source LED screens and electronics. The Guangzhou and Shenzhen markets were easy to navigate, and hotels, food and travel were all taken care of.',
  },
  {
    name: 'Mahender Reddy',
    initials: 'M',
    role: 'Canton Fair trip client',
    quote:
      'Twelve days covering the Canton Fair and factories of my choice. Visa, guidance, Indian food every day. It felt like a personal trip, not a business tour.',
  },
  {
    name: 'Sagar Supermarket',
    initials: 'SS',
    role: 'Retail · Adilabad',
    quote:
      'We picked our products on video calls, and the container came straight from Yiwu to our warehouse. The whole process was hassle-free.',
  },
]

function TestimonialCard({
  testimonial,
  index,
  reduceMotion,
}) {
  return (
    <StaggerItem
      index={index}
      variant="scale"
      delay={index * 0.08}
    >
      <motion.article
        className={cn(
          'testimonial-card card group relative overflow-hidden',
          !reduceMotion &&
          'hover:border-red-500/30 hover:shadow-card-hover'
        )}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <MotionQuote
          className="testimonial-quote-mark"
          aria-hidden="true"
          initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
        />

        <blockquote className="relative z-10">
          {testimonial.quote}
        </blockquote>

        <div className="testimonial-author relative z-10">
          <motion.span
            className="testimonial-avatar"
            aria-hidden="true"
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.1, rotate: 5 }
            }
            transition={{ duration: 0.3 }}
          >
            {testimonial.initials}
          </motion.span>

          <span>
            <strong>{testimonial.name}</strong>
            <small>{testimonial.role}</small>
          </span>
        </div>
      </motion.article>
    </StaggerItem>
  )
}

export function Testimonials() {
  const reduceMotion = useReducedMotion()

  const { ref, isInView } = useInViewOnce({
    triggerOnce: true,
    margin: '0px 0px -100px 0px',
    disabled: reduceMotion,
  })

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section bg-white testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        {/* Heading: Always visible, no nested animation */}
        <header className="testimonials-heading">
          <span className="section-eyebrow">
            <span className="eyebrow-line" />
            CLIENT STORIES
          </span>

          <h2 id="testimonials-heading">
            Heard from the people{' '}
            <span className="text-red">who</span> made the trip.
          </h2>
        </header>

        <StaggerContainer
          stagger={0.1}
          delayChildren={0.15}
        >
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
