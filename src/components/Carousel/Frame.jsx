import { useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useCursor, MeshPortalMaterial, Text } from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing, geometry } from "maath";
import useStore from "../../context/banner/store";
import { useShallow } from "zustand/react/shallow";
import { DoubleSide } from "three";

extend(geometry);

export function Frame({
  item,
  bg,
  width = 1.2,
  height = 2,
  children,
  rotation,
  position,
  ...props
}) {
  const portal = useRef();
  const { updateStatus } = useStore(useShallow((state) => state));
  const { id, title, footer, description } = item;
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/frame/:id");
  const [hovered, hover] = useState(false);
  useCursor(
    hovered,
    "pointer",
    "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto",
  );
  useFrame((_, dt) => {
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt);
  });

  const OnPointerOver = (e) => {
    e.stopPropagation();
    hover(true);
    updateStatus(description);
  };
  const OnPointerOut = (e) => {
    e.stopPropagation();
    hover(false);
  };

  return (
    <group
      rotation={match ? [0, Math.PI * 2, 0] : rotation}
      position={match ? [0, 0, 0] : position}
      {...props}
    >
      <Text
        fontSize={0.25}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.575, 0.915, 0.02]}
        material-toneMapped={false}
      >
        {title}
      </Text>
      <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.55, -0.859, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.95, 0.01]}
        material-toneMapped={false}
      >
        {footer}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation("/frame/" + e.object.name)
        )}
        onPointerOver={(e) => OnPointerOver(e)}
        onPointerOut={(e) => OnPointerOut(e)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          worldUnits
          events={params?.id === id}
          side={DoubleSide}
        >
          <ambientLight color={bg} intensity="1" />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
