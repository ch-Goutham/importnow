import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress({
  height = 3,
  color = '#E3241B',
  showOnlyWhenScrolling = false,
}) {
  const scrollProgress = useScrollProgress()
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    if (!showOnlyWhenScrolling) return

    let timeoutId
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [showOnlyWhenScrolling])

  if (showOnlyWhenScrolling && !isScrolling && scrollProgress === 0) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: color,
          transformOrigin: 'left center',
        }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </motion.div>
  )
}