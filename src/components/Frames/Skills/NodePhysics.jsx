import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { CirclePhysical, context } from "./NodesPhysics";
import {  Vector3 } from "three";
import { Svg, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const NodePhysical = forwardRef(
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
    const [pos, setPos] = useState(() => new Vector3(...position));
    const state = useMemo(
      () => ({ position: ref, connectedTo }),
      [ref, connectedTo],
    );

    const onCollision = (_) => {
      setPos(_.other.rigidBody?.translation());
      set((nodes) => [...nodes, state]);
    };

    // Register this node on mount, unregister on unmount
    useLayoutEffect(() => {
      set((nodes) => [...nodes, state]);
      return () => void set((nodes) => nodes.filter((n) => n !== state));
    }, [state, pos, set]);
    // Drag n drop, hover
    const [hovered, setHovered] = useState(false);

    const fontProps = {
      font: "/Inter-Bold.woff",
      fontSize: 1,
      letterSpacing: -0.09,
      lineHeight: 0.6,
      "material-toneMapped": false,
      color: "#789DBC",
    };

    return (
      <RigidBody
        gravityScale={0}
        lockRotations={true} // Blocca tutte le rotazioni
        enabledTranslations={[true, true, true]}
        type="dynamic"
        colliders="ball"
        mass={1}
        linearDamping={1}
        onCollisionEnter={onCollision}
        ref={ref}
        position={position}
        {...props}
      >
        <CirclePhysical opacity={0.2} radius={0.5} color={color} {...props}>
          <CirclePhysical
            radius={0.25}
            position={[0, 0, 0.0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            color={hovered ? "#ff1050" : color}
          >
            <Text
              scale={props.scale * 0.09}
              position={[0, 0.6, 0.01]}
              {...fontProps}
            >
              {name}
            </Text>
            <Svg position={[0, 0, 0.01]} scale={0.01} src={svgUrl} />
          </CirclePhysical>
        </CirclePhysical>
      </RigidBody>
    );
  },
);

NodePhysical.displayName = "NodePhysical";

export default NodePhysical;
