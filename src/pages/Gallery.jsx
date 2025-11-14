import React from 'react'
import { motion } from 'framer-motion'

export default function Gallery(){
  const shots = ['Side View','Front Angle','Top Angle','Inside Area','Kids Playing','Party Time']
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10">Gallery</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {shots.map((g,i)=> (
            <motion.div key={g} className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-200 via-white to-rose-200 cursor-pointer"
              whileHover={{ scale: 1.02 }} onClick={()=> alert(`${g}: 3D lightbox with zoom + rotate`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
