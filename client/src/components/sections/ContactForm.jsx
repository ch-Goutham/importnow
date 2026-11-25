import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

import {
  MapPin,
  Instagram,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react'

import { cn } from '../../utils/cn'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { api } from '../../services/api'
import { RevealText } from '../ui/RevealText'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const MotionWhatsApp = motion.create(WhatsAppIcon)
const MotionSend = motion.create(Send)
const MotionLoader2 = motion.create(Loader2)

const categoryOptions = [
  { value: 'furniture', label: 'Furniture & Interiors' },
  { value: 'electronics', label: 'Electronics & Tech' },
  { value: 'ev', label: 'EV & Automotive' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'supermarket', label: 'Supermarket & General Goods' },
  { value: 'machinery', label: 'Machinery & Automation' },
  { value: 'trips', label: 'China Business Trip / Canton Fair' },
  { value: 'other', label: 'Something Else' },
]

const budgetOptions = [
  { value: 'under-1l', label: 'Under ₹1 Lakh' },
  { value: '1-5l', label: '₹1–5 Lakh' },
  { value: '5-25l', label: '₹5–25 Lakh' },
  { value: '25l-plus', label: '₹25 Lakh+' },
]

const quantityOptions = [
  { value: '1', label: '1 piece (MOQ 1)' },
  { value: '2-10', label: '2–10 pieces' },
  { value: '11-50', label: '11–50 pieces' },
  { value: '51-100', label: '51–100 pieces' },
  { value: '100-500', label: '100–500 pieces' },
  { value: '500+', label: '500+ pieces' },
  { value: 'container', label: 'Full Container (FCL)' },
  { value: 'unsure', label: 'Not Sure Yet' },
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  city: z.string().min(2, 'Please enter your city'),
  category: z.string().min(1, 'Please select a category'),
  quantity: z.string().min(1, 'Please select quantity'),
  budget: z.string().min(1, 'Please select budget range'),
  details: z.string().optional(),
})

/* -------------------------------------------------------
   Form field
------------------------------------------------------- */

function FormField({
  label,
  htmlFor,
  children,
  error,
  errorId,
  reduceMotion,
  index = 0,
}) {
  return (
    <StaggerItem
      index={index}
      variant="fast"
      delay={reduceMotion ? 0 : 0.1 + index * 0.05}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        <label htmlFor={htmlFor} className="label">
          {label}
        </label>

        {children}

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              className="mt-1.5 text-body-sm text-red-500"
              role="alert"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </StaggerItem>
  )
}

/* -------------------------------------------------------
   Contact method
------------------------------------------------------- */

