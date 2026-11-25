import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal mb-6"
        >
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.span>

        <h1 className="font-display font-bold text-display-xl text-text-primary mb-4">
          Page Not Found
        </h1>

        <p className="text-body-lg text-text-secondary max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-primary group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to Home
          </Link>
          <a
            href="#contact"
            className="btn-outline"
          >
            Get a Quote
          </a>
        </div>
      </motion.div>
    </div>
  )
}