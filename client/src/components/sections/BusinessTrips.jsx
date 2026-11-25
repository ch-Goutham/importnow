import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { CalendarDays, Car, Hotel, Languages, MapPin, Utensils, ArrowRight } from 'lucide-react'

const MotionArrowRight = motion.create(ArrowRight)
import { cn } from '../../utils/cn'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { iconBounce, iconSpin } from '../../animations/variants.jsx'

const locations = ['Guangzhou', 'Shenzhen', 'Yiwu', 'Foshan', 'Macau', 'Glass bridge']
const inclusions = [
  { icon: CalendarDays, text: 'Visa guidance & invitation letter' },
  { icon: Hotel, text: 'Hotels close to the fair' },
  { icon: Utensils, text: 'Indian food daily, veg & non-veg' },
  { icon: Languages, text: 'Guides & translators' },
  { icon: Car, text: 'Factory visits you choose' },
  { icon: MapPin, text: 'Sightseeing between markets' },
]

function InclusionItem({ inclusion, index, reduceMotion }) {
  const Icon = inclusion.icon
  return (
    <StaggerItem index={index} variant="slideLeft" delay={0.2 + index * 0.05}>
      <motion.div
        className="flex items-start gap-4"
        whileHover={reduceMotion ? undefined : { x: 8 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500"
          whileHover={reduceMotion ? undefined : { rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Icon aria-hidden="true" size={20} />
        </motion.div>
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {inclusion.text}
        </motion.span>
      </motion.div>
    </StaggerItem>
  )
}

function DateCard({ season, date, index, reduceMotion }) {
  return (
    <StaggerItem index={index} variant="scale" delay={0.3 + index * 0.08}>
      <motion.div
        className="trip-date-card"
        whileHover={reduceMotion ? undefined : { y: -4, boxShadow: '0 12px 24px -4px rgb(0 0 0 / 0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.strong
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {season}
        </motion.strong>
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {date}
        </motion.span>
      </motion.div>
    </StaggerItem>
  )
}

function TripHero({ reduceMotion }) {
  return (
    <StaggerItem index={0} variant="slideUp" className="trip-hero-item">
      <motion.article
        className="trip-hero"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
      >
        <motion.svg
          className="trip-skyline"
          viewBox="0 0 600 150"
          preserveAspectRatio="none"
          fill="rgba(40,20,50,.55)"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scaleY: 0.5 }}
          animate={{ opacity: 0.85, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <path d="M0 150V110h30V80h20v30h25V60h15V40h10v20h15v50h30V70h40v40h20V30l15-25 15 25v80h25V85h30v25h20V50h35v60h25V90h30V20h12V0h6v20h12v90h30V75h40v35h25V95h30v55z" />
        </motion.svg>
        <motion.span
          className="trip-eyebrow"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Canton Fair · Guangzhou
        </motion.span>
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Meet factories face to face. We handle everything else.
        </motion.h3>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Walk the world's biggest trade fair with a guide who speaks the language, then visit the factories you shortlist.
        </motion.p>
        <motion.div
          className="trip-pills"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {locations.map((location, index) => (
            <motion.span
              key={location}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
            >
              {location}
            </motion.span>
          ))}
        </motion.div>
      </motion.article>
    </StaggerItem>
  )
}

function TripInclusions({ reduceMotion }) {
  return (
    <StaggerItem index={1} variant="slideUp" className="trip-inclusions-item">
      <motion.article
        className="card trip-inclusions"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.5 }}
      >
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          What's included
        </motion.h3>
        <StaggerContainer stagger={0.05} delayChildren={0.1}>
          <div className="trip-inclusion-grid">
            {inclusions.map(({ icon: Icon, text }, index) => (
              <InclusionItem key={text} inclusion={{ icon: Icon, text }} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </StaggerContainer>
      </motion.article>
    </StaggerItem>
  )
}

function TripDepartures({ reduceMotion }) {
  return (
    <StaggerItem index={2} variant="slideUp" className="trip-departures-item">
      <motion.article
        className="card trip-departures"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.5 }}
      >
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Next departures
        </motion.h3>
        <StaggerContainer stagger={0.08} delayChildren={0.1}>
          <div className="trip-date-cards">
            <DateCard season="Spring" date="Canton Fair · April–May" index={0} reduceMotion={reduceMotion} />
            <DateCard season="Autumn" date="Canton Fair · October–November" index={1} reduceMotion={reduceMotion} />
          </div>
        </StaggerContainer>
        <motion.a
          href="#contact"
          className="btn-primary"
          whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Join the next trip
          <MotionArrowRight
            aria-hidden="true"
            initial={reduceMotion ? false : { x: -5 }}
            animate={reduceMotion ? false : { x: 0 }}
            whileHover={reduceMotion ? undefined : { x: 5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        </motion.a>
      </motion.article>
    </StaggerItem>
  )
}

export function BusinessTrips() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="trips" className="section bg-white" aria-labelledby="trips-heading">
      <div className="container">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          <RevealText as="span" className="section-eyebrow" splitBy="words" stagger={0.05} delay={0.1}>
            Business trips to China
          </RevealText>
          <RevealText as="h2" id="trips-heading" splitBy="lines" stagger={0.12} delay={0.2}>
            Your business trip doesn't have to <span className="text-red">feel like work.</span>
          </RevealText>
          <RevealText as="p" className="text-neutral-600" splitBy="lines" stagger={0.08} delay={0.4}>
            Guided trips to the Canton Fair, wholesale markets and factories you choose. Our clients often tell us it felt like a personal trip, not a business tour.
          </RevealText>
        </motion.header>

        <StaggerContainer stagger={0.1} delayChildren={0.1}>
          <div className="trips-grid">
            <TripHero reduceMotion={reduceMotion} />
            <TripInclusions reduceMotion={reduceMotion} />
            <TripDepartures reduceMotion={reduceMotion} />
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}