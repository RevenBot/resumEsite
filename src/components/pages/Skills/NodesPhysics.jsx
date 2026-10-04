import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef } from "react";
import { createContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Vector3 } from "three";

export const context = createContext();

export const CirclePhysical = forwardRef(
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
        />
        {children}
      </mesh>
    );
  },
);

CirclePhysical.displayName = "CirclePhysical";

export function NodesPhysics({ children }) {
  const group = useRef();
  const groupRevert = useRef();
  const [nodes, set] = useState([]);
  const lines = useMemo(() => {
    const vec = new Vector3();
    const lines = [];
    for (let node of nodes)
      node.connectedTo
        .map((ref) => {
          return [
            node.position.current.translation(),
            ref.current.translation(),
          ];
        })
        .forEach(([start, end]) => {
          const a = vec.set(end.x, end.y, end.z).clone();
          const b = vec.set(start.x, start.y, start.z).clone();
          lines.push({
            start: b,
            end: a,
          });
        });
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
              raycast={() => {
                return;
              }}
              dashed
              dashScale={10}
              gapSize={20}
            />
            <QuadraticBezierLine
              key={index + "2"}
              {...line}
              color="white"
              raycast={() => {
                return;
              }}
              lineWidth={10}
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
              dashScale={10}
              gapSize={20}
              raycast={() => {
                return;
              }}
            />
            <QuadraticBezierLine
              key={index + "2"}
              {...line}
              color="white"
              lineWidth={10}
              transparent
              opacity={0.1}
              raycast={() => {
                return;
              }}
            />
          </group>
        ))}
      </group>
      {children}
      {lines.map(({ start, end }, index) => (
        <group key={index} position-z={0}>
          <CirclePhysical color={"#ffffff"} scale={1} position={start} />
          <CirclePhysical color={"blue"} scale={1} position={end} />
        </group>
      ))}
    </context.Provider>
  );
}
