import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -15, 0], // Floating animation
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative w-80 h-96 rounded-2xl cursor-pointer"
    >
      {/* Glassmorphism Background */}
      <div 
        className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
        style={{
          transform: "translateZ(0px)",
        }}
      >
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Project Image Placeholder */}
        <div className="w-full h-40 bg-white/5 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl">
                {project.title.charAt(0)}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div 
          className="p-6 flex flex-col h-56 justify-between"
          style={{ transform: "translateZ(30px)" }} // Pop out effect
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="flex gap-4 items-center">
             <div className="flex gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-full text-white/60">
                        {tag}
                    </span>
                ))}
             </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-purple-500/20">
              Live Demo <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Outer Ring */}
      <motion.div 
        className="absolute -inset-1 border border-white/5 rounded-2xl -z-10"
        animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
