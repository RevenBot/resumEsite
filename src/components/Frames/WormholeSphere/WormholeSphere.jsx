import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { DataTexture, RGBAFormat, UnsignedByteType } from "three";

// ── 4D Simplex Noise (inlined from glsl-noise/simplex/4d) ──────────────────
// Copyright (C) 2011 Ashima Arts. MIT License.
// https://github.com/ashima/webgl-noise
const noiseGLSL = `
vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float permute(float x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInvSqrt(float r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p, s;
  p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;
  return p;
}

#define F4 0.309016994374947451

float snoise(vec4 v) {
  const vec4 C = vec4(
    0.138196601125011,
    0.276393202250021,
    0.414589803375032,
    -0.447213595499958
  );

  vec4 i = floor(v + dot(v, vec4(F4)));
  vec4 x0 = v - i + dot(i, C.xxxx);

  vec4 i0;
  vec3 isX = step(x0.yzw, x0.xxx);
  vec3 isYZ = step(x0.zww, x0.yyz);
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  vec4 i3 = clamp(i0, 0.0, 1.0);
  vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
  vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);

  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  i = mod289(i);
  float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute(permute(permute(permute(
    i.w + vec4(i1.w, i2.w, i3.w, 1.0))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0));

  vec4 ip = vec4(1.0 / 294.0, 1.0 / 49.0, 1.0 / 7.0, 0.0);

  vec4 p0 = grad4(j0, ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4, p4));

  vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * (
    dot(m0 * m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)))
    + dot(m1 * m1, vec2(dot(p3, x3), dot(p4, x4)))
  );
}
`;

// ── Vertex Shader ───────────────────────────────────────────────────────────
const vertexShader = `
${noiseGLSL}

uniform float uTime;
uniform float uTimeScaleVert;
uniform float uNoiseScaleVert;
uniform float uDisplacementScale;

varying vec3 vNormal;

void main() {
  float displacement = snoise(vec4(normal * uNoiseScaleVert, uTime * uTimeScaleVert)) * uDisplacementScale;
  vec3 newPosition = position + (normal * displacement);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  vNormal = normal;
}
`;

// ── Fragment Shader ─────────────────────────────────────────────────────────
const fragmentShader = `
${noiseGLSL}

uniform float uTime;
uniform float uTimeScaleFrag;
uniform float uNoiseScaleRed;
uniform float uNoiseScaleGreen;
uniform float uNoiseScaleBlue;
uniform sampler2D uTexture;
uniform float uTextureBlend;

varying vec3 vNormal;

void main() {
  float time = uTime * uTimeScaleFrag;
  float red   = snoise(vec4(vNormal * uNoiseScaleRed   + 0.0, time)) * 0.5 + 0.5;
  float green = snoise(vec4(vNormal * uNoiseScaleGreen + 10.0, time)) * 0.5 + 0.5;
  float blue  = snoise(vec4(vNormal * uNoiseScaleBlue  + 20.0, time)) * 0.5 + 0.5;
  vec3 noiseColor = vec3(red, green, blue);

  // Spherical UV mapping from surface normal for texture sampling.
  // Projects the 3D normal onto a 2D sphere parameterization so the
  // texture wraps naturally around the displaced icosahedron.
  vec2 uv = vec2(
    atan(vNormal.z, vNormal.x) / (2.0 * 3.14159265359) + 0.5,
    asin(vNormal.y) / 3.14159265359 + 0.5
  );
  vec4 texColor = texture2D(uTexture, uv);

  gl_FragColor = vec4(mix(noiseColor, texColor.rgb, uTextureBlend), 1.0);
}
`;

function WormholeSphereMesh({ texture, fallbackTexture, uniforms: passedUniforms }) {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTimeScaleVert: { value: passedUniforms.uTimeScaleVert },
      uNoiseScaleVert: { value: passedUniforms.uNoiseScaleVert },
      uDisplacementScale: { value: passedUniforms.uDisplacementScale },
      uTimeScaleFrag: { value: passedUniforms.uTimeScaleFrag },
      uNoiseScaleRed: { value: passedUniforms.uNoiseScaleRed },
      uNoiseScaleGreen: { value: passedUniforms.uNoiseScaleGreen },
      uNoiseScaleBlue: { value: passedUniforms.uNoiseScaleBlue },
      uTexture: { value: texture ?? fallbackTexture },
      uTextureBlend: { value: texture ? 0.5 : 0.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <icosahedronGeometry args={[200, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={2}
      />
    </mesh>
  );
}

function WormholeSphereWithTexture({ texture, fallbackTexture, uniforms: passedUniforms }) {
  const loadedTexture = useTexture(texture);
  return (
    <WormholeSphereMesh
      texture={loadedTexture}
      fallbackTexture={fallbackTexture}
      uniforms={passedUniforms}
    />
  );
}

export default function WormholeSphere({
  uTimeScaleVert = 0.3,
  uNoiseScaleVert = 1.0,
  uDisplacementScale = 0.3,
  uTimeScaleFrag = 0.3,
  uNoiseScaleRed = 0.8,
  uNoiseScaleGreen = 0.8,
  uNoiseScaleBlue = 0.8,
  texture,
}) {
  // 1×1 opaque black fallback so texture2D(uTexture, uv) is always valid.
  const fallbackTexture = useMemo(() => {
    const data = new Uint8Array([0, 0, 0, 255]);
    const tex = new DataTexture(data, 1, 1, RGBAFormat, UnsignedByteType);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const passedUniforms = useMemo(
    () => ({
      uTimeScaleVert,
      uNoiseScaleVert,
      uDisplacementScale,
      uTimeScaleFrag,
      uNoiseScaleRed,
      uNoiseScaleGreen,
      uNoiseScaleBlue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Suspense fallback={null}>
      {texture ? (
        <WormholeSphereWithTexture
          texture={texture}
          fallbackTexture={fallbackTexture}
          uniforms={passedUniforms}
        />
      ) : (
        <WormholeSphereMesh
          fallbackTexture={fallbackTexture}
          uniforms={passedUniforms}
        />
      )}
    </Suspense>
  );
}
