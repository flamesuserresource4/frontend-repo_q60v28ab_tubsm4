import React from 'react'
import { motion } from 'framer-motion'

export default function Booking(){
  const submit = () => {
    for(let i=0;i<140;i++){
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
    alert("Thanks! We'll be in touch to confirm your date.")
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-rose-50">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">Book Your Party</h1>
        <form className="grid md:grid-cols-2 gap-6">
          {['Parent Name','Email','Phone','Party Date','Location','Package'].map((label)=> (
            <div key={label} className="col-span-1">
              <label className="block text-sm font-semibold mb-2">{label}</label>
              <input className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/60 focus:outline-none focus:ring-4 focus:ring-rose-300 transition" placeholder={label} />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea rows="4" className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/60 focus:outline-none focus:ring-4 focus:ring-rose-300 transition" placeholder="Tell us about your party" />
          </div>
          <motion.button type="button" whileTap={{ scale: 0.98 }} whileHover={{ y: -2 }} onClick={submit} className="md:col-span-2 inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg">Submit Booking</motion.button>
        </form>
      </div>
    </section>
  )
}
