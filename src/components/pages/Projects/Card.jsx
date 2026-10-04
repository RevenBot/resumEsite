import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";
import { Text, useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

function ActiveCard({ hovered, url, textContainer, ...props }) {
  const ref = useRef();
  const texture = useTexture(url);
  useFrame((state, delta) => {
    easing.damp(ref.current.material, "opacity", hovered !== null, 0.3, delta);
  });
  return (
    <group {...props}>
      <Text
        fontSize={0.5}
        position={textContainer.position}
        anchorX={textContainer.anchorX}
        color="black"
      >
        {textContainer.text}
      </Text>
      <mesh ref={ref} position={[0, 0, 0]}>
        <roundedPlaneGeometry args={[9, 1.618 * 3, 0.2]} />
        <meshBasicMaterial map={texture} side={DoubleSide} transparent />
      </mesh>
    </group>
  );
}

export default ActiveCard;
