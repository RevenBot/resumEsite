import { Billboard, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";

function Word({ link, children, ...props }) {
  const color = new Color();
  const fontProps = {
    font: "/Inter_Medium_Regular.json",
    fontSize: 0.5,
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
      color.set(hovered ? "#fa2720" : "white"),
      0.1,
    );
  });
  console.log(props);
  return (
    <Billboard {...props}>
      <Text3D
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => window.open(link, "_blank")}
        {...fontProps}
      >
        {children}
      </Text3D>
    </Billboard>
  );
}

export default Word;
