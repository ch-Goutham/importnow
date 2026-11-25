import { useReducedMotion } from '../../hooks/useReducedMotion'

const routes = [
  { from: 'Foshan', to: 'Hyderabad' },
  { from: 'Shenzhen', to: 'Siddipet' },
  { from: 'Guangzhou', to: 'Chennai' },
  { from: 'Shanghai', to: 'Nhava Sheva' },
  { from: 'Guzhen', to: 'Vizag' },
  { from: 'Ningbo', to: 'Mumbai' },
  { from: 'Yiwu', to: 'Adilabad' },
]

export function RouteMarquee() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="route-marquee" aria-hidden="true">
      <div
        className="route-marquee-track"
        style={{
          animation: reduceMotion ? 'none' : 'route-marquee-scroll 40s linear infinite',
        }}
      >
        {routes.map((route, index) => (
          <span key={`${route.from}-${route.to}-${index}`}>
            {route.from} <i>→</i> {route.to}
          </span>
        ))}
        {routes.map((route, index) => (
          <span key={`${route.from}-${route.to}-${index}-dup`}>
            {route.from} <i>→</i> {route.to}
          </span>
        ))}
      </div>
    </div>
  )
}