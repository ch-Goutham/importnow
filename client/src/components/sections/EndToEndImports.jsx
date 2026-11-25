import { motion, useReducedMotion } from 'framer-motion'
import { Factory, FileText, Search, ShieldCheck, Ship, Truck } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '../../utils/cn'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { cardHoverEnhanced, iconSpin, iconBounce, fadeInUp } from '../../animations/variants.jsx'

const steps = [
  {
    number: '01',
    title: 'Product sourcing',
    description: 'We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.',
    icon: <Search size={28} strokeWidth={2} />,
  },
  {
    number: '02',
    title: 'Factory inspection',
    description: 'Our team visits the factory in person. We check licences, samples and production capacity before you pay.',
    icon: <Factory size={28} strokeWidth={2} />,
  },
  {
    number: '03',
    title: 'Quality control',
    description: 'Pre-shipment checks with photo and video reports, done before the container is sealed.',
    icon: <ShieldCheck size={28} strokeWidth={2} />,
  },
  {
    number: '04',
    title: 'Shipping & logistics',
    description: 'Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.',
    icon: <Ship size={28} strokeWidth={2} />,
  },
  {
    number: '05',
    title: 'Customs clearance',
    description: 'Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.',
    icon: <FileText size={28} strokeWidth={2} />,
  },
  {
    number: '06',
    title: 'Doorstep delivery',
    description: 'From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.',
    icon: <Truck size={28} strokeWidth={2} />,
  },
]

function ServiceStepCard({ step, index, reduceMotion }) {
  return (
    <StaggerItem index={index} variant="scale" delay={index * 0.08}>
      <motion.article
        className="service-step-card card group"
        whileHover={reduceMotion ? undefined : { y: -12, boxShadow: '0 32px 64px -12px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(239 48 45 / 0.2)' }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <span className="service-step-number">{step.number}</span>
        <motion.div
          className="service-step-icon"
          aria-hidden="true"
          whileHover={reduceMotion ? undefined : { rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {step.icon}
        </motion.div>
        <h3 className="service-step-title">
          {step.title}
        </h3>
        <p className="service-step-description">
          {step.description}
        </p>
        <motion.div
          className="service-step-arrow"
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          whileHover={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', opacity: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.article>
    </StaggerItem>
  )
}

export function EndToEndImports() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="end-to-end"
      className="section bg-white"
      aria-labelledby="end-to-end-heading"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <RevealText as="span" className="section-eyebrow" splitBy="words" stagger={0.05} delay={0.1}>
            End-to-End Imports
          </RevealText>
          <RevealText as="h2" id="end-to-end-heading" className="end-to-end-heading" splitBy="lines" stagger={0.12} delay={0.2}>
            One team from the <span className="text-red">factory</span>
            <span className="end-to-end-line"><span className="text-red">floor</span> to your front door.</span>
          </RevealText>
          <RevealText as="p" className="end-to-end-description text-body-lg text-text-secondary mt-4" splitBy="lines" stagger={0.08} delay={0.4}>
            Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely.
          </RevealText>
        </div>

        <StaggerContainer stagger={0.08} delayChildren={0.1}>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <ServiceStepCard key={step.number} step={step} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}