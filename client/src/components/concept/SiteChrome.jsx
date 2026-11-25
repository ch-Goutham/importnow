import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { POSTS } from '../../data/posts'

export const PHONE = '+91 99897 24320'
export const WHATSAPP = '919989724320'

export function Flag({ country }) {
  return (
    <svg className="flag" aria-hidden="true">
      <use href={`#flag-${country}`} />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="logo">
      IMP
      <svg aria-hidden="true">
        <use href="#logo-o" />
      </svg>
      RTNOW
    </span>
  )
}

export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="flag-cn" viewBox="0 0 30 20">
          <rect width="30" height="20" fill="#de2910" />
          <path
            fill="#ffde00"
            d="M5 3l1.18 3.6h3.8l-3.07 2.23 1.17 3.6L5 10.2l-3.08 2.23 1.18-3.6L.02 6.6h3.8z"
          />
          <circle cx="10.5" cy="2.5" r=".9" fill="#ffde00" />
          <circle cx="12.5" cy="4.6" r=".9" fill="#ffde00" />
          <circle cx="12.5" cy="7.6" r=".9" fill="#ffde00" />
          <circle cx="10.5" cy="9.6" r=".9" fill="#ffde00" />
        </symbol>
        <symbol id="flag-in" viewBox="0 0 30 20">
          <rect width="30" height="20" fill="#fff" />
          <rect width="30" height="6.67" fill="#ff9933" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".7" />
          <circle cx="15" cy="10" r=".6" fill="#000080" />
        </symbol>
        <symbol id="logo-o" viewBox="0 0 24 24">
          <path d="M8.2 3.1A9.5 9.5 0 1 0 15.8 3.1" fill="none" stroke="currentColor" strokeWidth="3.6" />
          <path d="M12 1.5v10.2M7.6 8l4.4 4.6L16.4 8" fill="none" stroke="currentColor" strokeWidth="3.2" />
        </symbol>
        <symbol id="i-ship" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 17l1.6 3.2c.2.4.6.8 1.1.8h12.6c.5 0 .9-.3 1.1-.8L21 17H3zM5 17V12h14v5M8 12V8h8v4M11 8V4h3v4M2 22c1.5-.8 3-.8 4.5 0s3 .8 4.5 0 3-.8 4.5 0 3 .8 4.5 0"
          />
        </symbol>
        <symbol id="ic-route" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="48" r="6" />
            <circle cx="50" cy="16" r="6" />
            <path d="M20 48h18a8 8 0 000-16H26a8 8 0 010-16h18" strokeDasharray="4 5" />
          </g>
        </symbol>
        <symbol id="ic-market" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
            <path d="M8 26l5-14h38l5 14M8 26h48v4a7 7 0 01-12 5 7 7 0 01-12 0 7 7 0 01-12 0A7 7 0 018 30z" />
            <path d="M12 36v18h40V36M26 54V42h12v12" />
          </g>
        </symbol>
        <symbol id="ic-sofa" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
            <path d="M14 28v-8a6 6 0 016-6h24a6 6 0 016 6v8" />
            <path d="M8 32a5 5 0 0110 0v6h28v-6a5 5 0 0110 0v14H8z" />
            <path d="M14 46v6M50 46v6" />
          </g>
        </symbol>
        <symbol id="ic-scooter" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="46" r="7" />
            <circle cx="50" cy="46" r="7" />
            <path d="M21 46h18l6-22h-8M45 24l5 22M34 14l3 10M14 46l8-10h12" />
            <path d="M28 24l3-8M26 30l2-6" />
          </g>
        </symbol>
        <symbol id="ic-plane" viewBox="0 0 64 64">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinejoin="round"
            d="M58 10L6 30l18 6 4 18 8-12 12 8z M24 36l34-26"
          />
        </symbol>
        <symbol id="ic-shield" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 6l20 8v16c0 13-9 22-20 26-11-4-20-13-20-26V14z" />
            <path d="M23 32l7 7 12-14" />
          </g>
        </symbol>
        <symbol id="ic-container" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
            <path d="M6 20h52v28H6z" />
            <path d="M14 24v20M22 24v20M30 24v20M38 24v20M46 24v20M52 24v20" />
            <path d="M20 20l12-10 12 10" />
          </g>
        </symbol>
        <symbol id="ic-doc" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 6h22l12 12v40H16z" />
            <path d="M38 6v12h12M24 32h18M24 40h18M24 48h10" />
            <circle cx="46" cy="48" r="9" />
            <path d="M43 48h6M46 45v6" />
          </g>
        </symbol>
        <symbol id="ic-bulb" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 46h16M26 54h12M32 8a16 16 0 00-9 29v9h18v-9A16 16 0 0032 8z" />
            <path d="M32 2v-0M10 24H4M60 24h-6M14 8l-4-4M50 8l4-4" />
          </g>
        </symbol>
      </defs>
    </svg>
  )
}

