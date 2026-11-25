
import * as React from 'react'
import { motion } from 'framer-motion'

import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  staggerVariants,
} from '../../animations/variants'
import { cn } from '../../utils/cn'

export function AnimatedSection({
  children,
  variant = 'fadeInUp',
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  className,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  const { ref, isInView } = useInViewOnce({
    threshold,
    rootMargin,
    triggerOnce: true,
    disabled: reduceMotion,
  })

  const shouldShow = reduceMotion || isInView

  const isStagger = variant === 'stagger'
  const sectionVariants = isStagger ? staggerContainer : fadeInUp

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      animate={shouldShow ? 'visible' : 'hidden'}
      variants={sectionVariants}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        // Only add stagger variants when using stagger mode.
        if (isStagger) {
          return React.cloneElement(child, {
            variants: staggerItem,
          })
        }

        return child
      })}
    </motion.section>
  )
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delayChildren = 0.1,
  className,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  index = 0,
  variant = 'slideUp',
  delay = 0,
  className,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  const itemVariants =
    staggerVariants[variant] || staggerVariants.slideUp

  return (
    <motion.div
      className={cn(className)}
      custom={index}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      variants={reduceMotion ? {
        hidden: { opacity: 1, y: 0, x: 0 },
        visible: { opacity: 1, y: 0, x: 0 },
      } : itemVariants}
      style={{
        transitionDelay: reduceMotion ? '0s' : `${delay}s`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
