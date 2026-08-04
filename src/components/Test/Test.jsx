import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import hdrFile from "../../assets/textures/trantor.hdr";
import CosmicObjectPhysics from "../Frames/Navigation/CosmicObjectPhysics/CosmicObjectPhysics.jsx";
import Player from "../ShowRoom/Player";
import PlanePhysics from "../ShowRoom/PlanePhysics.jsx"

export default function Test() {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 500] }}>
      <Environment files={hdrFile} background />
      <Physics>
        <Player />
        <CosmicObjectPhysics
          position={[0, 0, 0]}
          label="Home"
          url="/"
          sphereColor="#8b5cf6"
          glowColor="#8b5cf6"
        />
        <CosmicObjectPhysics
          position={[500, 0, 0]}
          label="About"
          url="/about"
          sphereColor="#06b6d4"
          glowColor="#06b6d4"
        />
        <PlanePhysics />
      </Physics>
    </Canvas>
  );
}

