import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3)

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1500,
  delay = 0,
  easing = easeOutCubic,
  className,
  decimals = 0,
  separator = ',',
  onComplete,
  isInView: externalIsInView,
}) {
  const [count, setCount] = useState(0)
  const animationRef = useRef(null)
  const startTimeRef = useRef(null)

  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value
  const { ref, isInView: internalIsInView } = useInViewOnce({ triggerOnce: true })
  const isInView = externalIsInView !== undefined ? externalIsInView : internalIsInView

  useEffect(() => {
    if (isInView) {
      startTimeRef.current = performance.now() + delay

      const animate = (currentTime) => {
        if (!startTimeRef.current) return
        const elapsed = currentTime - startTimeRef.current
        if (elapsed < 0) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easing(progress)
        setCount(numericValue * easedProgress)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setCount(numericValue)
          onComplete?.()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, numericValue, duration, delay, easing, onComplete])

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).replace(/,/g, separator)

  return (
    <span ref={ref} className={`counter-value ${className || ''}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}