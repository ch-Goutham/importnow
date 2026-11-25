import { useEffect } from 'react'

const HEADLINE_SELECTOR = [
  '.hero h1',
  '.section-head h2',
  '.page-hero h1',
  '.article h1',
  '.j-head h2',
  '.shanghai h2',
  '.contact h2',
].join(',')

let observer = null

function getObserver() {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
  }
  return observer
}

export function observeReveals(root = document) {
  const io = getObserver()
  if (!io) {
    root.querySelectorAll('.rv').forEach((el) => el.classList.add('in'))
    return
  }
  root.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el))
}

function splitWords(el) {
  if (el.classList.contains('split')) return
  let i = 0
  ;(function walk(node) {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment()
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return
          if (/^\s+$/.test(t)) {
            frag.appendChild(document.createTextNode(' '))
            return
          }
          const w = document.createElement('span')
          w.className = 'w'
          const wi = document.createElement('span')
          wi.className = 'wi'
          wi.style.setProperty('--i', i++)
          wi.textContent = t
          w.appendChild(wi)
          frag.appendChild(w)
        })
        n.replaceWith(frag)
      } else if (n.nodeType === 1 && !/^(BR|SVG)$/i.test(n.tagName)) {
        walk(n)
      }
    })
  })(el)
  el.classList.add('split', 'rv')
}

function splitHeadlines() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll(HEADLINE_SELECTOR).forEach(splitWords)
}

/**
 * Applies the concept site's reveal behaviour after render:
 * word-by-word headline splitting, scroll reveals and the sticky motion bits.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    let raf = 0
    raf = requestAnimationFrame(() => {
      splitHeadlines()
      observeReveals()
    })
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function initPointerEffects() {
  if (typeof window === 'undefined') return () => {}
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches
  if (reduceMotion || !finePointer) return () => {}

  const onMove = (e) => {
    const btn = e.target.closest && e.target.closest('.btn-primary,.read-more,.btn-ghost')
    document.querySelectorAll('.magnet').forEach((x) => {
      if (x !== btn) {
        x.style.transform = ''
        x.classList.remove('magnet')
      }
    })
    if (!btn) return
    const r = btn.getBoundingClientRect()
    btn.classList.add('magnet')
    btn.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 12}px,${
      ((e.clientY - r.top) / r.height - 0.5) * 10
    }px)`
  }

  document.addEventListener('pointermove', onMove)

  const tiltCleanups = []
  document.querySelectorAll('.tilt').forEach((card) => {
    const onCardMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${
        (x - 0.5) * 8
      }deg) translateY(-4px)`
      card.style.setProperty('--mx', x * 100 + '%')
      card.style.setProperty('--my', y * 100 + '%')
    }
    const onCardLeave = () => {
      card.style.transform = ''
    }
    card.addEventListener('pointermove', onCardMove)
    card.addEventListener('pointerleave', onCardLeave)
    tiltCleanups.push(() => {
      card.removeEventListener('pointermove', onCardMove)
      card.removeEventListener('pointerleave', onCardLeave)
    })
  })

  const license = document.getElementById('license')
  if (license && license.parentElement) {
    const stage = license.parentElement
    const onStageMove = (e) => {
      const r = stage.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      license.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 16}deg)`
    }
    const onStageLeave = () => {
      license.style.transform = ''
    }
    stage.addEventListener('pointermove', onStageMove)
    stage.addEventListener('pointerleave', onStageLeave)
    tiltCleanups.push(() => {
      stage.removeEventListener('pointermove', onStageMove)
      stage.removeEventListener('pointerleave', onStageLeave)
    })
  }

  return () => {
    document.removeEventListener('pointermove', onMove)
    tiltCleanups.forEach((fn) => fn())
  }
}
