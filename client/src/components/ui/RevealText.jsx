
import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const variants = {
  default: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  },

  fast: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  },
}

export function RevealText({
  as: Component = 'div',
  splitBy = 'lines',
  stagger = 0.1,
  delay = 0,
  variant = 'default',
  children,
  className,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  const selectedVariant =
    variants[variant] || variants.default

  const initial = reduceMotion ? false : 'hidden'

  const animation = reduceMotion
    ? 'visible'
    : 'visible'

  const motionProps = {
    initial,
    animate: animation,
    variants: selectedVariant,
    transition: reduceMotion
      ? { duration: 0 }
      : undefined,
    className,
    ...props,
  }

  // Preserve JSX elements and other non-string children.
  if (typeof children !== 'string') {
    const MotionComponent =
      typeof Component === 'string'
        ? motion[Component] || motion.div
        : motion.div

    return (
      <MotionComponent {...motionProps}>
        {children}
      </MotionComponent>
    )
  }

  const splitText = (text) => {
    if (splitBy === 'chars') {
      return Array.from(text)
    }

    if (splitBy === 'words') {
      return text.split(/(\s+)/)
    }

    return text.split('\n')
  }

  const parts = splitText(children)

  // Avoid splitting when there is only one part.
  if (parts.length <= 1 && splitBy !== 'chars') {
    const MotionComponent =
      typeof Component === 'string'
        ? motion[Component] || motion.div
        : motion.div

    return (
      <MotionComponent {...motionProps}>
        {children}
      </MotionComponent>
    )
  }

  // Use the requested HTML element as the wrapper.
  const Wrapper = Component

  return (
    <Wrapper className={className} {...props}>
      {parts.map((part, index) => {
        const isWhitespace = /^\s+$/.test(part)

        if (isWhitespace) {
          return (
            <React.Fragment key={`space-${index}`}>
              {part}
            </React.Fragment>
          )
        }

        return (
          <motion.span
            key={`${index}-${part}`}
            initial={initial}
            animate="visible"
            variants={selectedVariant}
            transition={{
              duration: reduceMotion ? 0 : undefined,
              delay: reduceMotion
                ? 0
                : delay + index * stagger,
            }}
            style={{
              display: 'inline-block',
              whiteSpace:
                splitBy === 'chars' ? 'pre' : undefined,
            }}
          >
            {part}
          </motion.span>
        )
      })}
    </Wrapper>
  )
}

export default RevealText
