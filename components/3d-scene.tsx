"use client"

import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, Float, PerspectiveCamera, OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

interface ThreeDSceneProps {
  text?: string
  textColor?: string
  textSize?: number
  textHeight?: number
  textPosition?: [number, number, number]
  backgroundColor?: string
  cameraPosition?: [number, number, number]
  autoRotate?: boolean
  autoRotateSpeed?: number
  enableZoom?: boolean
  enablePan?: boolean
  enableRotate?: boolean
  className?: string
  showStars?: boolean
  showParticles?: boolean
  particleCount?: number
  particleColor?: string
  particleSize?: number
  font?: string
}

const Particles = ({
  count = 500,
  color = "#8b5cf6",
  size = 0.01,
}: {
  count?: number
  color?: string
  size?: number
}) => {
  const particlesRef = useRef<THREE.Points>(null)
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005
      particlesRef.current.rotation.y += 0.0005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attachObject={["attributes", "position"]} count={count} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  )
}

// Add a fallback font URL in case the provided one fails to load
const FloatingText = ({
  text = "Shiven Patro",
  color = "#8b5cf6",
  size = 0.3,
  height = 0.03,
  position = [0, 0, 0],
  font = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
}: {
  text?: string
  color?: string
  size?: number
  height?: number
  position?: [number, number, number]
  font?: string
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  const [fontError, setFontError] = useState(false)

  // Fallback to a known working font if the provided one fails
  const fontUrl = fontError ? "/fonts/helvetiker_regular.typeface.json" : font

  // Handle font loading errors
  useEffect(() => {
    const handleFontError = () => {
      console.warn("Font loading failed, using fallback font")
      setFontError(true)
    }

    // Add a global error handler for font loading issues
    window.addEventListener(
      "error",
      (e) => {
        if (e.message.includes("font") || e.filename?.includes("font")) {
          handleFontError()
        }
      },
      { once: true },
    )

    return () => {
      window.removeEventListener("error", () => {})
    }
  }, [])

  // Responsive size based on viewport width
  const responsiveSize = viewport.width < 5 ? size * 0.8 : size

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Text3D font={fontUrl} size={responsiveSize} height={height} curveSegments={12} bevelEnabled={false}>
          {text}
          <meshPhysicalMaterial
            color={color}
            metalness={0.2}
            roughness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            emissive={new THREE.Color(color).multiplyScalar(0.5)}
            emissiveIntensity={0.2}
          />
        </Text3D>
      </mesh>
    </Float>
  )
}

export const ThreeDScene = ({
  text = "Shiven Patro",
  textColor = "#8b5cf6",
  textSize = 0.3,
  textHeight = 0.03,
  textPosition = [0, 0, 0],
  backgroundColor = "#000000",
  cameraPosition = [0, 0, 3],
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableZoom = false,
  enablePan = false,
  enableRotate = true,
  className = "",
  showStars = true,
  showParticles = true,
  particleCount = 500,
  particleColor = "#8b5cf6",
  particleSize = 0.01,
  font = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
}: ThreeDSceneProps) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setHasError(true)
      }
    } catch (e) {
      setHasError(true)
    }
  }, [])

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">{text}</h1>
          <p className="text-2xl text-indigo-300">WebGL not supported</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: false,
          depth: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(backgroundColor), 0)
        }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        {showStars && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />}
        {showParticles && <Particles count={particleCount} color={particleColor} size={particleSize} />}
        <FloatingText
          text={text}
          color={textColor}
          size={textSize}
          height={textHeight}
          position={textPosition}
          font={font}
        />
        <OrbitControls
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate={enableRotate}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>
    </div>
  )
}

