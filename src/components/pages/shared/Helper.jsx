import { useTexture } from "@react-three/drei";

const Helper = () => {
  const texture = useTexture("/img/projects/wasd_controls.png");
  const aspect = texture.image
    ? texture.image.width / texture.image.height
    : 1;
  return (
    <mesh position={[0, 7, 20]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[15, 15 / aspect]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
};

export default Helper;
