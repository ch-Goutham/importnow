import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'

const MotionInstagram = motion.create(Instagram)
const MotionMail = motion.create(Mail)
const MotionMapPin = motion.create(MapPin)
const MotionPhone = motion.create(Phone)
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
const MotionWhatsApp = motion.create(WhatsAppIcon)
import { cn } from '../../utils/cn'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { iconSpin, iconBounce } from '../../animations/variants.jsx'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const serviceLinks = [
  { label: 'Product sourcing', href: '#end-to-end' },
  { label: 'Factory audit', href: '#journey' },
  { label: 'Quality inspection', href: '#journey' },
  { label: 'China business trips', href: '#trips' },
  { label: 'Freight & customs', href: '#journey' },
  { label: 'Door-to-door delivery', href: '#journey' },
]

const importLinks = [
  { label: 'Home & furniture', href: '#industries' },
  { label: 'Electronics', href: '#industries' },
  { label: 'Industrial machinery', href: '#industries' },
  { label: 'EV & auto parts', href: '#industries' },
  { label: 'Lighting', href: '#industries' },
  { label: 'General merchandise', href: '#industries' },
]

const guideLinks = [
  { label: 'How to import from China', href: '#guides' },
  { label: 'China wholesale markets', href: '#guides' },
  { label: 'Importing furniture', href: '#guides' },
  { label: 'Import duty & taxes', href: '#guides' },
  { label: 'China business trip', href: '#trips' },
]

function FooterLinks({ title, links, index, isInView, reduceMotion }) {
  return (
    <StaggerItem index={index} variant="slideUp" delay={0.1 + index * 0.08}>
      <motion.nav
        className="footer-column"
        aria-label={title}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <ul>
          {links.map((link, i) => (
            <StaggerItem key={link.label} index={i} variant="fast" delay={0.1 + i * 0.03}>
              <motion.li
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.a
                  href={link.href}
                  whileHover={reduceMotion ? undefined : { x: 4, color: '#E3241B' }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              </motion.li>
            </StaggerItem>
          ))}
        </ul>
      </motion.nav>
    </StaggerItem>
  )
}

function SocialLink({ icon: Icon, href, label, reduceMotion, index, isInView }) {
  const MotionIcon = Icon === Instagram ? MotionInstagram :
    Icon === WhatsAppIcon ? MotionWhatsApp :
      Icon === Phone ? MotionPhone : Icon

  return (
    <StaggerItem index={index} variant="scale" delay={0.3 + index * 0.08}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: 12 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={reduceMotion || isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      >
        <MotionIcon aria-hidden="true" size={20} />
      </motion.a>
    </StaggerItem>
  )
}

function ContactItem({ icon: Icon, label, value, href, reduceMotion, index, isInView }) {
  const MotionIcon = Icon === WhatsAppIcon ? MotionWhatsApp :
    Icon === Mail ? MotionMail :
      Icon === MapPin ? MotionMapPin :
        Icon === Instagram ? MotionInstagram :
          Icon === Phone ? MotionPhone : Icon

  return (
    <StaggerItem index={index} variant="slideLeft" delay={0.2 + index * 0.05}>
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-3"
        whileHover={reduceMotion ? undefined : { x: 4 }}
        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
        animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
        transition={{ duration: 0.3 }}
      >
        <MotionIcon
          aria-hidden="true"
          size={18}
          whileHover={reduceMotion ? undefined : { scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <span>{label}</span>
        <motion.span
          className="font-semibold"
          initial={reduceMotion ? false : { opacity: 0, x: -5 }}
          animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {value}
        </motion.span>
      </motion.a>
    </StaggerItem>
  )
}

export function Footer() {
  const reduceMotion = useReducedMotion()
  const { ref, isInView } = useInViewOnce({ triggerOnce: true, margin: '0px 0px -50px 0px', disabled: reduceMotion })

  return (
    <footer ref={ref} className="site-footer">
      <div className="container">
        <StaggerContainer stagger={0.1} delayChildren={0.1}>
          <div className="footer-grid">
            <motion.div
              className="footer-brand"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="footer-logo" aria-label="ImportNow home">
                <motion.span
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  IMPORT
                </motion.span>
                <motion.span
                  whileHover={reduceMotion ? undefined : { scale: 1.05, color: '#E3241B' }}
                  transition={{ duration: 0.3 }}
                >
                  NOW
                </motion.span>
              </Link>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                ImportNow handles sourcing, quality checks, shipping, customs clearance and door delivery — so you can focus on selling.
              </motion.p>
              <StaggerContainer stagger={0.08} delayChildren={0.3}>
                <div className="footer-socials" aria-label="Social links">
                  <SocialLink icon={Instagram} href="https://www.instagram.com/importnow.in/" label="Instagram" reduceMotion={reduceMotion} index={0} isInView={isInView} />
                  <SocialLink icon={WhatsAppIcon} href="https://wa.me/919989724320" label="WhatsApp" reduceMotion={reduceMotion} index={1} isInView={isInView} />
                  <SocialLink icon={Phone} href="tel:+919989724320" label="Call ImportNow" reduceMotion={reduceMotion} index={2} isInView={isInView} />
                </div>
              </StaggerContainer>
            </motion.div>

            <FooterLinks title="Our Services" links={serviceLinks} index={0} isInView={isInView} reduceMotion={reduceMotion} />
            <FooterLinks title="What We Import" links={importLinks} index={1} isInView={isInView} reduceMotion={reduceMotion} />
            <FooterLinks title="Import Guides" links={guideLinks} index={2} isInView={isInView} reduceMotion={reduceMotion} />

            <StaggerItem index={3} variant="slideUp" delay={0.3}>
              <motion.div
                className="footer-column footer-contact"
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={reduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Get in Touch
                </motion.h3>
                <StaggerContainer stagger={0.05} delayChildren={0.1}>
                  <ContactItem icon={WhatsAppIcon} label="WhatsApp" value="+91 99897 24320" href="https://wa.me/919989724320" reduceMotion={reduceMotion} index={0} isInView={isInView} />
                  <ContactItem icon={Mail} label="Email" value="hello@importnow.in" href="mailto:hello@importnow.in" reduceMotion={reduceMotion} index={1} isInView={isInView} />
                  <ContactItem icon={MapPin} label="India Office" value="Hyderabad, Telangana" href="#contact" reduceMotion={reduceMotion} index={2} isInView={isInView} />
                  <ContactItem icon={MapPin} label="China Office" value="Shanghai, China" href="#china-office" reduceMotion={reduceMotion} index={3} isInView={isInView} />
                  <ContactItem icon={Instagram} label="Instagram" value="@importnow.in" href="https://www.instagram.com/importnow.in/" reduceMotion={reduceMotion} index={4} isInView={isInView} />
                </StaggerContainer>
              </motion.div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        <motion.div
          className="footer-bottom"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} ImportNow.in · All rights reserved.</p>
          <span>Concept design · Preview prepared for ImportNow</span>
        </motion.div>
      </div>
    </footer>
  )
}