function ContactMethod({
  icon: Icon,
  label,
  value,
  href,
  reduceMotion,
  index = 0,
}) {
  return (
    <StaggerItem
      index={index}
      variant="slideLeft"
      delay={reduceMotion ? 0 : 0.2 + index * 0.08}
    >
      <motion.a
        href={href}
        className="contact-method-row flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-border hover:border-brand-teal/30 transition-colors group"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        initial={reduceMotion ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={reduceMotion ? undefined : {
          x: 4,
          borderColor: 'rgba(239,48,45,0.3)',
        }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.4 }}
      >
        <motion.div
          className="contact-method-icon flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal"
          whileHover={reduceMotion ? undefined : {
            rotate: 180,
            scale: 1.1,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </motion.div>

        <div>
          <p className="text-body-sm text-text-muted">{label}</p>
          <p className="font-semibold text-text-primary">{value}</p>
        </div>
      </motion.a>
    </StaggerItem>
  )
}

/* -------------------------------------------------------
   Success message
------------------------------------------------------- */

function SuccessMessage({ onReset, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : {
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={reduceMotion ? undefined : {
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
      }}
      className="text-center py-8"
    >
      <motion.div
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal mb-6"
        initial={reduceMotion ? false : {
          scale: 0,
          rotate: -180,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.4,
        }}
      >
        <CheckCircle className="h-8 w-8" aria-hidden="true" />
      </motion.div>

      <motion.h3
        className="font-display font-semibold text-heading-lg text-text-primary mb-2"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        Details Sent to WhatsApp!
      </motion.h3>

      <motion.p
        className="text-body text-text-secondary mb-6"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        Your quote request has been submitted. WhatsApp should open with your
        message ready to send.
      </motion.p>

      <motion.button
        type="button"
        onClick={onReset}
        whileHover={reduceMotion ? undefined : {
          scale: 1.02,
          y: -2,
        }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="btn-secondary"
      >
        Submit Another Request
      </motion.button>
    </motion.div>
  )
}

/* -------------------------------------------------------
   Main contact form
------------------------------------------------------- */

export function ContactForm() {
  const reduceMotion = useReducedMotion()

  const { ref, isInView } = useInViewOnce({
    triggerOnce: true,
    margin: '0px 0px -100px 0px',
    disabled: reduceMotion,
  })

  // Always show content if reduced motion is enabled or
  // the section has entered the viewport.
  const shouldShow = reduceMotion || isInView

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      city: '',
      category: '',
      quantity: '',
      budget: '',
      details: '',
    },
  })

  /* Generate WhatsApp message */

  const generateWhatsAppLink = (data) => {
    const category =
      categoryOptions.find((item) => item.value === data.category)?.label ||
      data.category

    const quantity =
      quantityOptions.find((item) => item.value === data.quantity)?.label ||
      data.quantity

    const budget =
      budgetOptions.find((item) => item.value === data.budget)?.label ||
      data.budget

    const message = `Hello ImportNow! I'd like a sourcing quote.

Name: ${data.name}
City: ${data.city}
Category: ${category}
Quantity: ${quantity}
Budget: ${budget}
Details: ${data.details || 'None provided'}`

    return `https://wa.me/919989724320?text=${encodeURIComponent(message)}`
  }

  /* Submit form */

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    // Open the tab during the user click to reduce popup-blocker issues.
    const whatsappWindow = window.open('about:blank', '_blank')

    try {
      await api.submitContactForm(data)

      const whatsappLink = generateWhatsAppLink(data)

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappLink
      } else {
        window.location.href = whatsappLink
      }

      toast.success('Redirecting to WhatsApp...', {
        duration: 3000,
      })

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)

      if (whatsappWindow) {
        whatsappWindow.close()
      }

      toast.error(
        'Something went wrong. Please try again or contact us directly on WhatsApp.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const sectionAnimation = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: shouldShow
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20 },
    transition: {
      duration: reduceMotion ? 0 : 0.5,
    },
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="section contact-section relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,48,40,0.04)_0%,_transparent_70%)]"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1 }}
      />

      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4AA' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1 }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Contact information */}

          <motion.div {...sectionAnimation}>
            <RevealText
              as="span"
              className="inline-block text-brand-teal font-medium text-body-sm mb-3"
              splitBy="words"
              stagger={0.05}
            >
              Start Importing
            </RevealText>

            <RevealText
              as="h2"
              id="contact-heading"
              className="font-display font-bold text-display-sm sm:text-display-md text-text-primary mb-4"
              splitBy="lines"
              stagger={0.12}
            >
              Tell us what you want to import.{' '}
              <span>We'll take it from there.</span>
            </RevealText>

            <RevealText
              as="p"
              className="text-body-lg text-text-secondary mb-8"
              splitBy="lines"
              stagger={0.08}
            >
              Share the product and quantity. You'll get supplier options,
              landed cost and timelines, free of charge.
            </RevealText>

            {/* Contact methods */}

            <StaggerContainer stagger={reduceMotion ? 0 : 0.08}>
              <div className="space-y-4 mb-10 contact-methods">

                <ContactMethod
                  icon={WhatsAppIcon}
                  label="Call or WhatsApp"
                  value="+91 99897 24320"
                  href="tel:+919989724320"
                  reduceMotion={reduceMotion}
                  index={0}
                />

                <ContactMethod
                  icon={Instagram}
                  label="Instagram"
                  value="@importnow.in"
                  href="https://www.instagram.com/importnow.in/"
                  reduceMotion={reduceMotion}
                  index={1}
                />

                <StaggerItem index={2} variant="slideLeft">
                  <motion.div
                    className="contact-method-row flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-border"
                    initial={reduceMotion ? false : {
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                    }}
                  >
                    <div className="contact-method-icon flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div>
                      <p className="text-body-sm text-text-muted">
                        Offices
                      </p>

                      <p className="font-semibold text-text-primary">
                        Hyderabad, India · Shanghai, China
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>

              </div>
            </StaggerContainer>
          </motion.div>

          {/* Contact form */}

          <motion.div {...sectionAnimation}>
            <motion.div
              className="card contact-form-card relative overflow-hidden"
              whileHover={reduceMotion ? undefined : {
                boxShadow:
                  '0 32px 64px -12px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(239 48 45 / 0.2)',
              }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              {/* Form heading */}

              <div className="mb-6">
                <RevealText
                  as="h3"
                  className="font-display font-semibold text-heading-lg text-text-primary mb-1"
                  splitBy="words"
                >
                  Get a Free Sourcing Quote
                </RevealText>

                <RevealText
                  as="p"
                  className="text-body-sm text-text-secondary"
                  splitBy="words"
                >
                  Opens WhatsApp with your details filled in. We usually reply
                  within a few hours.
                </RevealText>
              </div>

              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <SuccessMessage
                    onReset={() => setSubmitSuccess(false)}
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                    initial={reduceMotion ? false : {
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : {
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                    }}
                  >
                    <StaggerContainer
                      stagger={reduceMotion ? 0 : 0.05}
                      delayChildren={reduceMotion ? 0 : 0.1}
                    >
                      {/* Name and city */}

                      <div className="grid sm:grid-cols-2 gap-4">

                        <FormField
                          htmlFor="name"
                          label={
                            <>
                              Your Name{' '}
                              <span className="text-brand-teal">*</span>
                            </>
                          }
                          error={errors.name}
                          errorId="name-error"
                          reduceMotion={reduceMotion}
                          index={0}
                        >
                          <motion.input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            {...register('name')}
                            className={cn(
                              'input',
                              errors.name &&
                              'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            )}
                            aria-invalid={!!errors.name}
                            aria-describedby={
                              errors.name ? 'name-error' : undefined
                            }
                            disabled={isSubmitting}
                            whileFocus={reduceMotion ? undefined : {
                              scale: 1.005,
                              borderColor: '#E3241B',
                            }}
                          />
                        </FormField>

                        <FormField
                          htmlFor="city"
                          label={
                            <>
                              City{' '}
                              <span className="text-brand-teal">*</span>
                            </>
                          }
                          error={errors.city}
                          errorId="city-error"
                          reduceMotion={reduceMotion}
                          index={1}
                        >
                          <motion.input
                            id="city"
                            type="text"
                            placeholder="Hyderabad"
                            autoComplete="address-level2"
                            {...register('city')}
                            className={cn(
                              'input',
                              errors.city &&
                              'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            )}
                            aria-invalid={!!errors.city}
                            aria-describedby={
                              errors.city ? 'city-error' : undefined
                            }
                            disabled={isSubmitting}
                            whileFocus={reduceMotion ? undefined : {
                              scale: 1.005,
                              borderColor: '#E3241B',
                            }}
                          />
                        </FormField>

                      </div>

                      {/* Category */}

                      <FormField
                        htmlFor="category"
                        label={
                          <>
                            What do you want to import?{' '}
                            <span className="text-brand-teal">*</span>
                          </>
                        }
                        error={errors.category}
                        errorId="category-error"
                        reduceMotion={reduceMotion}
                        index={2}
                      >
                        <motion.select
                          id="category"
                          {...register('category')}
                          className={cn(
                            'input',
                            errors.category &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          )}
                          aria-invalid={!!errors.category}
                          aria-describedby={
                            errors.category ? 'category-error' : undefined
                          }
                          disabled={isSubmitting}
                          whileFocus={reduceMotion ? undefined : {
                            scale: 1.005,
                            borderColor: '#E3241B',
                          }}
                        >
                          <option value="">Select a category</option>

                          {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </motion.select>
                      </FormField>

                      {/* Quantity and budget */}

                      <div className="grid sm:grid-cols-2 gap-4">

                        <FormField
                          htmlFor="quantity"
                          label={
                            <>
                              Approx. Quantity{' '}
                              <span className="text-brand-teal">*</span>
                            </>
                          }
                          error={errors.quantity}
                          errorId="quantity-error"
                          reduceMotion={reduceMotion}
                          index={3}
                        >
                          <motion.select
                            id="quantity"
                            {...register('quantity')}
                            className={cn(
                              'input',
                              errors.quantity &&
                              'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            )}
                            aria-invalid={!!errors.quantity}
                            aria-describedby={
                              errors.quantity ? 'quantity-error' : undefined
                            }
                            disabled={isSubmitting}
                            whileFocus={reduceMotion ? undefined : {
                              scale: 1.005,
                              borderColor: '#E3241B',
                            }}
                          >
                            <option value="">Select quantity</option>

                            {quantityOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </motion.select>
                        </FormField>

                        <FormField
                          htmlFor="budget"
                          label={
                            <>
                              Budget{' '}
                              <span className="text-brand-teal">*</span>
                            </>
                          }
                          error={errors.budget}
                          errorId="budget-error"
                          reduceMotion={reduceMotion}
                          index={4}
                        >
                          <motion.select
                            id="budget"
                            {...register('budget')}
                            className={cn(
                              'input',
                              errors.budget &&
                              'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            )}
                            aria-invalid={!!errors.budget}
                            aria-describedby={
                              errors.budget ? 'budget-error' : undefined
                            }
                            disabled={isSubmitting}
                            whileFocus={reduceMotion ? undefined : {
                              scale: 1.005,
                              borderColor: '#E3241B',
                            }}
                          >
                            <option value="">Select budget range</option>

                            {budgetOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </motion.select>
                        </FormField>

                      </div>

                      {/* Details */}

                      <FormField
                        htmlFor="details"
                        label="Details (Optional)"
                        reduceMotion={reduceMotion}
                        index={5}
                      >
                        <motion.textarea
                          id="details"
                          rows={3}
                          placeholder="Describe your requirements, specific products, timelines, or any other details..."
                          {...register('details')}
                          className="input resize-y min-h-[100px]"
                          disabled={isSubmitting}
                          whileFocus={reduceMotion ? undefined : {
                            scale: 1.005,
                            borderColor: '#E3241B',
                          }}
                        />
                      </FormField>

                    </StaggerContainer>

                    {/* Submit button */}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={reduceMotion ? undefined : {
                        scale: 1.02,
                        y: -2,
                      }}
                      whileTap={reduceMotion ? undefined : {
                        scale: 0.98,
                      }}
                      className="contact-submit w-full justify-center group"
                      initial={reduceMotion ? false : {
                        opacity: 0,
                        y: 20,
                      }}
                      animate={shouldShow
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                      }
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : 0.3,
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <MotionLoader2
                            className="h-5 w-5"
                            aria-hidden="true"
                            animate={reduceMotion ? undefined : {
                              rotate: 360,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MotionWhatsApp
                            className="h-5 w-5"
                            aria-hidden="true"
                          />

                          Send on WhatsApp

                          <MotionSend
                            className="h-4 w-4"
                            aria-hidden="true"
                            whileHover={reduceMotion ? undefined : {
                              x: 5,
                            }}
                          />
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm