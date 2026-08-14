import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Object3D } from "three";

function WormholeParticles({
  count = 5000,
  position = [0, 0, 0],
  radius = 220,
  color = "#8b5cf6",
  dummy = new Object3D(),
}) {
  const mesh = useRef();
  const particleCount = Math.min(count, 10000);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radiusOffset = -30 + Math.random() * 60;
      const speed = 0.005 + Math.random() * 0.015;
      const phase = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * Math.PI * 0.5;
      temp.push({ angle, radiusOffset, speed, phase, tilt });
    }
    return temp;
  }, [particleCount]);

  useFrame((state) => {
    const [cx, cy, cz] = position;
    const elapsed = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      const { angle, radiusOffset, speed, phase, tilt } = particle;
      const t = elapsed * speed + phase;

      const r = radius + radiusOffset + Math.sin(t * 2) * 15;

      const theta = angle + t;
      const phi = tilt + Math.sin(t * 0.7) * 0.3;

      const x = cx + r * Math.cos(phi) * Math.cos(theta);
      const y = cy + r * Math.sin(phi);
      const z = cz + r * Math.cos(phi) * Math.sin(theta);

      const pulse = 0.5 + Math.sin(t * 3 + phase) * 0.5;
      const scale = 0.3 + pulse * 0.7;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(t * 2, t * 1.5, t);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, particleCount]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
      </instancedMesh>
    </>
  );
}

export default WormholeParticles;
