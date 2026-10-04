import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";

function WordPhysical({ wordData }) {
  const color = new Color();
  const fontProps = {
    font: "/Inter_Medium_Regular.json",
    fontSize: 10,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame(() => {
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "#789DBC"),
      0.1,
    );
  });
  return (
    <RigidBody type="fixed" colliders="cuboid" position={wordData.position}>
      <Text3D
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => window.open(wordData.link, "_blank")}
        scale={3}
        {...fontProps}
      >
        {wordData.text}
      </Text3D>
    </RigidBody>
  );
}

export default WordPhysical;
