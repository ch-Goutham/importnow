const ROUTES = [
  ['Yiwu', 'Adilabad'],
  ['Foshan', 'Hyderabad'],
  ['Shenzhen', 'Siddipet'],
  ['Guangzhou', 'Chennai'],
  ['Shanghai', 'Nhava Sheva'],
  ['Guzhen', 'Vizag'],
  ['Ningbo', 'Mumbai'],
]

export function RouteMarquee() {
  const items = ROUTES.map(([from, to]) => (
    <span key={`${from}-${to}`}>
      {from} <em>→</em> {to}
    </span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" id="mq">
        {items}
        {items}
      </div>
    </div>
  )
}

const CARDS = [
  {
    num: '01',
    title: 'Product sourcing',
    text: 'We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.',
    delay: '',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8 11h6M11 8v6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Factory inspection',
    text: 'Our team visits the factory in person. We check licences, samples and production capacity before you pay.',
    delay: ' d1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z" />
        <path d="M7 17h2M12 17h2M17 17h1" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Quality control',
    text: 'Pre-shipment checks with photo and video reports, done before the container is sealed.',
    delay: ' d2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Shipping & logistics',
    text: 'Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.',
    delay: '',
    icon: (
      <svg>
        <use href="#i-ship" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Customs clearance',
    text: 'Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.',
    delay: ' d1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5M10 13h6M10 17h6" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Doorstep delivery',
    text: 'From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.',
    delay: ' d2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6h13v10H1zM14 10h4l4 3v3h-8z" />
        <circle cx="5.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow rv">End-to-end imports</span>
          <h2 className="rv d1">
            One team from the <span className="grad-text">factory floor</span> to your front door.
          </h2>
          <p className="rv d2">
            Anyone can say they import from China. What you actually need is a smooth process, clear
            communication and a shipment that arrives safely.
          </p>
        </div>
        <div className="grid-3">
          {CARDS.map((c) => (
            <article key={c.num} className={`card tilt rv${c.delay}`}>
              <span className="num">{c.num}</span>
              <div className="icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
