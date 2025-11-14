import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const GlowButton = ({ children, to }) => (
  <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.98 }}>
    <Link to={to} className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg shadow-red-300/30 hover:shadow-red-400/50">
      {children}
    </Link>
  </motion.div>
)

export default function Layout(){
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
            <Link to="/about" className="hover:text-rose-600">About</Link>
            <Link to="/packages" className="hover:text-rose-600">Packages</Link>
            <Link to="/gallery" className="hover:text-rose-600">Gallery</Link>
            <Link to="/booking" className="hover:text-rose-600">Book</Link>
          </nav>
          <GlowButton to="/booking">Book a Party</GlowButton>
        </div>
      </header>
      <main className="pt-24">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KidsPlayBus. All rights reserved.
      </footer>
    </div>
  )
}
