import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrollDirection(currentScrollY > scrollY ? 'down' : 'up')
    setScrollY(currentScrollY)
    setIsScrolled(currentScrollY > 20)
  }, [scrollY])

  const scrollToSection = useCallback((href) => {
    const section = document.getElementById(href.slice(1))
    if (section) {
      const headerHeight = ['#journey', '#china-office', '#trips', '#case-studies'].includes(href) ? 0 : 76
      const offsetPosition = section.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollDirection, isScrolled, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}