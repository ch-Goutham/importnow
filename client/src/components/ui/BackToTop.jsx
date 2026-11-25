import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * @typedef {Object} BackToTopProps
 * @property {number} [threshold=0.2]
 * @property {number} [size=52]
 * @property {boolean} [showProgress=true]
 * @property {string} [progressColor='#E3241B']
 * @property {string} [backgroundColor='#0A0A0A']
 * @property {string} [iconColor='#FFFFFF']
 */

export function BackToTop({
  threshold = 0.2,
  size = 52,
  showProgress = true,
  progressColor = '#E3241B',
  backgroundColor = '#0A0A0A',
  iconColor = '#FFFFFF',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(1, Math.max(0, progress)))
      setIsVisible(scrollTop > window.innerHeight * threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    if (reduceMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!isVisible) return null

  const circumference = 2 * Math.PI * 16
  const offset = circumference * (1 - scrollProgress)

  return (
    <motion.button
      onClick={scrollToTop}
      className="back-to-top"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 50,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor,
        color: iconColor,
        border: 'none',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px rgb(0 0 0 / 15%)',
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={reduceMotion ? undefined : { scale: 1.1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      aria-label="Back to top"
    >
      {showProgress && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: 'rotate(-90deg)',
          }}
          aria-hidden="true"
        >
          <circle
            cx="50%"
            cy="50%"
            r="16"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="16"
            fill="none"
            stroke={progressColor}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            animate={reduceMotion ? { strokeDashoffset: offset } : { strokeDashoffset: [circumference, offset] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
      )}
      <ChevronUp size={22} style={{ position: 'relative', zIndex: 1 }} />
    </motion.button>
  )
}