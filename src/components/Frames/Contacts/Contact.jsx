import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import PlanePhysics from "../../ShowRoom/PlanePhysics";
import Player from "../../ShowRoom/Player";
import WordPhysical from "./WordPhysics";
import MonitorStaticPhysic from "../AboutMe/MonitorStaticPhysic";
import Mobile from "../mobile";
import file from "../../../assets/textures/venere.hdr";
import { Environment } from "@react-three/drei";
import Helper from "../helper";
import CosmicObjectPhysics from "../../Navigation/CosmicObjectPhysics/CosmicObjectPhysics.jsx"

function Contact() {
  const words = useMemo(
    () => [
      {
        text: "Linkedin",
        link: "https://www.linkedin.com/in/kevin-de-jesus-sinchi-soto",
        position: [-15, 0, -8],
      },
      {
        text: "Github",
        link: "https://github.com/RevenBot",
        position: [0, 0, -3],
      },
      {
        text: "revenbot@proton.me",
        link: "",
        position: [15, 0, -8],
      },
    ],
    [],
  );

  return (
    <>
      <Mobile />
      <Canvas onPointerDown={(e) => e.target.requestPointerLock()}>
        <ambientLight color={"#fff"} intensity="1" />
        <Physics timeStep="vary">
          <PlanePhysics />
          <Player />
          {words.map((item, i) => (
            <WordPhysical key={i} wordData={item} />
          ))}
          <MonitorStaticPhysic position={[-7, 0, -4]} scale={1.5}>
            {`:)  HR  :)`}
          </MonitorStaticPhysic>
          <MonitorStaticPhysic position={[6, 0, -1.5]} scale={1.2}>
            {`^ ^ Projects ^ ^`}
          </MonitorStaticPhysic>
          <CosmicObjectPhysics
            position={[0, 2, 100]}
            label="Home"
            url="/"
            glowColor="#2527a0"
          />
          <CosmicObjectPhysics
            position={[-100, 2, 0]}
            label="Skills"
            url="/page/skills"
            glowColor="#b63131"
          />
          <CosmicObjectPhysics
            position={[100, 2, 0]}
            label="About Me"
            url="/page/about-me"
            glowColor="#01c3f3"
          />
        </Physics>
        <Environment files={file} background />
        <Helper />
      </Canvas>
    </>
  );
}

export default Contact;
