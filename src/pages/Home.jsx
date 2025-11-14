import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import ThreeBusScene from '../components/ThreeBusScene'

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

const FallingBalls = () => (
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

export default function Home(){
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div>
      <section className="relative min-h-[110vh] flex items-center">
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
                <a href="/packages" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg">See Packages</a>
                <a href="/booking" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-emerald-500 shadow-lg">Check Dates</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 text-3xl md:text-5xl font-extrabold mb-6">Interactive 3D Preview</div>
          <div className="h-80 md:h-96 rounded-3xl overflow-hidden bg-white/60">
            <ThreeBusScene mode="bus" allowExport style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="h-80 md:h-96 rounded-3xl overflow-hidden bg-white/60">
            <ThreeBusScene mode="interior" allowExport style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="h-80 md:h-96 rounded-3xl overflow-hidden bg-white/60">
            <ThreeBusScene mode="ballpit" allowExport style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </section>
    </div>
  )
}
