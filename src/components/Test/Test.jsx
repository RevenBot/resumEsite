import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import WormholeSphere from "../Frames/WormholeSphere/WormholeSphere";
import WormholeParticles from "../Frames/WormholeSphere/WormholeParticles";
import hdrFile from "../../assets/textures/nebula.hdr";

export default function Test() {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 500] }}>
      <Suspense fallback={null}>
        <WormholeSphere />
      </Suspense>
      <WormholeParticles />
      <Physics gravity={[0, 0, 0]}>
        <Environment files={hdrFile} background />
        <directionalLight
          intensity={0.7}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-20, 20, 20, -20]}
          />
        </directionalLight>
        <ambientLight intensity={0.2} />
        <RigidBody type="fixed" colliders="trimesh">
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
}
