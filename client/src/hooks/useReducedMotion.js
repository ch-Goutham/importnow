import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.(QUERY).matches ?? false
  })

  useEffect(() => {
    if (!window.matchMedia) return undefined
    const mediaQuery = window.matchMedia(QUERY)
    const handleChange = (event) => setReduceMotion(event.matches)
    setReduceMotion(mediaQuery.matches)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return reduceMotion
}
