import { Canvas } from "@react-three/fiber";
import SwarmObjects from "./SwarmObjects";
import SwarmWords from "./SwarmWords";
import { useMemo } from "react";
import SwarmMonitors from "./SwarmMonitors";
import useStore from "../../context/mode/store";

const Background = () => {
  const words = useMemo(
    () => [
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "World" },
    ],
    [],
  );
  const mode = useStore((state) => state.caosMode);
  return (
    <Canvas
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      camera={{ fov: 75, position: [0, 0, 20] }}
    >
      <ambientLight intensity="0.01" />
      <pointLight distance={60} intensity={100000} color="lightblue" />
      <spotLight
        intensity={400000}
        position={[0, 0, 300]}
        penumbra={0.1}
        color="purple"
      />
      <mesh>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          color="#00ff00"
          roughness={0.5}
          depthTest={false}
        />
      </mesh>
      {mode && (
        <>
          <SwarmObjects count={1000} />
          <SwarmWords words={words} />
          <SwarmMonitors words={words} />
        </>
      )}
    </Canvas>
  );
};

export default Background;
