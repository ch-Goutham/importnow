import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { WhatsAppIcon } from './WhatsAppIcon'

export function FloatingWhatsApp({
  triggerThreshold = 0.3,
  entranceDelay = 1500,
  pulse = true,
  float = true,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, entranceDelay)

    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollProgress > triggerThreshold) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [triggerThreshold, entranceDelay])

  if (!isVisible) return null

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#25D366',
          boxShadow: '0 8px 24px rgb(37 211 102 / 35%)',
          border: 'none',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          color: 'white',
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        animate={
          pulse && !reduceMotion
            ? {
                boxShadow: [
                  '0 8px 24px rgb(37 211 102 / 35%)',
                  '0 8px 32px rgb(37 211 102 / 50%)',
                  '0 8px 24px rgb(37 211 102 / 35%)',
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        {isOpen ? <X size={24} /> : <WhatsAppIcon size={26} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? false : { opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              bottom: 70,
              right: 0,
              width: 300,
              background: 'white',
              borderRadius: 16,
              boxShadow: '0 12px 40px rgb(0 0 0 / 15%)',
              padding: 16,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '8px 0' }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Chat on WhatsApp</p>
              <p style={{ fontSize: 14, color: '#666' }}>We typically reply within a few minutes</p>
            </div>
            <a
              href="https://wa.me/919989724320"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: '#25D366',
                color: 'white',
                borderRadius: 8,
                textAlign: 'center',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}