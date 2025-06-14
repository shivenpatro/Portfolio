import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface BodyConfig {
  name: string;
  color: string;
  radius: number; // orbit radius
  size: number; // sphere size
  speed: number; // angular speed (radians per second)
  sectionId: string;
  initialAngle?: number;
}

interface PlanetProps {
  body: BodyConfig;
}

// Detect reduced-motion preference
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Planet: React.FC<PlanetProps> = ({ body }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(body.initialAngle ?? Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (prefersReducedMotion()) return; // no animation for reduced-motion
    angleRef.current += body.speed * delta;
    const { radius } = body;
    ref.current.position.set(
      Math.cos(angleRef.current) * radius,
      0,
      Math.sin(angleRef.current) * radius,
    );
  });

  const handleClick = () => {
    const section = document.getElementById(body.sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <mesh ref={ref} onClick={handleClick} castShadow>
      <sphereGeometry args={[body.size, 32, 32]} />
      <meshStandardMaterial color={body.color} emissive={body.color} emissiveIntensity={0.3} />
      {/* optional label */}
      <Html
        style={{ pointerEvents: "none", color: "white", fontSize: "0.75rem", textAlign: "center" }}
        position={[0, body.size + 0.1, 0]}
        transform
        occlude
      >
        {body.name}
      </Html>
    </mesh>
  );
};

const bodies: BodyConfig[] = [
  { name: "About", color: "#06b6d4", radius: 2.2, size: 0.25, speed: 0.4, sectionId: "about" },
  { name: "Skills", color: "#22c55e", radius: 3, size: 0.3, speed: 0.3, sectionId: "skills" },
  { name: "Projects", color: "#f97316", radius: 3.8, size: 0.35, speed: 0.25, sectionId: "projects" },
  { name: "Contact", color: "#ec4899", radius: 4.5, size: 0.28, speed: 0.2, sectionId: "contact" },
];

export const OrbitalHero: React.FC = () => {
  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 2)}
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={1.2} color={dark ? "#ffffff" : "#ffe29a"} />

      {/* Central invisible pivot */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Planets */}
      {bodies.map((body) => (
        <Planet key={body.sectionId} body={body} />
      ))}

      {/* Allow user orbit / drag (disabled if reduced motion) */}
      {!prefersReducedMotion() && (
        <OrbitControls enableZoom={false} enablePan={false} />
      )}
    </Canvas>
  );
};

export default OrbitalHero; 