import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { RevealText } from '../ui/RevealText'
import { Counter } from '../ui/Counter'
import { useScroll } from '../../contexts/ScrollContext'

const earthTextures = [
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_atmos_2048.jpg',
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_normal_2048.jpg',
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_specular_2048.jpg',
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_lights_2048.png',
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_clouds_1024.png',
]

const cityLabels = [
  { id: 'nhava-sheva', name: 'Nhava Sheva', country: 'india', lat: 18.9547, lon: 72.9522, labelSide: 'left' },
  { id: 'hyderabad', name: 'Hyderabad', country: 'india', lat: 17.385, lon: 78.4867, labelSide: 'right' },
  { id: 'chennai', name: 'Chennai', country: 'india', lat: 13.0827, lon: 80.2707, labelSide: 'right' },
  { id: 'yiwu', name: 'Yiwu', country: 'china', lat: 29.3068, lon: 120.0753, labelSide: 'left' },
  { id: 'shanghai', name: 'Shanghai', country: 'china', lat: 31.2304, lon: 121.4737, labelSide: 'right' },
  { id: 'guangzhou', name: 'Guangzhou', country: 'china', lat: 23.1291, lon: 113.2644, labelSide: 'right' },
]

const cityById = Object.fromEntries(cityLabels.map((city) => [city.id, city]))
const routePairs = [
  ['nhava-sheva', 'yiwu'],
  ['hyderabad', 'guangzhou'],
  ['chennai', 'shanghai'],
]

function globePosition({ lat, lon }, radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)

  return new THREE.Vector3(
    -radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi)
  )
}

function routeArcPoints(startCity, endCity) {
  const start = globePosition(startCity, 1).normalize()
  const end = globePosition(endCity, 1).normalize()

  return Array.from({ length: 49 }, (_, index) => {
    const progress = index / 48
    const point = start.clone().lerp(end, progress).normalize()
    point.multiplyScalar(1.59 + Math.sin(Math.PI * progress) * 0.075)
    return point
  })
}

