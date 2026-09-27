import {
  PerspectiveCamera,
  RenderTexture,
  Text,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Monitor({ children, ...props }) {
  const ref = useRef();

  const particle = useMemo(() => {
    return {
      t: Math.random() * 100,
      factor: 20 + Math.random() * 100,
      speed: 0.01 + Math.random() / 200,
      xFactor: -50 + Math.random() * 100,
      yFactor: -50 + Math.random() * 100,
      zFactor: -50 + Math.random() * 100,
      mx: 0,
      my: 0,
    };
  }, []);

  useFrame((state) => {
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
  });

  return (
    <group ref={ref} {...props} dispose={null}>
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
        x + Math.sin(rand + state.clock.elapsedTime / 2) * 6),
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
      <ambientLight intensity={0.5} />
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

function Screen({ frame, panel, material, children, ...props }) {
  const { nodes } = useGLTF("/computers_1-transformed.glb");
  return (
    <group {...props}>
      <mesh
        scale={1}
        castShadow
        receiveShadow
        geometry={nodes[frame].geometry}
        material={material}
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

export default Monitor;
