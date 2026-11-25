
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ArrowRight, Route, Sofa, Store } from 'lucide-react'

import { cn } from '../../utils/cn'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const MotionArrowRight = motion.create(ArrowRight)
const MotionRoute = motion.create(Route)
const MotionStore = motion.create(Store)
const MotionSofa = motion.create(Sofa)

const guides = [
  {
    category: 'Import guides',
    date: '18 November 2026',
    title: 'How to Import from China to India in 2026: A Step-by-Step Guide',
    excerpt:
      'From getting your IEC to receiving the container at your door, here is the full import process explained in plain language for first-time importers.',
    readTime: '7 min read',
    icon: Route,
    artClass: 'guide-visual-dark',
  },
  {
    category: 'Wholesale markets',
    date: '12 November 2026',
    title:
      'Yiwu, Guangzhou or Foshan? Choosing the Right Chinese Market for Your Product',
    excerpt:
      'China has a different manufacturing hub for almost every industry. Going to the right one can cut your costs and save days of searching.',
    readTime: '6 min read',
    icon: Store,
    artClass: 'guide-visual-red',
  },
  {
    category: 'Product guides',
    date: '5 November 2026',
    title:
      'Importing Furniture from China: Costs, MOQ and What to Check',
    excerpt:
      'Premium designs at a better price. Here is what villa owners, offices and hotels should know before importing furniture from Foshan.',
    readTime: '6 min read',
    icon: Sofa,
    artClass: 'guide-visual-deep-red',
  },
]

function GuideCard({ guide, index, shouldShow, reduceMotion }) {
  const Icon = guide.icon

  const MotionIcon =
    Icon === Route
      ? MotionRoute
      : Icon === Store
        ? MotionStore
        : MotionSofa

  const visible = { opacity: 1, y: 0, x: 0 }

  const hidden = {
    opacity: 0,
    y: 10,
    x: -10,
  }

  return (
    <StaggerItem
      index={index}
      variant="scale"
      delay={reduceMotion ? 0 : index * 0.08}
    >
      <motion.article
        className={cn(
          'guide-card card group relative overflow-hidden',
          !reduceMotion &&
          'hover:border-red-500/30 hover:shadow-card-hover'
        )}
        initial={false}
        animate={shouldShow ? visible : hidden}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        {/* Guide visual */}

        <motion.div
          className={`guide-visual ${guide.artClass} relative`}
          initial={false}
          animate={{ opacity: 1 }}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <motion.span
            className="guide-category"
            initial={false}
            animate={shouldShow ? visible : hidden}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
          >
            {guide.category}
          </motion.span>

          <motion.span
            className="guide-route"
            aria-label="China to India"
            initial={false}
            animate={shouldShow ? visible : hidden}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : 0.05,
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          >
            <b>🇨🇳</b>
            <i>→</i>
            <b>🇮🇳</b>
          </motion.span>

          <MotionIcon
            aria-hidden="true"
            size={48}
            initial={false}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={
              reduceMotion ? undefined : { rotate: 180, scale: 1.1 }
            }
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          />
        </motion.div>

        {/* Guide content */}

        <div className="guide-content">
          <motion.h3
            initial={false}
            animate={shouldShow ? visible : hidden}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : 0.1,
            }}
          >
            {guide.title}
          </motion.h3>

          <motion.p
            className="guide-date"
            initial={false}
            animate={shouldShow ? visible : hidden}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : 0.15,
            }}
          >
            {guide.date}
            <span> · </span>
            {guide.readTime}
          </motion.p>

          <motion.p
            className="guide-excerpt"
            initial={false}
            animate={shouldShow ? visible : hidden}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : 0.2,
            }}
          >
            {guide.excerpt}
          </motion.p>

          <motion.a
            href="#guides"
            className="guide-read-more flex items-center gap-2"
            initial={false}
            animate={shouldShow ? visible : hidden}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : 0.25,
            }}
          >
            Read more

            <MotionArrowRight
              aria-hidden="true"
              initial={false}
              animate={{ x: 0 }}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            />
          </motion.a>
        </div>
      </motion.article>
    </StaggerItem>
  )
}

export function ImportGuides() {
  const reduceMotion = useReducedMotion()

  const { ref, isInView } = useInViewOnce({
    triggerOnce: true,
    margin: '0px 0px -100px 0px',
    disabled: reduceMotion,
  })

  // Ensure content is visible when reduced motion is enabled.
  const shouldShow = reduceMotion || isInView

  const visible = { opacity: 1, y: 0, x: 0 }

  const hidden = {
    opacity: 0,
    y: 24,
    x: 20,
  }

  return (
    <section
      ref={ref}
      id="guides"
      className="section bg-white"
      aria-labelledby="guides-heading"
    >
      <div className="container">
        {/* Section heading */}

        <motion.header
          initial={false}
          animate={shouldShow ? visible : hidden}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
          }}
          className="guides-heading"
        >
          <div>
            <RevealText
              as="span"
              className="section-eyebrow"
              splitBy="words"
              stagger={0.05}
              delay={0.1}
            >
              Import guides
            </RevealText>

            <RevealText
              as="h2"
              id="guides-heading"
              splitBy="lines"
              stagger={0.12}
              delay={0.2}
            >
              Learn before you import.
            </RevealText>

            <RevealText
              as="p"
              className="text-neutral-600"
              splitBy="lines"
              stagger={0.08}
              delay={0.4}
            >
              Practical guides on sourcing, shipping, customs and business
              ideas from China.
            </RevealText>
          </div>

          <motion.a
            href="#guides"
            className="btn-secondary"
            initial={false}
            animate={shouldShow ? visible : hidden}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : 0.2,
            }}
          >
            View all articles

            <MotionArrowRight
              aria-hidden="true"
              initial={false}
              animate={{ x: 0 }}
              whileHover={reduceMotion ? undefined : { x: 5 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            />
          </motion.a>
        </motion.header>

        {/* Guide cards */}

        <StaggerContainer
          stagger={reduceMotion ? 0 : 0.1}
          delayChildren={reduceMotion ? 0 : 0.15}
        >
          <div className="guides-grid">
            {guides.map((guide, index) => (
              <GuideCard
                key={guide.title}
                guide={guide}
                index={index}
                shouldShow={shouldShow}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

export default ImportGuides
