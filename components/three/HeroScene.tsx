"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Hero scene: a slowly rotating icosahedral "intelligence core" wrapped in
 * a faint wireframe shell, surrounded by drifting tech-stack glyphs and
 * starfield. Camera responds subtly to cursor.
 *
 * Note: this file intentionally avoids `@react-three/drei` to keep the
 * dev-time dep graph small. `Float` is replaced with a tiny inline
 * floating wrapper.
 */

interface FloatProps {
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  children: React.ReactNode;
}

/** Minimal float wrapper — gentle Y bob + slow rotation. */
function Float({ speed = 1, rotationIntensity = 0.3, floatIntensity = 0.5, children }: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = Math.sin(t + seed) * 0.15 * floatIntensity;
    ref.current.rotation.x = Math.sin(t * 0.6 + seed) * 0.2 * rotationIntensity;
    ref.current.rotation.z = Math.cos(t * 0.5 + seed) * 0.2 * rotationIntensity;
  });

  return <group ref={ref}>{children}</group>;
}

function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (inner.current) {
      inner.current.rotation.y += dt * 0.18;
      inner.current.rotation.x += dt * 0.06;
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.08;
      shell.current.rotation.z += dt * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#1a1f2c"
          metalness={0.85}
          roughness={0.28}
          emissive="#5B8CFF"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial color="#5B8CFF" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.85, 24, 24]} />
        <meshBasicMaterial color="#5B8CFF" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

function Orbiters() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.6 + (i % 3) * 0.35;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(i * 1.3) * 0.6,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          scale: 0.06 + (i % 4) * 0.02,
          tilt: i,
        };
      }),
    []
  );

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05;
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={1.1 + (i % 5) * 0.18}
          rotationIntensity={0.5}
          floatIntensity={0.6}
        >
          <mesh position={it.position} rotation={[it.tilt, it.tilt * 0.4, 0]}>
            <boxGeometry args={[it.scale, it.scale, it.scale]} />
            <meshStandardMaterial
              color={i % 2 ? "#9CBEFF" : "#EDEFF3"}
              emissive={i % 2 ? "#5B8CFF" : "#000"}
              emissiveIntensity={i % 2 ? 0.4 : 0}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Starfield({ count = 350 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const mouse = state.mouse;
    target.current.x += (mouse.x * 0.55 - target.current.x) * 0.05;
    target.current.y += (mouse.y * 0.35 - target.current.y) * 0.05;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({
  frameloop = "always",
}: {
  frameloop?: "always" | "demand" | "never";
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 42 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#05060A"]} />
      <fog attach="fog" args={["#05060A", 6, 14]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={2.2} color="#5B8CFF" />
      <pointLight position={[3, -3, 2]} intensity={1.0} color="#9CBEFF" />

      <Suspense fallback={null}>
        <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.6}>
          <Core />
        </Float>
        <Orbiters />
        <Starfield />
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
