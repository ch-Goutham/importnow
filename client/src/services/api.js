const API_BASE = import.meta.env.VITE_API_URL || '/api'

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)
    
    const data = await response.json().catch(() => ({}))
    
    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP error! status: ${response.status}`,
        response.status,
        data
      )
    }
    
    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Network error. Please check your connection.', 0, {})
  }
}

export const api = {
  // Contact form submission
  submitContactForm: (data) => request('/contact', {
    method: 'POST',
    body: data,
  }),

  // Get testimonials
  getTestimonials: () => request('/testimonials'),

  // Get case studies
  getCaseStudies: () => request('/case-studies'),

  // Get industries
  getIndustries: () => request('/industries'),

  // Get FAQs
  getFaqs: () => request('/faqs'),

  // Get blog posts
  getBlogPosts: () => request('/blog-posts'),
}

export { ApiError }