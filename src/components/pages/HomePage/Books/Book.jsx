import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Book = ({ bookType, bookName, ...props }) => {
  const { scene } = useLoader(GLTFLoader, `/models/homepage/${bookType}.glb`);
  const [hover, setHover] = useState(false);

  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <Text
        color={hover ? "#964B00" : "#444"}
        position={[2.5, 10, 15]}
        rotation={[0, 0, Math.PI / 2]}
        scale={3}
      >
        {bookName}
      </Text>
      <primitive object={scene.clone()} children-0-castShadow />
    </group>
  );
};

export default Book;
