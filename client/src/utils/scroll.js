export function scrollToSection(href) {
  const element = document.getElementById(href.replace('#', ''))
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export function getScrollPercentage() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return (scrollTop / docHeight) * 100
}

export function isInViewport(element, threshold = 0.1) {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold
  )
}