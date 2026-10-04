import { Image, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing } from "maath";
import { RigidBody } from "@react-three/rapier";

function Figure({ url, boxGeometry, materialMain, materialBasic, ...props }) {
  const frame = useRef();
  const image = useRef();
  const [hovered, hover] = useState(false);

  useCursor(hovered);
  useFrame((_, dt) => {
    easing.damp3(
      image.current.scale,
      [0.98 * (hovered ? 0.95 : 1), 0.9 * (hovered ? 0.905 : 1), 1],
      0.1,
      dt,
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "#00f" : "#ffffff",
      0.1,
      dt,
    );
  });
  return (
    <group {...props}>
      <RigidBody {...props} type="fixed" colliders="cuboid">
        <mesh
          onPointerOver={(e) => (e.stopPropagation(), hover(true))}
          onPointerOut={() => hover(false)}
          scale={[15, 6, 1]}
          position={[0, 3, 0]}
          geometry={boxGeometry}
          material={materialMain}
        >
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[0.99, 0.93, 0.9]}
            position={[0, 0, 0.2]}
            geometry={boxGeometry}
            material={materialBasic}
          ></mesh>
          <Image
            ref={image}
            raycast={() => null}
            scale={[0.98, 0.9, 1]}
            position={[0, 0, 0.7]}
            url={url}
          />
        </mesh>
      </RigidBody>
    </group>
  );
}

export default Figure;
