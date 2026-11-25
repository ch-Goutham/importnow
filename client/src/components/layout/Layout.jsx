import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollProvider } from '../../contexts/ScrollContext'
import { PageTransition } from '../ui/PageTransition'
import { ScrollProgress } from '../sections/ScrollProgress'
import { BackToTop } from '../ui/BackToTop'
import { FloatingWhatsApp } from '../ui/FloatingAction'

export function Layout() {
  return (
    <ScrollProvider>
      <div className="flex min-h-screen flex-col relative">
        <ScrollProgress 
          height={3} 
          color="#E3241B" 
          showOnlyWhenScrolling={true}
        />
        <Header />
        <main className="flex-1" id="main-content">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <BackToTop 
          threshold={0.2} 
          size={52}
          showProgress={true}
          progressColor="#E3241B"
          backgroundColor="#0A0A0A"
          iconColor="#FFFFFF"
        />
        <FloatingWhatsApp 
          triggerThreshold={0.3}
          entranceDelay={1500}
          pulse={true}
          float={true}
        />
      </div>
    </ScrollProvider>
  )
}