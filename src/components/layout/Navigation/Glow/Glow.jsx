import { Billboard } from "@react-three/drei";
import { Color, AdditiveBlending } from "three";

const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.0, dist) * uAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function Glow({
  color = "#ff90f0",
  scale = 1,
  alpha = 0.35,
  blending = AdditiveBlending,
}) {
  return (
    <Billboard>
      <mesh scale={[scale, scale, 1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            uColor: { value: new Color(color) },
            uAlpha: { value: alpha },
          }}
          transparent
          depthWrite={false}
          blending={blending}
        />
      </mesh>
    </Billboard>
  );
}
