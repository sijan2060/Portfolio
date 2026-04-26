import React from 'react';
import SpatialBackground from './components/SpatialBackground';
import FloatingNav from './components/FloatingNav';
import ProjectCard from './components/ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Food भोक",
    description: "A community initiative dedicated to reducing hunger by providing food and support to needy people through collective effort.",
    tags: ["React", "Tailwind", "Node.js"],
    image: "/food.jpg"
  },
  {
    title: "Hamro Bikes",
    description: "A user-friendly platform that makes renting and exploring bikes easy, affordable, and convenient for everyone.",
    tags: ["Three.js", "Framer Motion", "Vite"],
    image: "/bikes.jpg"
  },
  {
    title: "MERN Stack Dev",
    description: "Custom API solutions and scalable database architectures for modern enterprises.",
    tags: ["MongoDB", "Express", "Node.js"],
    image: "/mern.jpg"
  }
];

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30">
      <SpatialBackground />
      <FloatingNav />

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">
              Creative Developer & CS Student
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Namaste, I'm Sijan Maharjan
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-10">
              I craft immersive digital experiences at the intersection of 
              <span className="text-white"> Spatial UI</span>, 
              <span className="text-white"> 3D Animation</span>, and 
              <span className="text-white"> High-Performance MERN Applications</span>.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
               <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all shadow-xl shadow-purple-600/20">
                 Explore My Universe
               </button>
               <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all">
                 View GitHub
               </button>
            </div>
          </motion.div>
        </div>

        {/* Anti-Gravity Projects Field */}
        <div className="relative mt-20">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-2xl font-bold text-white/20 uppercase tracking-[0.5em] mb-20"
            >
              Featured Works
            </motion.h3>

            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      className={`${index % 2 === 0 ? 'md:mt-20' : ''}`}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </div>
      </main>

      {/* Bottom Gradient for depth */}
      <div className="fixed bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none -z-5" />
    </div>
  );
}

export default App;
