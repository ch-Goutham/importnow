import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { cn } from '../../utils/cn'
import { ChevronLeft, ChevronRight, Package, Building2 } from 'lucide-react'

const MotionPackage = motion.create(Package)
const MotionBuilding2 = motion.create(Building2)
const MotionChevronLeft = motion.create(ChevronLeft)
const MotionChevronRight = motion.create(ChevronRight)
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { iconSpin, iconBounce, cardHoverEnhanced } from '../../animations/variants.jsx'

const caseStudies = [
  {
    id: 1,
    title: 'Complete villa furniture',
    subtitle: 'Foshan → Villa',
    description: 'Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.',
    tags: ['Full container', 'Door delivery'],
    category: 'Furniture',
    containerType: 'Full Container',
    deliveryType: 'Door Delivery',
  },
  {
    id: 2,
    title: 'Sagar Supermarket',
    subtitle: 'Yiwu → Adilabad',
    description: 'Complete supermarket stock sourced from Yiwu over video calls and delivered to the client\'s warehouse.',
    tags: ['Retail', 'Video sourcing'],
    category: 'Supermarket',
    containerType: 'Full Container',
    deliveryType: 'Warehouse Delivery',
  },
  {
    id: 3,
    title: 'Sreeman Convention Centre',
    subtitle: 'China → Convention',
    description: 'Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.',
    tags: ['Hospitality', 'Bulk order'],
    category: 'Hospitality',
    containerType: 'Full Container',
    deliveryType: 'Site Delivery',
  },
  {
    id: 4,
    title: 'Smart office desks',
    subtitle: 'China → Hyderabad',
    description: 'Motorised height-adjustable L-shaped desks, imported even as a single piece.',
    tags: ['MOQ 1', '~30 days'],
    category: 'Office Furniture',
    containerType: 'LCL / Single Piece',
    deliveryType: 'Door Delivery',
  },
]

function CaseStudyCard({ study, index, reduceMotion }) {
  const categoryIcons = {
    Furniture: Building2,
    Supermarket: Package,
    Hospitality: Building2,
    'Office Furniture': Building2,
  }

  const CategoryIcon = categoryIcons[study.category] || Package
  const MotionCategoryIcon = CategoryIcon === Package ? MotionPackage : MotionBuilding2

  return (
    <StaggerItem index={index} variant="scale" delay={index * 0.08}>
      <motion.article
        className={cn('card case-study-card group relative overflow-hidden h-full flex flex-col', reduceMotion ? '' : 'hover:border-red-500/30 hover:shadow-card-hover')}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.div
          className={`case-study-visual case-study-visual-${study.id} relative`}
          initial={reduceMotion ? false : { scale: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <MotionCategoryIcon
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={reduceMotion ? undefined : { rotate: 180, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <span className="case-study-route"><span aria-hidden="true">🇨🇳</span>{study.subtitle}</span>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="font-display font-semibold text-heading-md text-text-primary mb-3">
            {study.title}
          </h3>
          <p className="text-body text-text-secondary mb-6 flex-1">{study.description}</p>
          <motion.div className="case-study-tags">
            {study.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.article>
    </StaggerItem>
  )
}

function CarouselDots({ currentIndex, total, onClick, reduceMotion }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: total }, (_, i) => (
        <motion.button
          key={i}
          onClick={() => onClick(i)}
          className={cn(
            'h-2 w-2 rounded-full transition-all',
            i === currentIndex
              ? 'bg-brand-teal w-6'
              : 'bg-neutral-700 hover:bg-neutral-600'
          )}
          aria-label={`Go to case study ${i + 1}`}
          whileHover={reduceMotion ? undefined : { scale: 1.5 }}
          whileTap={reduceMotion ? undefined : { scale: 0.8 }}
        />
      ))}
    </div>
  )
}

export function CaseStudies() {
  const reduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }, [])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart === null) return
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
      setTouchStart(null)
    }
  }

  const visibleStudies = caseStudies.slice(currentIndex, currentIndex + 3)
  const remainingStudies = caseStudies.slice(0, currentIndex)

  return (
    <section
      id="case-studies"
      className="section bg-white relative"
      aria-labelledby="case-studies-heading"
    >
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="case-studies-heading flex items-center justify-between mb-12"
        >
          <div>
            <RevealText as="span" className="section-eyebrow mb-3" splitBy="words" stagger={0.05} delay={0.1}>
              Recently Delivered
            </RevealText>
            <RevealText as="h2" id="case-studies-heading" className="font-display font-bold text-display-sm sm:text-display-md text-neutral-950" splitBy="lines" stagger={0.12} delay={0.2}>
              Another container unloaded, <span className="text-red">another happy client.</span>
            </RevealText>
          </div>
          <motion.div
            className="hidden"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={prev}
              disabled={currentIndex === 0}
              whileHover={reduceMotion ? undefined : { scale: 1.1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className={cn('btn-secondary p-3 rounded-xl', currentIndex === 0 && 'opacity-50 cursor-not-allowed')}
              aria-label="Previous case study"
              aria-disabled={currentIndex === 0}
            >
              <MotionChevronLeft className="h-5 w-5" aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={next}
              disabled={currentIndex >= caseStudies.length - 2}
              whileHover={reduceMotion ? undefined : { scale: 1.1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className={cn('btn-secondary p-3 rounded-xl', currentIndex >= caseStudies.length - 2 && 'opacity-50 cursor-not-allowed')}
              aria-label="Next case study"
              aria-disabled={currentIndex >= caseStudies.length - 2}
            >
              <MotionChevronRight className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Carousel / Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="lg:hidden relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={reduceMotion ? false : { opacity: 1, x: 0 }}
            exit={reduceMotion ? false : { opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4 pb-4 scrollbar-hide overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
              {visibleStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
              {remainingStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={caseStudies.length - remainingStudies.length + index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
            <CarouselDots
              currentIndex={currentIndex}
              total={caseStudies.length - 2}
              onClick={setCurrentIndex}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </AnimatePresence>

        {/* Desktop Grid */}
        <StaggerContainer className="case-studies-grid hidden lg:grid" stagger={0.1} delayChildren={0.1}>
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} reduceMotion={reduceMotion} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}