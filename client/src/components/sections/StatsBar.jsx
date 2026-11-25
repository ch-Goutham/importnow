const stats = [
  { count: 500, suffix: '+', label: 'Businesses served' },
  { count: 83, suffix: 'K+', label: 'Community on Instagram' },
  { value: '1 pc', label: 'MOQ on many products' },
  { value: 'Shanghai', label: 'Own registered company' },
]

export function StatsBar() {
  return (
    <section id="stats" className="stats-bar-section bg-white" aria-label="ImportNow at a glance">
      <div className="container">
        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-content">
                <strong className="stat-value">
                  {stat.count ? `${stat.count}${stat.suffix}` : stat.value}
                </strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}