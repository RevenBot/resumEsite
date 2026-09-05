import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Color, MeshStandardMaterial } from "three";
import useStore from "../../context/cameraCaos/store";

function Word({ children }) {
  const updateRotate = useStore((state) => state.updateRotate);

  const color = new Color();
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#ffd700",
        roughness: 0.9,
        metalness: 0.5,
      }),
    [],
  );

  const fontProps = {
    font: "/Inter_Medium_Regular.json",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const over = (e) => {
    e.stopPropagation();
    setHovered(true);
    updateRotate(false);
  };
  const out = () => {
    setHovered(false);
    updateRotate(true);
  };

  const particle = useMemo(() => {
    return {
      t: Math.random() * 100,
      factor: 20 + Math.random() * 100,
      speed: 0.000001 + Math.random() / 200,
      xFactor: -50 + Math.random() * 100,
      yFactor: -50 + Math.random() * 100,
      zFactor: -50 + Math.random() * 100,
      mx: 0,
      my: 0,
    };
  }, []);

  // Change the mouse cursor on hover¨
  // Tie component to the render-loop
  useFrame((state) => {
    ref.current.material.color.lerp(
      color.set(hovered ? "#ffd7ff" : "#ffd700"),
      0.1,
    );

    if (!hovered) {
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01;
      particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01;
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      t = t + speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      ref.current.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10,
      );
      ref.current.scale.setScalar(s * 10);
      ref.current.rotation.set(s * 5, s * 5, s * 5);
    }
  });
  return (
    <Text3D
      ref={ref}
      onPointerEnter={over}
      onPointerLeave={out}
      onClick={() => console.log("clicked")}
      {...fontProps}
      material={material}
    >
      {children}
    </Text3D>
  );
}

export default Word;