function CountryFlag({ country }) {
  if (country === 'china') {
    return (
      <svg viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="20" fill="#de2910" />
        <path d="m6 3 .8 2.2h2.3L7.2 6.6l.7 2.3L6 7.5l-1.9 1.4.7-2.3L3 5.2h2.3z" fill="#ffde00" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="6.67" fill="#ff9933" />
      <rect y="6.67" width="30" height="6.66" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.25" fill="none" stroke="#000080" strokeWidth="1" />
      <circle cx="15" cy="10" r=".55" fill="#000080" />
    </svg>
  )
}

function CityMarker({ city }) {
  const position = globePosition(city, 1.606)

  return (
    <group position={position}>
      <Html center distanceFactor={4} occlude>
        <span className={`hero-city-pin ${city.country} ${city.labelSide}`} aria-label={city.name}>
          <i className="hero-city-dot" aria-hidden="true" />
          <span className="hero-city-label">
            <span className="hero-city-flag"><CountryFlag country={city.country} /></span>
            {city.name}
          </span>
        </span>
      </Html>
    </group>
  )
}

function Earth({ pointerTarget, isLoaded }) {
  const earthRef = useRef(null)
  const [colorMap, normalMap, specularMap, lightsMap, cloudsMap] = useLoader(THREE.TextureLoader, earthTextures)

  useFrame((_, delta) => {
    if (!earthRef.current) return

    const easing = 1 - Math.exp(-delta * 3)
    const targetX = 0.28 - pointerTarget.current.y * 0.12
    const targetY = -2.7 + pointerTarget.current.x * 0.18
    earthRef.current.rotation.x += (targetX - earthRef.current.rotation.x) * easing
    earthRef.current.rotation.y += (targetY - earthRef.current.rotation.y) * easing
  })

  return (
    <group ref={earthRef} rotation={[0.28, -2.7, 0]} scale={isLoaded ? 1 : 0.95} opacity={isLoaded ? 1 : 0}>
      <mesh>
        <sphereGeometry args={[1.58, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          emissiveMap={lightsMap}
          emissive={new THREE.Color('#ffffff')}
          emissiveIntensity={0.45}
          shininess={8}
        />
      </mesh>
      <mesh scale={1.006}>
        <sphereGeometry args={[1.58, 64, 64]} />
        <meshPhongMaterial map={cloudsMap} transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh scale={1.015}>
        <sphereGeometry args={[1.58, 64, 64]} />
        <meshBasicMaterial
          color="#4f9dff"
          side={THREE.BackSide}
          transparent
          opacity={0.48}
        />
      </mesh>
      {routePairs.map(([startId, endId]) => (
        <Line
          key={`${startId}-${endId}`}
          points={routeArcPoints(cityById[startId], cityById[endId])}
          color="#ef352d"
          lineWidth={1.6}
          transparent
          opacity={0.9}
        />
      ))}
      {cityLabels.map((city) => <CityMarker key={city.id} city={city} />)}
    </group>
  )
}

const stats = [
  { count: 500, suffix: '+', label: 'Businesses served' },
  { count: 83, suffix: 'K+', label: 'Community on Instagram' },
  { value: '1 pc', label: 'MOQ on many products' },
  { value: 'Shanghai', label: 'Own registered company' },
]

function GlobeVisual() {
  const pointerTarget = useRef({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerTarget.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    pointerTarget.current.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
  }

  const handlePointerLeave = () => {
    pointerTarget.current.x = 0
    pointerTarget.current.y = 0
  }

  return (
    <div
      className="hero-globe"
      aria-label="Interactive globe showing import routes between China and India"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-globe-halo" aria-hidden="true" />
      <Canvas
        className="hero-globe-canvas"
        camera={{ position: [0, 0, 4], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        aria-hidden="true"
        onCreated={({ gl }) => {
          gl.setAnimationLoop(() => {})
          setIsLoaded(true)
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-3, 2, 4]} intensity={2} />
        <Suspense fallback={null}>
          <Earth pointerTarget={pointerTarget} isLoaded={isLoaded} />
        </Suspense>
      </Canvas>

    </div>
  )
}

function TrustBadge() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="hero-trust-badge"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <motion.span
        className="hero-trust-flag"
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 0, rotate: -180 }}
        animate={reduceMotion ? false : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <CountryFlag country="china" />
      </motion.span>
      <motion.span
        className="hero-trust-arrow"
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 0 }}
        animate={reduceMotion ? false : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      >
        →
      </motion.span>
      <motion.span
        className="hero-trust-flag"
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 0, rotate: 180 }}
        animate={reduceMotion ? false : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <CountryFlag country="india" />
      </motion.span>
      <span>Trusted by 500+ Indian businesses</span>
    </motion.div>
  )
}

function HeroTitle() {
  const reduceMotion = useReducedMotion()
  const lines = [
    { text: 'Import directly' },
    { text: 'from China.' },
    { text: 'Without the', accent: true },
    { text: 'guesswork.', accent: true },
  ]

  return (
    <motion.h1 className="hero-title" aria-label="Import directly from China. Without the guesswork.">
      {lines.map((line, index) => (
        <motion.span
          key={line.text}
          className={line.accent ? 'hero-title-accent' : undefined}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
        >
          {line.text}
        </motion.span>
      ))}
    </motion.h1>
  )
}

function HeroDescription() {
  const reduceMotion = useReducedMotion()

  return (
    <RevealText
      as="p"
      className="hero-description"
      splitBy="lines"
      stagger={0.08}
      delay={0.4}
      variant="fast"
    >
      Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.
    </RevealText>
  )
}

function HeroActions() {
  const reduceMotion = useReducedMotion()
  const { scrollToSection } = useScroll()

  return (
    <div className="hero-actions">
      <motion.a
        href="#contact"
        onClick={(event) => {
          event.preventDefault()
          scrollToSection('#contact')
        }}
        className="hero-button hero-button-primary"
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        Get a free sourcing quote
        <motion.span
          aria-hidden="true"
          initial={reduceMotion ? false : { x: -10 }}
          animate={reduceMotion ? false : { x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          →
        </motion.span>
      </motion.a>
      <motion.a
        href="#journey"
        onClick={(event) => {
          event.preventDefault()
          scrollToSection('#journey')
        }}
        className="hero-button hero-button-secondary"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        See how it works
      </motion.a>
    </div>
  )
}

function HeroStats() {
  return (
    <div className="hero-stats" aria-label="ImportNow at a glance">
      <div>
        {stats.map((stat, index) => (
          <div key={stat.label} className="hero-stat">
            {stat.count !== undefined ? (
              <Counter
                value={stat.count}
                suffix={stat.suffix}
                duration={2000}
                delay={index * 150}
                isInView
              />
            ) : (
              <strong className="stat-value">{stat.value}</strong>
            )}
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <TrustBadge />
            <HeroTitle />
            <HeroDescription />
            <HeroActions />
            <HeroStats />
          </div>

          <div className="hero-visual">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <GlobeVisual />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}