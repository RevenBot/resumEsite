import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
const Library = () => {
  const library = useLoader(GLTFLoader, "/models/homepage/scene.glb");
  return (
    <>
      <primitive
        object={library.scene}
        position={[0, -100, 0]}
        rotation={[0, Math.PI, 0]}
        children-0-castShadow
      />
    </>
  );
};

export default Library;
