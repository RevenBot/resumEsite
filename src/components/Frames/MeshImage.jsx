import { useTexture } from "@react-three/drei";

function MeshImage({ src, width, ...props }) {
  const texture = useTexture(src);
  const aspect = texture.image
    ? texture.image.width / texture.image.height
    : 1;
  return (
    <mesh {...props}>
      <planeGeometry args={[width, width / aspect]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
}

export default MeshImage;
