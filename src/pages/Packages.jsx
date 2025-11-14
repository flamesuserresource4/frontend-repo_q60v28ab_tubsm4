import React from 'react'
import { motion } from 'framer-motion'

const packages = [
  { name: 'Mini', price: '£199', features: ['60 mins play', 'Setup + cleanup', 'Party host'] },
  { name: 'Classic', price: '£299', features: ['90 mins play', 'Ball pit + slides', 'Party host + games'] },
  { name: 'Ultimate', price: '£399', features: ['120 mins play', 'All zones + extras', 'Goodie bags + decor'] },
]

export default function Packages(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10">Party Packages</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((p, i)=> (
            <motion.div key={p.name} className="p-6 rounded-3xl bg-white/80 border border-white/60 backdrop-blur shadow relative overflow-hidden"
              initial={{ rotateY: -12, opacity: 0 }} whileInView={{ rotateY: 0, opacity: 1 }} transition={{ type:'spring', stiffness: 120, delay: i*0.1 }}
              whileHover={{ y:-6, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.25)' }}
            >
              <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-200 via-rose-200 to-yellow-200 shadow-inner" />
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold">{p.name}</h3>
                  <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                    {p.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
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
  )
}
