import { useCallback, useEffect, useRef, useState } from 'react'

export function useInViewOnce({
  threshold = 0,
  rootMargin,
  margin,
  triggerOnce = true,
  disabled = false,
  fallbackDelay = 1200,
} = {}) {
  const [isInView, setIsInView] = useState(Boolean(disabled))
  const [node, setNode] = useState(null)
  const observerRef = useRef(null)
  const fallbackRef = useRef(null)
  const hasTriggeredRef = useRef(Boolean(disabled))

  const resolvedRootMargin = rootMargin ?? margin ?? '0px'

  const clearFallback = useCallback(() => {
    if (fallbackRef.current !== null) {
      window.clearTimeout(fallbackRef.current)
      fallbackRef.current = null
    }
  }, [])

  const reveal = useCallback(() => {
    hasTriggeredRef.current = true
    setIsInView(true)
    clearFallback()
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [clearFallback])

  useEffect(() => {
    if (!node) return undefined

    if (disabled || hasTriggeredRef.current || typeof window === 'undefined') {
      reveal()
      return undefined
    }

    const rect = node.getBoundingClientRect()
    const alreadyVisible =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0

    if (alreadyVisible || typeof IntersectionObserver === 'undefined') {
      reveal()
      return undefined
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (triggerOnce) {
          reveal()
        } else {
          setIsInView(true)
        }
      } else if (!triggerOnce) {
        setIsInView(false)
      }
    }, { threshold, rootMargin: resolvedRootMargin })
    observerRef.current.observe(node)

    // Fail open: content must never remain hidden if the observer does not fire.
    fallbackRef.current = window.setTimeout(reveal, fallbackDelay)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
      if (fallbackRef.current !== null) {
        window.clearTimeout(fallbackRef.current)
        fallbackRef.current = null
      }
    }
  }, [node, disabled, fallbackDelay, reveal, resolvedRootMargin, threshold, triggerOnce])

  return { ref: setNode, isInView: disabled || isInView }
}
