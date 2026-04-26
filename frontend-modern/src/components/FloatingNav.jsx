import React, { useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const FloatingNav = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform velocity into a tilt angle
  const velocitySpring = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30
  });

  const tilt = useTransform(velocitySpring, [-2000, 2000], [-15, 15]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Skills', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <motion.nav
      style={{ rotateX: tilt }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit"
    >
      <div className="mx-auto px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center gap-8">
        <div className="text-white font-bold text-xl tracking-tighter">
          SIJAN<span className="text-purple-500">.</span>
        </div>
        
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300">
          HIRE ME
        </button>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
