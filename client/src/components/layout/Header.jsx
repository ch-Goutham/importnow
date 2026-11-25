import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll } from '../../contexts/ScrollContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'
import { MobileMenu, MobileMenuButton, DesktopNav } from './MobileMenu'

const navLinks = [
  { href: '#end-to-end', label: 'Services' },
  { href: '#journey', label: 'How it works' },
  { href: '#industries', label: 'What we import' },
  { href: '#trips', label: 'China trips' },
  { href: '#guides', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const { isScrolled, scrollToSection } = useScroll()
  const reduceMotion = useReducedMotion()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sectionIds = ['hero', 'end-to-end', 'journey', 'industries', 'china-office', 'trips', 'case-studies', 'guides', 'faq', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0.1 }
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (href) => {
    scrollToSection(href)
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = (event) => {
    event.preventDefault()
    scrollToSection('#hero')
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'site-header fixed inset-x-0 top-0 z-50',
        isScrolled ? 'site-header-scrolled' : ''
      )}
    >
      <nav className="site-nav container" aria-label="Main navigation">
        <motion.a
          href="#hero"
          className="site-logo"
          aria-label="ImportNow home"
          onClick={handleLogoClick}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          IMP<svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.2 3.1A9.5 9.5 0 1 0 15.8 3.1" fill="none" stroke="currentColor" strokeWidth="3.6" />
            <path d="M12 1.5v10.2M7.6 8l4.4 4.6L16.4 8" fill="none" stroke="currentColor" strokeWidth="3.2" />
          </svg>RTNOW
        </motion.a>

        <DesktopNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
          reduceMotion={reduceMotion}
        />

        <motion.a
          href="#contact"
          className="site-quote-button"
          onClick={(event) => {
            event.preventDefault()
            handleNavigate('#contact')
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Get a free quote
        </motion.a>

        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen((open) => !open)}
          ariaLabel={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
        />
      </nav>
    </header>
  )
}
