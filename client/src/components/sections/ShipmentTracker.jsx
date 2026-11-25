import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Ship, Pause, Play, Loader2, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

const journeySteps = [
  { num: '1', title: 'Source Factory', desc: 'Real prices, not middleman quotes' },
  { num: '2', title: 'Inspect Samples', desc: 'Approve over video call' },
  { num: '3', title: 'Quality Check', desc: 'Every carton checked & counted' },
  { num: '4', title: 'Ocean Freight', desc: 'Tracked the whole way' },
  { num: '5', title: 'Customs Clearance', desc: 'Duties, GST & paperwork handled' },
  { num: '6', title: 'Door Delivery', desc: 'Unloaded at your location' },
]

// 2D Animated Shipment Tracker Component
function ShipmentTracker2D({ progress, day, isPlaying, onTogglePlay }) {
  const percent = Math.round(progress * 100)
  const svgRef = useRef(null)
  
  return (
    <div className="relative h-80 sm:h-96 lg:h-[500px] bg-white rounded-2xl border border-neutral-200 flex items-center justify-center p-8">
      <div className="relative w-full max-w-3xl">
        {/* Animated Map Visualization */}
        <svg 
          ref={svgRef}
          className="w-full h-full" 
          viewBox="0 0 400 220" 
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E3241B" />
              <stop offset="100%" stopColor="#D92720" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Ocean background */}
          <rect x="0" y="0" width="400" height="220" fill="#f8fafc" />
          
          {/* Decorative grid lines */}
          <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3">
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="220" />
            ))}
            {[...Array(5)].map((_, i) => (
              <line key={i} x1="0" y1={i * 44} x2="400" y2={i * 44} />
            ))}
          </g>
          
          {/* Curved shipping route */}
          <path
            d="M40,140 Q130,100 200,70 Q270,40 360,60"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - progress)}
            style={{ 
              transition: 'stroke-dashoffset 0.8s ease-out',
              filter: 'url(#glow)'
            }}
          />
          
          {/* Route markers */}
          <g>
            {/* Shanghai */}
            <circle cx="40" cy="140" r="10" fill="#E3241B" filter="url(#glow)" />
            <circle cx="40" cy="140" r="16" fill="none" stroke="#E3241B" strokeWidth="2" strokeDasharray="8 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="40" y="165" textAnchor="middle" className="text-[11px] font-medium fill-neutral-900">Shanghai</text>
            
            {/* Chennai */}
            <circle cx="360" cy="60" r="10" fill="#E3241B" filter="url(#glow)" />
            <circle cx="360" cy="60" r="16" fill="none" stroke="#E3241B" strokeWidth="2" strokeDasharray="8 4" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="360" y="85" textAnchor="middle" className="text-[11px] font-medium fill-neutral-900">Chennai</text>
          </g>
          
          {/* Animated ship */}
          {progress > 0 && progress < 1 && (
            <g filter="url(#glow)">
              <path
                d="M40,140 Q130,100 200,70 Q270,40 360,60"
                stroke="transparent"
                strokeWidth="0"
                fill="none"
              >
                <animateMotion dur="20s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#routePath" />
                </animateMotion>
              </path>
            </g>
          )}
          
          {/* Ship marker using CSS animation */}
          {progress > 0 && progress < 1 && (
            <g>
              <defs>
                <path id="routePath" d="M40,140 Q130,100 200,70 Q270,40 360,60" />
              </defs>
              <use 
                href="#shipIcon" 
                transform={`translate(${40 + progress * 320}, ${140 - progress * 80}) rotate(${-20 + progress * 40})`}
              >
                <animateMotion 
                  path="M40,140 Q130,100 200,70 Q270,40 360,60" 
                  dur="20s" 
                  repeatCount="indefinite" 
                  rotate="auto" 
                />
              </use>
            </g>
          )}
          
          {/* Ship icon definition */}
          <defs>
            <g id="shipIcon">
              <polygon points="0,0 12,-6 12,6" fill="#E3241B" />
              <rect x="-8" y="-4" width="20" height="8" fill="#D92720" rx="2" />
              <rect x="8" y="-2" width="6" height="4" fill="#E3241B" />
            </g>
          </defs>
          
          {/* Actual animated ship using transform */}
          {progress > 0 && progress < 1 && (
            <g transform={`translate(${40 + progress * 320}, ${140 - progress * 80}) rotate(${-20 + progress * 40})`}>
              <polygon points="0,0 12,-6 12,6" fill="#E3241B" filter="url(#glow)" />
              <rect x="-8" y="-4" width="20" height="8" fill="#D92720" rx="2" />
              <rect x="8" y="-2" width="6" height="4" fill="#E3241B" />
              <animate 
                attributeName="transform" 
                from={`translate(${40}, ${140}) rotate(-20)`} 
                to={`translate(${360}, ${60}) rotate(20)`} 
                dur="20s" 
                repeatCount="indefinite" 
              />
            </g>
          )}
        </svg>
        
        {/* Progress Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-navy/95 via-brand-navy/50 to-transparent rounded-b-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-body-sm text-text-secondary">Journey Progress</span>
            <span className="font-display font-bold text-heading-sm text-brand-teal">{percent}%</span>
          </div>
          <div className="h-2.5 bg-neutral-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-teal via-brand-teal to-brand-gold rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Moving indicator */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                style={{ transform: `translateX(${progress > 0 ? '50%' : '-50%'}) translateY(-50%)` }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ShipmentTracker() {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [day, setDay] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return
    
    let startTime = Date.now()
    const duration = 20000 // 20 seconds for full journey
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed % duration) / duration, 1)
      setProgress(newProgress)
      setDay(Math.round(newProgress * 30))
      
      if (isPlaying) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isPlaying, prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <section id="shipment-tracker" className="section bg-brand-navy" aria-labelledby="shipment-heading">
        <div className="container">
          <ShipmentTracker2D progress={progress} day={day} isPlaying={isPlaying} onTogglePlay={() => setIsPlaying(!isPlaying)} />
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-secondary"
              whileTap={{ scale: 0.97 }}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </motion.button>
            <div className="text-center">
              <p className="text-body-sm text-text-secondary">Day</p>
              <p className="font-display font-bold text-display-sm text-brand-teal">{day}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="shipment-tracker" className="section bg-white relative overflow-hidden" aria-labelledby="shipment-heading">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,48,40,0.04)_0%,_transparent_70%)]" aria-hidden="true" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block text-brand-teal font-medium text-body-sm mb-3">Live Shipment View</span>
          <h2 id="shipment-heading" className="font-display font-bold text-display-sm sm:text-display-md text-text-primary mb-4">
            Watch your order travel from China to India.
          </h2>
        </motion.div>

        {/* 2D Animated Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ShipmentTracker2D 
            progress={progress} 
            day={day} 
            isPlaying={isPlaying} 
            onTogglePlay={() => setIsPlaying(!isPlaying)} 
          />
        </motion.div>

        {/* Controls & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-body-sm text-text-secondary">Origin</p>
              <p className="font-display font-semibold text-heading-sm text-brand-teal">Shanghai</p>
            </div>
            
            <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent relative">
              <motion.div
                className="absolute top-1/2 left-0 h-2 w-2 bg-brand-teal rounded-full -translate-y-1/2"
                style={{ left: `${progress * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-body-sm text-text-secondary">Destination</p>
              <p className="font-display font-semibold text-heading-sm text-brand-gold">Chennai</p>
            </div>
          </div>
          
          <motion.div className="text-center">
            <p className="text-body-sm text-text-secondary">Day</p>
            <p className="font-display font-bold text-display-sm text-brand-teal">{day}</p>
          </motion.div>
        </motion.div>

        {/* Journey Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-6 gap-4"
          role="list"
          aria-label="Journey steps"
        >
          {journeySteps.map((step, i) => (
            <article key={i} className="card relative overflow-hidden" role="listitem">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal to-brand-gold" />
              <div className="relative z-10 flex items-center gap-3">
                <span className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal font-display font-bold text-heading-sm">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-semibold text-text-primary">{step.title}</h4>
                  <p className="text-body-sm text-text-secondary">{step.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}