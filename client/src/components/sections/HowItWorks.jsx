import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'
import { fadeInUp, staggerContainer, staggerItem, scaleIn, slideUpFade } from '../../animations/variants.jsx'

const JOURNEY_TOTAL_DAYS = 35

const journeySteps = [
  {
    title: 'Source the right factory',
    description: 'Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.',
  },
  {
    title: 'Inspect & approve samples',
    description: 'Our team visits the factory and checks samples. You approve over video call.',
  },
  {
    title: 'Quality check & loading',
    description: 'Every carton is checked and counted. Then the cranes load your container onto the ship.',
  },
  {
    title: 'Ocean freight',
    description: 'Your container sails from Shanghai to India, and we track it the whole way.',
  },
  {
    title: 'Customs clearance',
    description: 'Duties, GST and paperwork are handled at the Indian port, so the container is released quickly.',
  },
  {
    title: 'Delivered to your door',
    description: 'The container is unloaded and trucked to your shop, warehouse or site.',
  },
]

const stepIcons = [
  '🔍', // Search
  '🏭', // Factory
  '✅', // Quality check
  '🚢', // Ocean freight
  '📋', // Customs
  '🚚', // Delivery
]

export function HowItWorks() {
  const sectionRef = useRef(null)
  const sceneVideoRef = useRef(null)
  const shipMarkerRef = useRef(null)
  const trackFillRef = useRef(null)
  const dayLabelRef = useRef(null)
  const routeRef = useRef(null)
  const frameRef = useRef(0)
  const lastSeekRef = useRef(0)
  const [activeStep, setActiveStep] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const sceneVideo = sceneVideoRef.current
    if (!section || !sceneVideo) return

    // Scrubbing only works when the server supports HTTP range requests.
    const canScrubVideo = () => sceneVideo.seekable.length > 0 && sceneVideo.seekable.end(0) > 0

    // Fallback for servers without range support: play the scene normally so the
    // ship still moves instead of freezing on the first frame.
    const playFallback = () => {
      if (reduceMotion) return
      if (sceneVideo.paused) {
        sceneVideo.play().catch(() => {
          // Autoplay can be blocked; the poster frame stays visible instead.
        })
      }
    }

    // The scene video is scrubbed by scroll position.
    const scrubVideo = (position) => {
      if (reduceMotion) return
      if (!canScrubVideo()) {
        playFallback()
        return
      }
      if (sceneVideo.readyState < 1 || !sceneVideo.duration) return

      const target = position * sceneVideo.duration
      const delta = Math.abs(target - sceneVideo.currentTime)
      if (delta < 0.08) return

      const now = performance.now()
      if (now - lastSeekRef.current < 45) return
      lastSeekRef.current = now

      if (!sceneVideo.paused) sceneVideo.pause()

      // Big jumps use the fast keyframe seek, fine movements stay frame accurate.
      if (delta > 1 && typeof sceneVideo.fastSeek === 'function') {
        sceneVideo.fastSeek(target)
      } else {
        sceneVideo.currentTime = target
      }
    }

    // The marker, track and day counter are written straight to the DOM so they
    // always match the video playhead in the very same frame - no render lag.
    const paintVoyage = (voyageProgress) => {
      const percent = `${voyageProgress * 100}%`
      const day = Math.round(voyageProgress * JOURNEY_TOTAL_DAYS)

      if (shipMarkerRef.current) shipMarkerRef.current.style.left = percent
      if (trackFillRef.current) trackFillRef.current.style.width = percent
      if (dayLabelRef.current) dayLabelRef.current.textContent = `Day ${day}`
      if (routeRef.current) routeRef.current.setAttribute('aria-label', `Shipment journey, day ${day}`)
    }

    const updateJourney = () => {
      frameRef.current = 0

      const currentSection = sectionRef.current
      const currentVideo = sceneVideoRef.current
      if (!currentSection) return

      const travelDistance = currentSection.offsetHeight - window.innerHeight
      const scrolledDistance = Math.max(0, -currentSection.getBoundingClientRect().top)
      const scrollProgress = travelDistance > 0
        ? Math.min(1, scrolledDistance / travelDistance)
        : 0

      // Direction contract - do not flip without updating this comment:
      // Journey starts at Day 0 (Shanghai, left) when section becomes sticky.
      // As user scrolls DOWN through the section: voyageProgress grows 0→1,
      // ship sails Shanghai→Chennai (left→right), day counter rises 0→35,
      // video plays forward.
      // As user scrolls UP: voyageProgress shrinks, ship returns to Shanghai,
      // day counter falls, video rewinds.
      const voyageProgress = scrollProgress

      paintVoyage(voyageProgress)

      setActiveStep((current) => {
        const next = Math.min(journeySteps.length - 1, Math.floor(voyageProgress * journeySteps.length))
        return next === current ? current : next
      })

      if (currentVideo) scrubVideo(voyageProgress)
    }

    const requestUpdate = () => {
      if (frameRef.current) return
      frameRef.current = window.requestAnimationFrame(updateJourney)
    }

    // Fetch the scene as the section approaches so the playhead can be scrubbed.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return

      if (entry.isIntersecting) {
        if (sceneVideo.readyState === 0) sceneVideo.load()
        if (!canScrubVideo()) playFallback()
        requestUpdate()
      } else {
        sceneVideo.pause()
      }
    }, { rootMargin: '300px 0px' })

    observer.observe(section)
    updateJourney()

    // Once the scene is ready, jump straight to the frame for the current scroll.
    const handleMetadata = () => {
      if (!canScrubVideo()) playFallback()
      updateJourney()
    }
    sceneVideo.addEventListener('loadedmetadata', handleMetadata)
    sceneVideo.addEventListener('canplay', handleMetadata)

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      observer.disconnect()
      sceneVideo.pause()
      sceneVideo.removeEventListener('loadedmetadata', handleMetadata)
      sceneVideo.removeEventListener('canplay', handleMetadata)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
    }
  }, [reduceMotion])

  return (
    <section ref={sectionRef} id="journey" className="journey-section" aria-labelledby="journey-heading">
      <div className="journey-sticky">
        <div className="journey-scene" aria-hidden="true">
          <motion.video
            ref={sceneVideoRef}
            className="journey-scene-video"
            src="/assets/journey-scene.mp4"
            poster="/assets/journey-poster.webp"
            preload="metadata"
            muted
            playsInline
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? false : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        <div className="journey-shade" aria-hidden="true" />
        <span className="journey-live-badge"><i aria-hidden="true" /> Live shipment view</span>

        <div className="journey-ui">
          <div className="journey-wrap">
            <motion.header
              className="journey-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="eyebrow">How it works</span>
              <h2 id="journey-heading">Watch your order travel from China to India.</h2>
            </motion.header>

            <AnimatePresence mode="popLayout">
              <motion.ol
                className="journey-steps"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variants={staggerContainer}
              >
                {journeySteps.map((step, index) => (
                  <motion.li
                    key={step.title}
                    className={cn(
                      'journey-step',
                      index === activeStep ? 'is-active' : '',
                      index < activeStep ? 'is-complete' : ''
                    )}
                    aria-current={index === activeStep ? 'step' : undefined}
                    initial={false}
                    animate={index === activeStep ? 'active' : index < activeStep ? 'complete' : 'inactive'}
                    variants={{
                      inactive: { opacity: 0, x: -20 },
                      active: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } },
                      complete: { opacity: 0.82, x: 0, transition: { duration: 0.3 } },
                    }}
                  >
                    <motion.span
                      className="journey-step-number"
                      initial={reduceMotion ? false : { scale: 0, rotate: -180 }}
                      animate={index === activeStep && !reduceMotion ? { scale: 1, rotate: 0 } : index < activeStep && !reduceMotion ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      {index + 1}
                    </motion.span>
                    <AnimatePresence mode="wait">
                      {index === activeStep && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </motion.div>
                      )}
                      {index < activeStep && (
                        <motion.div
                          key="complete"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {index < activeStep && (
                      <motion.div
                        className="journey-step-check"
                        initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
                        animate={reduceMotion ? false : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                      >
                        <Check size={16} strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>

            <motion.div
              ref={routeRef}
              className="journey-route"
              aria-label="Shipment journey, day 0"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="journey-port">
                <svg className="journey-flag" viewBox="0 0 24 16" aria-hidden="true">
                  <rect width="24" height="16" fill="#de2910" />
                  <path d="m5 2 1 2.2 2.4.2-1.8 1.5.6 2.3L5 7l-2.2 1.2.6-2.3L1.6 4.4 4 4.2z" fill="#ffde00" />
                  <circle cx="10" cy="3" r=".7" fill="#ffde00" />
                  <circle cx="12" cy="5.5" r=".7" fill="#ffde00" />
                  <circle cx="11.5" cy="8" r=".7" fill="#ffde00" />
                  <circle cx="9.5" cy="10" r=".7" fill="#ffde00" />
                </svg>
                <div><strong>Shanghai</strong><small>Origin port</small></div>
              </div>
              <div className="journey-track" aria-hidden="true">
                <div
                  ref={trackFillRef}
                  className="journey-track-fill"
                  style={{ width: '0%' }}
                />
                <motion.span
                  ref={shipMarkerRef}
                  className="journey-ship"
                  style={{ left: '0%' }}
                  animate={reduceMotion ? {} : {
                    y: [0, -5, 0],
                    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 17h18l-2.2 4H6zM5 17l2-8h8l2 8M9 9V5h5v4M3 21h18" />
                  </svg>
                </motion.span>
              </div>
              <div className="journey-port journey-destination">
                <div><strong>Chennai</strong><small>Destination</small></div>
                <svg className="journey-flag" viewBox="0 0 24 16" aria-hidden="true">
                  <path fill="#ff9933" d="M0 0h24v5.33H0z" />
                  <path fill="#fff" d="M0 5.33h24v5.34H0z" />
                  <path fill="#138808" d="M0 10.67h24V16H0z" />
                  <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth=".8" />
                  <circle cx="12" cy="8" r=".45" fill="#000080" />
                </svg>
              </div>
              <motion.span
                ref={dayLabelRef}
                className="journey-day"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
              >
                Day 0
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}