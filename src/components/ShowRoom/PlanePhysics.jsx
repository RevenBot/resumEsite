import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import { MeshStandardMaterial } from "three";

const PlanePhysics = () => {
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#0f0f0f",
        emissive: "#181818",
        roughness: 0,
        metalness: 1,
        flatShading: true,
      }),
    [],
  );
  return (
    <RigidBody type="fixed" colliders="trimesh" includeInvisible>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={material}
        receiveShadow
        visible={false}
      >
        <planeGeometry args={[1000, 1000]} />
      </mesh>
    </RigidBody>
  );
};

export default PlanePhysics;
