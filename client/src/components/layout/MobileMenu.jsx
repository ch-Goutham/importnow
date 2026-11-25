import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'

const navLinks = [
  { href: '#end-to-end', label: 'Services' },
  { href: '#journey', label: 'How it works' },
  { href: '#industries', label: 'What we import' },
  { href: '#trips', label: 'China trips' },
  { href: '#guides', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function MobileMenu({ isOpen, onClose, activeSection, onNavigate }) {
  const reduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isOpen) setIsMounted(true)
    else setTimeout(() => setIsMounted(false), 300)
  }, [isOpen])

  if (!isMounted && !isOpen) return null

  const handleNavigate = (href) => {
    onNavigate?.(href)
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="site-mobile-menu-overlay"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? false : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 99,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="site-mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? false : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              position: 'fixed',
              top: 74,
              right: 0,
              left: 0,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxHeight: 'none',
              overflow: 'hidden',
              padding: '0 30px',
              background: '#fff',
              boxShadow: '0 14px 20px rgb(0 0 0 / 7%)',
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className={cn(
                    'site-mobile-link',
                    activeSection === link.href.replace('#', '') && 'active'
                  )}
                  style={{
                    padding: '11px 5px',
                    color: activeSection === link.href.replace('#', '') ? '#ed3028' : '#4a4a4a',
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                  initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={reduceMotion ? false : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => handleNavigate('#contact')}
                className="site-mobile-quote"
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 9,
                  minHeight: 40,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 18px',
                  borderRadius: 9999,
                  background: '#080808',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Get a free quote
              </motion.button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export function MobileMenuButton({ isOpen, onToggle, ariaLabel }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      onClick={onToggle}
      className="site-menu-button"
      aria-expanded={isOpen}
      aria-label={ariaLabel || (isOpen ? 'Close menu' : 'Open menu')}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      style={{
        placeItems: 'center',
        width: 52,
        height: 52,
        border: '1px solid #e3e3e3',
        borderRadius: 16,
        background: '#fff',
        color: '#171717',
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={reduceMotion ? false : { rotate: 90, opacity: 0 }}
            animate={reduceMotion ? false : { rotate: 0, opacity: 1 }}
            exit={reduceMotion ? false : { rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
            animate={reduceMotion ? false : { rotate: 0, opacity: 1 }}
            exit={reduceMotion ? false : { rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function DesktopNav({ activeSection, onNavigate, reduceMotion }) {
  return (
    <div className="site-nav-links">
      {navLinks.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
          className={cn(
            'site-nav-link',
            activeSection === link.href.replace('#', '') && 'active'
          )}
          style={{
            color: activeSection === link.href.replace('#', '') ? '#111' : '#55545A',
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            transition: 'color 160ms ease',
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          {link.label}
        </motion.a>
      ))}
    </div>
  )
}
