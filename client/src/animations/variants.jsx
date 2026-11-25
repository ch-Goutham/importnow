export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const slideUpFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
}

export const iconBounce = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
}

export const slideInFromRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
}

export const textReveal = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } },
}

export const iconSpin = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: { duration: 1, ease: 'linear', repeat: Infinity },
  },
  hover: {
    rotate: 180,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
}

export const staggerVariants = {
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } },
  },
  fast: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: 'spring', stiffness: 260, damping: 20 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  },
}

export const iconPulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const cardHoverEnhanced = {
  initial: { y: 0, boxShadow: '0 8px 24px rgb(0 0 0 / 3%)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgb(0 0 0 / 12%)',
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  },
  tap: { scale: 0.98 },
}

export const floatGentle = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const accordion = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  },
}

export const shake = {
  initial: { x: 0 },
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

export const glowPulse = {
  initial: { boxShadow: '0 0 0 rgba(239, 48, 40, 0)' },
  animate: {
    boxShadow: ['0 0 0 rgba(239, 48, 40, 0)', '0 0 20px rgba(239, 48, 40, 0.4)', '0 0 0 rgba(239, 48, 40, 0)'],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}