import { RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";
import { useLocation } from "wouter";
import WormholeSphere from "../WormholeSphere/WormholeSphere.jsx";
import Glow from "../Glow/Glow.jsx"
import { Sparkles } from "@react-three/drei";

export default function CosmicObjectPhysics({
  position = [0, 0, 0],
  label = "Home",
  url = "/",
  external = false,
  glowColor = "#ffffff",
  scale = 1
}) {
  const [, setLocation] = useLocation();

  const onCollisionEnter = () => {
    if (external) {
      window.location.href = url;
    } else {
      setLocation(url);
    }
  };

  return (
    <Billboard position={position} scale={scale}>
      <RigidBody
        type="fixed"
        colliders="ball"
        gravityScale={0}
        onCollisionEnter={onCollisionEnter}
      >
        <WormholeSphere
          radius={20}
          detail={64}
          uTimeScaleVert={0.4}
          uNoiseScaleVert={1}
          uDisplacementScale={0.5}
          metalness={1}
          roughness={0.1}
        />
        <Text
          font="/Orbitron_Bold.woff"
          position={[0, 22, 10]}
          fontSize={10}
          color="#050505"
          outlineWidth={0.04}
          outlineColor={glowColor}
          letterSpacing={0.06}
          anchorX="center"
          anchorY="middle"
        >
          {label}
          <meshBasicMaterial
            color="#050505"
            toneMapped={false}
          />
        </Text>
      </RigidBody>
      <Glow color={glowColor} scale={50} alpha={1} />
      <Sparkles
        count={100}
        scale={25}
        size={50}
        speed={1}
        color={"#ffffff"}
      />

    </Billboard>
  );
}
