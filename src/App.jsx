import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'

const FloatingBalloons = () => {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8FAB']
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-8 rounded-b-full"
          style={{ background: colors[i % colors.length], left: `${(i * 6.25) % 100}%` }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-10%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 10 + (i % 5), repeat: Infinity, repeatDelay: 2, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}

const FallingBalls = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ background: `hsl(${(i * 45) % 360} 95% 60%)`, left: `${(i * 2.5) % 100}%` }}
          initial={{ y: '-10%', opacity: 0 }}
          animate={{ y: '110%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

const GlowButton = ({ children, href }) => (
  <motion.a
    href={href}
    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg shadow-red-300/30 hover:shadow-red-400/50"
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.a>
)

function App() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Smooth intro fade in
    document.body.style.opacity = 1
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-rose-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/60 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-rose-500">Kids</span>
            <span className="text-blue-600">Play</span>
            <span className="text-yellow-500">Bus</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-semibold">
            <a href="#about" className="hover:text-rose-600">About</a>
            <a href="#packages" className="hover:text-rose-600">Packages</a>
            <a href="#gallery" className="hover:text-rose-600">Gallery</a>
            <Link to="/booking" className="hover:text-rose-600">Book</Link>
          </nav>
          <GlowButton href="#booking">Book a Party</GlowButton>
        </div>
      </header>

      <section ref={heroRef} className="relative min-h-[110vh] pt-24 flex items-center">
        <FloatingBalloons />
        <FallingBalls />
        <motion.div style={{ y: yParallax, opacity }} className="w-full">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Spline scene="https://prod.spline.design/XuAg4PYWfzmy0iW1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-white/0 via-white/0 to-white/10"></div>
            </div>
            <div className="space-y-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight"
              >
                A Double‑Decker Soft‑Play Adventure!
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
                className="text-lg text-gray-600"
              >
                Book a magical mobile playground with slides, ball pits, and sparkly fun. We come to you, set up, and make the big day unforgettable.
              </motion.p>
              <div className="flex gap-4">
                <GlowButton href="#packages">See Packages</GlowButton>
                <GlowButton href="#booking">Check Dates</GlowButton>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
                  3D Rotating Bus, Ball Pit, Slides
                </div>
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
                  Safety‑first, Fully Supervised Fun
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-8">
            Inside the Bus
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Slides', 'Ball Pit', 'Climbing', 'Party Seats'].map((f, i) => (
              <motion.div key={f} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="p-6 rounded-3xl bg-white/70 border border-white/60 backdrop-blur shadow">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-rose-200 via-yellow-200 to-blue-200" />
                <p className="mt-4 font-semibold">{f}</p>
                <p className="text-sm text-gray-600">A spotlight tour showcases each feature with smooth camera pans.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="relative py-24 bg-gradient-to-b from-rose-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-12">
            Party Packages
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{title:'Mini', price:'£199'},{title:'Classic', price:'£299'},{title:'Ultimate', price:'£399'}].map((p, i)=> (
              <motion.div key={p.title} className="p-6 rounded-3xl bg-white/80 border border-white/60 backdrop-blur shadow relative overflow-hidden"
                initial={{ rotateY: -12, opacity: 0 }} whileInView={{ rotateY: 0, opacity: 1 }} transition={{ type:'spring', stiffness: 120, delay: i*0.1 }}
                whileHover={{ y:-6, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.25)' }}
              >
                <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-200 via-rose-200 to-yellow-200 shadow-inner" />
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold">{p.title}</h3>
                    <p className="text-sm text-gray-600">2 hours of supervised play, setup/cleanup included.</p>
                  </div>
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 + i*0.1 }} className="text-3xl font-extrabold text-rose-600">
                    {p.price}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-8">
            Gallery
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Side View','Front Angle','Top Angle','Inside Area','Kids Playing','Party Time'].map((g,i)=> (
              <motion.div key={g} className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-200 via-white to-rose-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={()=> alert('3D lightbox would open here with zoom + rotate')}
              >
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="relative py-24 bg-gradient-to-b from-blue-50 to-rose-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-8 text-center">
            Book Your Party
          </motion.h2>
          <form className="grid md:grid-cols-2 gap-6">
            {['Parent Name','Email','Phone','Party Date','Location','Package'].map((label, idx)=> (
              <div key={label} className="col-span-1">
                <label className="block text-sm font-semibold mb-2">{label}</label>
                <input className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/60 focus:outline-none focus:ring-4 focus:ring-rose-300 transition" placeholder={label} />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Notes</label>
              <textarea rows="4" className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/60 focus:outline-none focus:ring-4 focus:ring-rose-300 transition" placeholder="Tell us about your party" />
            </div>
            <motion.button type="button" whileTap={{ scale: 0.98 }} whileHover={{ y: -2 }} onClick={()=>{
              // simple confetti using DOM particles
              for(let i=0;i<120;i++){
                const s = document.createElement('span')
                s.className = 'pointer-events-none fixed top-1/2 left-1/2 w-2 h-2 rounded-full'
                s.style.background = `hsl(${(i*15)%360} 90% 55%)`
                s.style.transform = `translate(-50%,-50%) translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*200}px)`
                s.style.transition = 'transform 800ms cubic-bezier(.2,.8,.2,1), opacity 800ms'
                document.body.appendChild(s)
                requestAnimationFrame(()=>{
                  s.style.transform = `translate(-50%,-50%) translate(${(Math.random()-0.5)*800}px, ${(Math.random()-0.5)*600}px)`
                  s.style.opacity = '0'
                })
                setTimeout(()=> s.remove(), 900)
              }
              alert('Thanks! We\'ll be in touch to confirm your date.')
            }} className="md:col-span-2 inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg">
              Submit Booking
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KidsPlayBus. All rights reserved.
      </footer>
    </div>
  )
}

export default App
