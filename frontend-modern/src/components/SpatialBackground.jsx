import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';

const SpatialBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />

        <Suspense fallback={null}>
          {/* Subtle floating 3D elements for depth */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[-10, 5, -20]}>
              <sphereGeometry args={[2, 32, 32]} />
              <meshStandardMaterial color="#c084fc" wireframe opacity={0.1} transparent />
            </mesh>
          </Float>
          
          <Float speed={3} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[15, -10, -25]}>
              <torusGeometry args={[3, 1, 16, 100]} />
              <meshStandardMaterial color="#3b82f6" wireframe opacity={0.1} transparent />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpatialBackground;
