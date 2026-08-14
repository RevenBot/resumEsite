import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import hdrFile from "../../assets/textures/trantor.hdr";
import Player from "../ShowRoom/Player";
import PlanePhysics from "../ShowRoom/PlanePhysics.jsx"
import * as THREE from "three";
import { useEffect } from "react";


function ImagePlane() {
  const texture = useTexture("/img/projects/wordle-solver/main3.jpg?url");
  const { gl } = useThree();


  // const meshWidth = 35;
  // const meshHeight = 15;
  console.log(gl.capabilities.maxTextureSize);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  }, [texture, gl.capabilities]);

  return (
    <mesh>
      <planeGeometry args={[35, 15]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function Test() {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 500] }}>
      <Environment files={hdrFile} background />
      <ImagePlane />
      <Physics>
        <Player />
        <PlanePhysics />
      </Physics>
    </Canvas>
  );
}

