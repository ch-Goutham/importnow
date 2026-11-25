import { motion, useReducedMotion } from 'framer-motion'
import { Building2, Cpu, Lightbulb, Package, Truck, Zap } from 'lucide-react'
import { cn } from '../../utils/cn'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const industries = [
  {
    hub: 'Foshan hub',
    title: 'Furniture & interiors',
    products: ['Complete home and villa furniture', 'Office desks and executive chairs', 'Banquet hall and hotel fit-outs'],
    highlight: 'Height-adjustable desk from ₹45,000 · MOQ 1',
    icon: Building2,
  },
  {
    hub: 'Shenzhen hub',
    title: 'Electronics & tech',
    products: ['LED screens and digital signage', 'Mobile accessories in bulk', 'Power bank rental kiosks'],
    highlight: "Business ideas India doesn't have yet",
    icon: Cpu,
  },
  {
    hub: 'Guangzhou hub',
    title: 'EV & automotive',
    products: ['Electric scooters as kits for assembly in India', 'Battery cells sourced separately', 'Car LED lights with your own brand'],
    highlight: 'Car LED private label · MOQ 500',
    icon: Zap,
  },
  {
    hub: 'Guzhen hub',
    title: 'Lighting',
    products: ['Decorative and architectural lighting', 'Commercial LED fixtures', 'Custom designs for projects'],
    highlight: 'Direct from the lighting capital of China',
    icon: Lightbulb,
  },
  {
    hub: 'Yiwu hub',
    title: 'Supermarket & general goods',
    products: ['Complete store stock in one container', 'Home, kitchen, toys and gifts', 'Choose products over video call'],
    highlight: "World's largest small-goods market",
    icon: Package,
  },
  {
    hub: 'Pan-China',
    title: 'Machinery & automation',
    products: ['Production and packaging machines', 'Smart vending and robotic kiosks', 'Spares and after-sales support'],
    highlight: 'Tell us the machine, we find the factory',
    icon: Truck,
  },
]

function IndustryCard({ industry, index, reduceMotion }) {
  const Icon = industry.icon

  return (
    <StaggerItem index={index} variant="scale" delay={index * 0.08}>
      <motion.article
        className={cn('industry-card card group relative overflow-hidden', reduceMotion ? '' : 'hover:border-red-500/30 hover:shadow-card-hover')}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.div
          className="industry-art"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: 0.4 }}
          whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.08, opacity: 0.22 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <Icon size={150} strokeWidth={0.5} />
        </motion.div>
        <span className="industry-hub">
          <span className="china-flag" role="img" aria-label="China" />
          {industry.hub}
        </span>
        <h3>{industry.title}</h3>
        <ul>
          {industry.products.map((product) => <li key={product}>{product}</li>)}
        </ul>
        <span className="industry-highlight">{industry.highlight}</span>
      </motion.article>
    </StaggerItem>
  )
}

export function Industries() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="industries"
      className="section bg-white"
      aria-labelledby="industries-heading"
    >
      <div className="container">
        <div className="section-heading industries-section-heading mb-16">
          <span className="industries-eyebrow">What we import</span>
          <h2 id="industries-heading" className="industries-heading">
            <span className="industries-heading-line">China has a market for</span>
            <span className="industries-heading-line">every industry. <span className="industries-heading-accent">We know</span></span>
            <span className="industries-heading-line industries-heading-accent">each one.</span>
          </h2>
          <p className="industries-description">
            Each industry has its own manufacturing hub. We take you straight to the source.
          </p>
        </div>

        <StaggerContainer stagger={0.08} delayChildren={0.1}>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} industry={industry} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}