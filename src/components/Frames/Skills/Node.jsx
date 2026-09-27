import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Circle, context } from "./Nodes";
import { Vector3 } from "three";
import { Svg, Text3D } from "@react-three/drei";

const Node = forwardRef(
  (
    {
      color = "black",
      name,
      svgUrl = "",
      connectedTo = [],
      position = [0, 0, 0],
      ...props
    },
    ref,
  ) => {
    const set = useContext(context);
    const [pos] = useState(() => new Vector3(...position));
    const state = useMemo(
      () => ({ position: pos, connectedTo }),
      [pos, connectedTo],
    );
    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
      set((nodes) => [...nodes, state]);
      return () => void set((nodes) => nodes.filter((n) => n !== state));
    }, [state, pos, set]);
    // Drag n drop, hover
    const [hovered, setHovered] = useState(false);

    const fontProps = {
      font: "/Inter_Medium_Regular.json",
      fontSize: 1,
      letterSpacing: -0.09,
      lineHeight: 0.6,
      "material-toneMapped": false,
      color: "red",
    };

    return (
      <Circle
        ref={ref}
        opacity={0.2}
        radius={0.5}
        color={color}
        position={pos}
        {...props}
      >
        <Circle
          radius={0.25}
          position={[0, 0, 0.0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          color={hovered ? "#ff1050" : color}
        >
          <Text3D
            scale={props.scale * 0.15}
            position={[-0.5, 0.3, 0.01]}
            {...fontProps}
          >
            {name}
          </Text3D>
          <Svg position={[0, 0, 0.01]} scale={0.01} src={svgUrl} />
        </Circle>
      </Circle>
    );
  },
);

Node.displayName = "Node";

export default Node;
