import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef } from "react";
import { createContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { DoubleSide } from "three";

export const context = createContext();

export const Circle = forwardRef(
  (
    {
      children,
      opacity = 1,
      radius = 0.05,
      segments = 32,
      color = "#ff1050",
      ...props
    },
    ref,
  ) => {
    return (
      <mesh ref={ref} {...props}>
        <sphereGeometry args={[radius, segments]} />
        <meshBasicMaterial
          transparent={opacity < 1}
          opacity={opacity}
          color={color}
          side={DoubleSide}
        />
        {children}
      </mesh>
    );
  },
);

Circle.displayName = "Circle";

export function Nodes({ children }) {
  const group = useRef();
  const groupRevert = useRef();
  const [nodes, set] = useState([]);
  const lines = useMemo(() => {
    const lines = [];
    for (let node of nodes)
      node.connectedTo
        .map((ref) => [node.position, ref.current.position])
        .forEach(([start, end]) =>
          lines.push({
            start: start.clone().add({ x: 0.05, y: 0, z: 0 }),
            end: end.clone().add({ x: -0.05, y: 0, z: 0 }),
          }),
        );
    return lines;
  }, [nodes]);

  useFrame((_, delta) => {
    group.current.children.forEach(
      (group) =>
        (group.children[0].material.uniforms.dashOffset.value -= delta * 10),
    );
    groupRevert.current.children.forEach(
      (group) =>
        (group.children[0].material.uniforms.dashOffset.value += delta * 10),
    );
  });
  return (
    <context.Provider value={set}>
      <group ref={group}>
        {lines.map((line, index) => (
          <group key={index}>
            <QuadraticBezierLine
              key={index + "1"}
              {...line}
              color="blue"
              dashed
              dashScale={10}
              gapSize={20}
            />
            <QuadraticBezierLine
              key={index + "2"}
              {...line}
              color="white"
              lineWidth={0.5}
              transparent
              opacity={0.1}
            />
          </group>
        ))}
      </group>
      <group ref={groupRevert}>
        {lines.map((line, index) => (
          <group key={index}>
            <QuadraticBezierLine
              key={index + "1"}
              {...line}
              color="red"
              dashed
              dashScale={50}
              gapSize={20}
            />
            <QuadraticBezierLine
              key={index + "2"}
              {...line}
              color="white"
              lineWidth={0.5}
              transparent
              opacity={0.1}
            />
          </group>
        ))}
      </group>
      {children}
      {lines.map(({ start, end }, index) => (
        <group key={index} position-z={0}>
          <Circle scale={0.2} position={start} />
          <Circle scale={0.2} position={end} />
        </group>
      ))}
    </context.Provider>
  );
}
