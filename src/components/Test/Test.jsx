import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import WormholeSphere from "../Frames/WormholeSphere/WormholeSphere";
import WormholeParticles from "../Frames/WormholeSphere/WormholeParticles";
import hdrFile from "../../assets/textures/nebula.hdr";

export default function Test() {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 500] }}>
      <Environment files={hdrFile} background />
      <OrbitControls />
      <Suspense fallback={null}>
        <WormholeSphere />
      </Suspense>
      <WormholeParticles />
    </Canvas>
  );
}
