import { useEffect, useRef } from 'react'
import { HeroGlobe } from './HeroGlobe'
import { Flag } from './SiteChrome'

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let started = false

    const run = () => {
      const t0 = performance.now()
      const duration = 1600
      const step = (t) => {
        const k = Math.min(1, (t - t0) / duration)
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.textContent = to
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started) return
          started = true
          io.unobserve(el)
          run()
        })
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref} data-count={to}>
      0
    </span>
  )
}

export function Hero() {
  return (
    <section className="hero" id="home">
      <HeroGlobe />
      <div className="wrap" style={{ width: '100%' }}>
        <div className="hero-content">
          <span className="chip rv">
            <Flag country="cn" />
            <span className="arrow">→</span>
            <Flag country="in" /> Trusted by 500+ Indian businesses
          </span>
          <h1 className="rv d1">
            Import directly from China. <span className="grad-text">Without the guesswork.</span>
          </h1>
          <p className="lead rv d2">
            Sourcing, factory inspection, shipping and customs, handled end to end by a team with
            its own company in Shanghai. You choose the product. We bring it to your door.
          </p>
          <div className="hero-btns rv d3">
            <a className="btn btn-primary" href="#contact">
              Get a free sourcing quote <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost" href="#journey">
              See how it works
            </a>
          </div>
          <div className="hero-stats rv d4">
            <div className="stat">
              <b>
                <CountUp to={500} />+
              </b>
              <span>
                Businesses
                <br />
                served
              </span>
            </div>
            <div className="stat">
              <b>
                <CountUp to={83} />K+
              </b>
              <span>
                Community on
                <br />
                Instagram
              </span>
            </div>
            <div className="stat">
              <b>1 pc</b>
              <span>
                MOQ on many
                <br />
                products
              </span>
            </div>
            <div className="stat">
              <b>Shanghai</b>
              <span>
                Own registered
                <br />
                company
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        Scroll<i />
      </div>
    </section>
  )
}
