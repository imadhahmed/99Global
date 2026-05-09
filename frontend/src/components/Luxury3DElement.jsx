import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Environment } from '@react-three/drei';

export default function Luxury3DElement() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
        />
        
        <Float rotationIntensity={1.5} floatIntensity={2} speed={1.5}>
          {/* The abstract luxury shape */}
          <mesh castShadow receiveShadow>
            <torusKnotGeometry args={[1, 0.3, 256, 64]} />
            <meshPhysicalMaterial 
              color="#d4af37" 
              metalness={1} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0.1} 
              envMapIntensity={2}
            />
          </mesh>
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
