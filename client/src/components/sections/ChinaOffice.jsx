import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { iconBounce } from '../../animations/variants.jsx'

const assurances = [
  { text: 'Registered business licence issued in Shanghai, China' },
  { text: 'Chinese company bank account, so payments to factories are safe and traceable' },
  { text: 'Team on the ground for factory visits, quality checks and market trips' },
  { text: 'Indian founder on both sides: talk to us in Telugu, Hindi or English' },
]

function AssuranceItem({ assurance, index, reduceMotion }) {
  return (
    <StaggerItem index={index} variant="slideLeft" delay={0.3 + index * 0.08}>
      <motion.li
        className="flex items-start gap-4"
        initial={reduceMotion ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="assurance-check flex-shrink-0"
          whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Check aria-hidden="true" size={20} />
        </motion.div>
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {assurance.text}
        </motion.span>
      </motion.li>
    </StaggerItem>
  )
}

function LicenseCard({ reduceMotion }) {
  return (
    <StaggerItem index={1} variant="scale" delay={0.18}>
      <motion.div
        className="license-stage"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6 }}
      >
        <motion.div
          className="business-license"
          aria-label="Shanghai business licence"
          whileHover={reduceMotion ? undefined : { 
            rotateY: -7, 
            rotateX: 3, 
            y: -4,
            boxShadow: '0 40px 80px -24px rgb(74 40 20 / 45%), 0 0 0 10px #8b1d16, 0 0 0 12px #d4a94a'
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <header>
            <motion.span
              className="license-title-cn"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              营业执照
            </motion.span>
            <motion.span
              className="license-title-en"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              BUSINESS LICENCE
            </motion.span>
          </header>
          <motion.div
            className="license-emblem"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
          />
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <dt>Company</dt><dd>Shanghai Shengqiao Chain Trading Co., Ltd.</dd>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              <dt>Location</dt><dd>Shanghai, People's Republic of China</dd>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <dt>Scope</dt><dd>Supply chain, sourcing & international trade</dd>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.65 }}
            >
              <dt>Serving</dt><dd>Importers across India</dd>
            </motion.div>
          </motion.dl>
          <motion.div
            className="license-qr"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.7 }}
          />
          <motion.div
            className="license-stamp"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0, rotate: -14 }}
            animate={{ scale: 1, rotate: -14 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.75 }}
          >
            <span>SHANGHAI<br />SHENGQIAO<br />TRADING</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </StaggerItem>
  )
}

export function ChinaOffice() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="china-office"
      className="section shanghai-section"
      aria-labelledby="china-office-heading"
    >
      <div className="container shanghai-layout">
        <StaggerContainer className="shanghai-content" stagger={0.1} delayChildren={0.1}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="shanghai-copy"
          >
            <RevealText as="span" className="section-eyebrow" splitBy="words" stagger={0.05} delay={0.1}>
              Officially in China
            </RevealText>
            <RevealText as="h2" id="china-office-heading" splitBy="lines" stagger={0.12} delay={0.2}>
              Many claim an office in China. <span className="text-red">We have the licence.</span>
            </RevealText>
            <RevealText as="p" className="text-zinc-400" splitBy="lines" stagger={0.08} delay={0.4}>
              ImportNow operates through its own registered company in Shanghai, <strong>Shanghai Shengqiao Chain Trading Co., Ltd.</strong> That means we can sign contracts with factories, pay suppliers locally and stand behind every order.
            </RevealText>
            <StaggerContainer stagger={0.08} delayChildren={0.5}>
              <ul className="shanghai-assurances">
                {assurances.map((assurance, index) => (
                  <AssuranceItem key={index} assurance={assurance} index={index} reduceMotion={reduceMotion} />
                ))}
              </ul>
            </StaggerContainer>
          </motion.div>

          <LicenseCard reduceMotion={reduceMotion} />
        </StaggerContainer>
      </div>
    </section>
  )
}