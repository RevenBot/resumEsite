import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, Vector3 } from "three";

const Astronaut = () => {
  const { scene } = useLoader(GLTFLoader, "/models/homepage/astronaut.glb");
  const v = new Vector3();
  const hand = useRef();

  useFrame((state) => {
    v.copy({ x: state.pointer.x, y: state.pointer.y, z: 0 });
    v.unproject(state.camera);
    hand.current.rotation.x = MathUtils.lerp(
      hand.current.rotation.x,
      0,
      0.2,
    );
    hand.current.position.lerp({ x: v.x, y: v.y, z: v.z }, 0.9);
  });
  return (
    <group ref={hand}>
      <primitive
        scale={0.1}
        rotation={[0, Math.PI, 0]}
        position={[0, 0, 0]}
        object={scene}
        children-0-castShadow
      />
    </group>
  );
};

export default Astronaut;
