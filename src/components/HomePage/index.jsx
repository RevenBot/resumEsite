import { PresentationControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Swarm from "./Swarm";
import Postpro from "./PostPro";
import Ambient from "./Ambient";
import Scene from "./Scene";
import Astronaut from "./Astronaut";
import { useMemo } from "react";
import pages from "../Pages/index.jsx";

const HomePage = () => {
  const p = useMemo(() => pages, []);
  return (
    <Canvas
      linear
      flat
      legacy
      dpr={1}
      camera={{ fov: 110, position: [0, 50, 160] }}
      style={{ cursor: "none" }}
    >
      <PresentationControls
        cursor={false}
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Scene objects={p} />
        <Ambient />
      </PresentationControls>
      <Astronaut />
      <Swarm count={20000} />
      <Postpro />
      <Stats/>
    </Canvas>
  );
};

export default HomePage;
