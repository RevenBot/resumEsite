import {
  PerspectiveCamera,
  RenderTexture,
  Text,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function MonitorStatic({ children, ...props }) {
  const ref = useRef();

  return (
    <group ref={ref} {...props}>
      <ScreenText frame="Object_230" panel="Object_231" {...props}>
        {children}
      </ScreenText>
    </group>
  );
}

function ScreenText({ invert, x = 1, y = 1.1, children, ...props }) {
  const textRef = useRef();
  const rand = Math.random() * 10000;
  useFrame(
    (state) =>
      (textRef.current.position.x =
        x + Math.sin(rand + state.clock.elapsedTime / 2) * 8),
  );
  return (
    <Screen {...props}>
      <PerspectiveCamera
        makeDefault
        manual
        aspect={1 / 1}
        position={[0, 0, 15]}
      />
      <color attach="background" args={[invert ? "black" : "#35c19f"]} />
      <directionalLight position={[10, 10, 5]} />
      <Text
        font="/Inter-Bold.woff"
        position={[x, y, 0]}
        ref={textRef}
        fontSize={3}
        letterSpacing={-0.1}
        color={!invert ? "black" : "#35c19f"}
      >
        {children}
      </Text>
    </Screen>
  );
}

function Screen({ frame, panel, children, ...props }) {
  const { nodes } = useGLTF("/computers_1-transformed.glb");
  return (
    <group {...props}>
      <mesh
        scale={1}
        castShadow
        receiveShadow
        geometry={nodes[frame].geometry}
        material={nodes[frame].material}
      ></mesh>
      <mesh scale={1} geometry={nodes[panel].geometry}>
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture width={512} height={512} attach="map" anisotropy={16}>
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

export default MonitorStatic;
