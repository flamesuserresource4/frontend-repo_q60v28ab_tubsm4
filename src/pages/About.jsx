import React from 'react'
import ThreeBusScene from '../components/ThreeBusScene'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <div>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} className="text-4xl md:text-6xl font-extrabold mb-6">Inside the Bus</motion.h1>
          <p className="text-gray-600 max-w-3xl">Explore slides, ball pits, a mini climbing zone, a cozy party seating area, and soft‑play flooring. Drag to rotate. Auto‑rotates when idle. Export models as GLB/OBJ.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="h-96 rounded-3xl overflow-hidden bg-white/60"><ThreeBusScene mode="interior" allowExport style={{height:'100%',width:'100%'}}/></div>
            <div className="h-96 rounded-3xl overflow-hidden bg-white/60"><ThreeBusScene mode="icons" allowExport style={{height:'100%',width:'100%'}}/></div>
          </div>
        </div>
      </section>
    </div>
  )
}
