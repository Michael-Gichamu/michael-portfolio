"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Background scene used behind the About section — a slow drifting
 * lattice of points, giving subtle depth without grabbing attention.
 */
function Lattice() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const cols = 24;
    const rows = 16;
    const arr = new Float32Array(cols * rows * 3);
    let k = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i / (cols - 1) - 0.5) * 9;
        const y = (j / (rows - 1) - 0.5) * 5;
        arr[k++] = x;
        arr[k++] = y;
        arr[k++] = 0;
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.6 + t * 0.5) * 0.15 + Math.cos(y * 0.7 + t * 0.4) * 0.12);
    }
    pos.needsUpdate = true;
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#5B8CFF"
        size={0.028}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function AmbientScene() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Lattice />
      </Suspense>
    </Canvas>
  );
}