const NAV_LINKS = [
  ['Services', '/#services'],
  ['How it works', '/#journey'],
  ['What we import', '/#products'],
  ['China trips', '/#trips'],
  ['Blog', '/blog'],
  ['Contact', '/#contact'],
]

export function SiteHeader() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`nav${isHome ? '' : ' solid'}${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="wrap">
          <Link to="/" className="logo" aria-label="ImportNow home">
            <Logo />
          </Link>
          <nav className="nav-links">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={label}
                to={href}
                className={label === 'Blog' && !isHome ? 'active' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link className="btn btn-primary nav-cta" to="/#contact">
            Get a free quote
          </Link>
          <button
            className="burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>
      <div className={`mobile-menu${open ? ' open' : ''}`} id="mmenu">
        {NAV_LINKS.map(([label, href]) => (
          <Link key={label} to={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}

export function SiteFooter() {
  const latest = POSTS.slice(0, 5)
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Link to="/" className="logo">
              <Logo />
            </Link>
            <p>
              End-to-end imports from China to India: sourcing, factory inspection, shipping and
              customs. Save time. Reduce costs.
            </p>
            <div className="ft-social">
              <a
                href="https://www.instagram.com/importnow.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2z" />
                </svg>
              </a>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label="Call">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Our services</h4>
            <ul>
              <li><Link to="/#services">Product sourcing</Link></li>
              <li><Link to="/#services">Factory inspection</Link></li>
              <li><Link to="/#services">Quality control</Link></li>
              <li><Link to="/#services">Shipping &amp; logistics</Link></li>
              <li><Link to="/#services">Customs clearance</Link></li>
              <li><Link to="/#services">Doorstep delivery</Link></li>
            </ul>
          </div>
          <div>
            <h4>What we import</h4>
            <ul>
              <li><Link to="/#products">Furniture &amp; interiors</Link></li>
              <li><Link to="/#products">Electronics &amp; tech</Link></li>
              <li><Link to="/#products">EV &amp; automotive</Link></li>
              <li><Link to="/#products">Lighting</Link></li>
              <li><Link to="/#products">Supermarket goods</Link></li>
              <li><Link to="/#trips">Canton Fair trips</Link></li>
            </ul>
          </div>
          <div>
            <h4>Import guides</h4>
            <ul>
              {latest.map((p) => (
                <li key={p.slug}>
                  <Link to={`/post/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
              <li><Link to="/blog" style={{ color: '#ff9b7a' }}>All articles →</Link></li>
            </ul>
          </div>
          <div className="ft-contact">
            <h4>Get in touch</h4>
            <ul>
              <li><b>Call / WhatsApp</b><br /><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></li>
              <li><b>India</b><br />Hyderabad, Telangana</li>
              <li><b>China</b><br />Shanghai Shengqiao Chain Trading Co., Ltd., Shanghai</li>
              <li>
                <b>Instagram</b><br />
                <a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener noreferrer">
                  @importnow.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© {year} ImportNow.in · All rights reserved.</span>
          <span className="concept">Concept design · preview prepared for ImportNow</span>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa"
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" />
      </svg>
    </a>
  )
}

export function ScrollProgress() {
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScale(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="progress" style={{ transform: `scaleX(${scale})` }} aria-hidden="true" />
}

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const id = hash.replace('#', '')
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
