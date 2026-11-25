import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './styles/globals.css'
import './styles/reference-home.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFFFFF',
            color: '#111111',
            border: '1px solid #E7E7E7',
            borderRadius: '18px',
            padding: '1rem 1.25rem',
            boxShadow: '0 12px 36px -8px rgb(0 0 0 / 0.12)',
          },
          success: {
            iconTheme: {
              primary: '#E3241B',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F8FAFC',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)