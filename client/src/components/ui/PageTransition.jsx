import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { pageTransition } from '../../animations/variants'

export function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        style={{ position: 'relative', width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}