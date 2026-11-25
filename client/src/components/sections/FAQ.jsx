import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const MotionChevronDown = motion.create(ChevronDown)
import { cn } from '../../utils/cn'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { accordion } from '../../animations/variants.jsx'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const faqs = [
  {
    question: 'Can I import just one piece?',
    answer: 'Yes, for many products. Furniture like height-adjustable desks can be imported with a minimum order of one piece. Private-label products, such as car LED lights, usually start from around 500 units.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Sea freight from China to India typically takes 18–25 days port-to-port. Add 7–10 days for customs clearance and last-mile delivery. Total door-to-door: 25–35 days for sea, 5–7 days for air cargo. We provide exact timelines for every shipment.',
  },
  {
    question: 'Do you handle customs and GST?',
    answer: 'Yes, completely. We handle all documentation, duty calculation, IGST payment, and clearance at Indian ports. You receive the shipment at your door with all taxes paid. No surprise charges when the ship lands.',
  },
  {
    question: 'Do I need an Import Export Code (IEC)?',
    answer: "Yes, an IEC is mandatory for importing into India. It is a one-time registration with DGFT. If you don't have one, we can guide you through the online application process, which typically takes 2–3 working days.",
  },
  {
    question: 'Can I visit the factories myself?',
    answer: 'Absolutely. We organize guided business trips to the Canton Fair and factory visits in Guangzhou, Shenzhen, Yiwu, and Foshan. We handle visas, hotels, Indian food, translators, and transport. You just choose the factories.',
  },
  {
    question: "What's the best business to start by importing from China?",
    answer: 'It depends on your capital, market, and interests. High-margin categories include furniture (MOQ 1), EV components, specialized machinery, and private-label electronics. We offer free consulting to match you with the right opportunity.',
  },
]

function FAQItem({ faq, index, isInView, reduceMotion }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <StaggerItem index={index} variant="fast" delay={index * 0.06}>
      <motion.details
        open={isOpen}
        className={cn('faq-item card', isOpen && 'faq-item-open')}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.4 }}
      >
        <motion.summary
          className="flex items-center justify-between gap-4 cursor-pointer list-none p-6"
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          }}
          whileHover={reduceMotion ? undefined : { backgroundColor: '#fafafa' }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        >
          <motion.span className="text-body-lg font-medium text-text-primary">
            {faq.question}
          </motion.span>
          <MotionChevronDown
            className={cn('h-5 w-5 text-text-secondary flex-shrink-0', isOpen && 'rotate-180')}
            aria-hidden="true"
            initial={reduceMotion ? false : { rotate: 0 }}
            animate={isOpen && !reduceMotion ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.summary>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="px-6 pb-6 pt-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              <motion.p
                className="text-text-secondary leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.details>
    </StaggerItem>
  )
}

export function FAQ() {
  const reduceMotion = useReducedMotion()
  const { ref, isInView } = useInViewOnce({ triggerOnce: true, margin: '0px 0px -100px 0px', disabled: reduceMotion })

  return (
    <section
      ref={ref}
      id="faq"
      className="section bg-white faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="faq-heading"
        >
          <RevealText as="span" className="section-eyebrow" splitBy="words" stagger={0.05} delay={0.1}>
            FAQ
          </RevealText>
          <RevealText as="h2" id="faq-heading" splitBy="lines" stagger={0.12} delay={0.2}>
            Questions before you start?
          </RevealText>
        </motion.header>

        <StaggerContainer stagger={0.06} delayChildren={0.1}>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} isInView={isInView} reduceMotion={reduceMotion} />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}


