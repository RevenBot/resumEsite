import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, AdditiveBlending, DoubleSide } from "three";
import Glow from "../Glow/Glow";

const accretionVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const accretionFragmentShader = `
  uniform vec3 uInnerColor;
  uniform vec3 uOuterColor;
  uniform float uAlpha;
  uniform float uInnerRadius;
  uniform float uOuterRadius;
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    float dist = length(vPosition.xy);
    float t = smoothstep(uInnerRadius, uOuterRadius, dist);
    float ring = smoothstep(uOuterRadius, uInnerRadius, dist) * smoothstep(uInnerRadius * 0.6, uInnerRadius, dist);
    vec3 color = mix(uInnerColor, uOuterColor, t);
    float alpha = ring * uAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`;

function AccretionDisk({
  innerRadius = 220,
  outerRadius = 450,
  innerColor = "#ffae00",
  outerColor = "#ff2200",
  alpha = 0.8,
  rotationSpeed = 0.05,
}) {
  const meshRef = useRef();

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
      <shaderMaterial
        vertexShader={accretionVertexShader}
        fragmentShader={accretionFragmentShader}
        uniforms={{
          uInnerColor: { value: new Color(innerColor) },
          uOuterColor: { value: new Color(outerColor) },
          uAlpha: { value: alpha },
          uInnerRadius: { value: innerRadius },
          uOuterRadius: { value: outerRadius },
        }}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default function Blackhole({
  position = [0, 0, 0],
  horizonRadius = 180,
  horizonColor = "#000000",
  diskInnerRadius = 220,
  diskOuterRadius = 450,
  diskInnerColor = "#ffae00",
  diskOuterColor = "#ff2200",
  diskAlpha = 0.8,
  glowColor = "#ff6600",
  glowScale = 700,
  glowAlpha = 0.35,
  rotationSpeed = 0.05,
}) {
  return (
    <group position={position}>
      {/* Event horizon — self-contained dark sphere */}
      <mesh>
        <sphereGeometry args={[horizonRadius, 64, 64]} />
        <meshStandardMaterial
          color={horizonColor}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      <AccretionDisk
        innerRadius={diskInnerRadius}
        outerRadius={diskOuterRadius}
        innerColor={diskInnerColor}
        outerColor={diskOuterColor}
        alpha={diskAlpha}
        rotationSpeed={rotationSpeed}
      />
      <Glow color={glowColor} scale={glowScale} alpha={glowAlpha} />
    </group>
  );
}
