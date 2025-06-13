import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import { Vector3 } from "three";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";

interface Skill {
  name: string;
  color: string;
  proficiency: number; // 0-100
}

// Simple hook to detect element in viewport
function useIntersection<T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

const skills: Skill[] = [
  { name: "Python", color: "#3776AB", proficiency: 90 },
  { name: "JavaScript", color: "#F7DF1E", proficiency: 85 },
  { name: "Java", color: "#E76F00", proficiency: 80 },
  { name: "HTML/CSS", color: "#E34F26", proficiency: 95 },
  { name: "SQL", color: "#4479A1", proficiency: 75 },
  { name: "React.js", color: "#61DAFB", proficiency: 85 },
  { name: "Node.js", color: "#339933", proficiency: 75 },
  { name: "Tailwind CSS", color: "#38BDF8", proficiency: 90 },
  { name: "Git/GitHub", color: "#181717", proficiency: 85 },
  { name: "NumPy/Pandas", color: "#4D77CF", proficiency: 80 },
];

function Planet({ skill }: { skill: Skill }) {
  const groupRef = useRef<any>(null);
  const planetRef = useRef<any>(null);
  // Map proficiency (0-100) to orbital radius between 3 and 7
  const radius = useMemo(() => 3 + (skill.proficiency / 100) * 4, [skill.proficiency]);
  // Speed proportional inverse of radius (closer -> faster)
  const speed = useMemo(() => 0.2 + (100 - skill.proficiency) / 500, [skill.proficiency]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += speed * delta;
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.8 * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={planetRef} position={[radius, 0, 0]}>        
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={skill.color} />
      </mesh>
      {/* Label */}
      <Html position={[radius, 0.6, 0]} center className="pointer-events-none select-none">
        <div style={{ fontSize: "0.75rem", color: "white", textShadow: "0 0 4px rgba(0,0,0,0.7)" }}>{skill.name}</div>
      </Html>
    </group>
  );
}

function Scene() {
  const texture = useTexture("/images/profile-photo.jpg");
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={1.2} />
      {/* Sun / avatar */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {skills.map((skill) => (
        <Planet key={skill.name} skill={skill} />
      ))}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

const SkillSolarSystemInner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Cast to satisfy generic expectations
  const inView = useIntersection(containerRef as unknown as React.RefObject<HTMLElement>);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Suspend rendering if out of view or on mobile
  const shouldRenderCanvas = inView && isDesktop;

  return (
    <div ref={containerRef} className="w-full h-[500px] mx-auto">
      {shouldRenderCanvas && (
        <Canvas camera={{ position: new Vector3(0, 3, 10) }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      )}
    </div>
  );
};

// Dynamically import to prevent SSR issues with WebGL
const SkillSolarSystem = dynamic(() => Promise.resolve(SkillSolarSystemInner), { ssr: false });
export default SkillSolarSystem; 