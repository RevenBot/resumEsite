import Figures from "./../../ShowRoom/Figures";
import { Physics } from "@react-three/rapier";
import Player from "../../ShowRoom/Player";
import { Canvas } from "@react-three/fiber";
import PlanePhysics from "../../ShowRoom/PlanePhysics";
import file from "../../../assets/textures/multi_nebulae.hdr";
import { Environment } from "@react-three/drei";
import Mobile from "../mobile";
import Helper from "../helper";
import CosmicObjectPhysics from "../../Navigation/CosmicObjectPhysics/CosmicObjectPhysics.jsx"

const Memories = () => {
  const images = [
    {
      position: [7, 0, -2],
      rotation: [0, (11 * Math.PI) / 6, 0],
      url: "/img/projects/memories/home.png?url",
    },
    {
      position: [-7, 0, -2],
      rotation: [0, -(11 * Math.PI) / 6, 0],
      url: "/img/projects/memories/index.png?url",
    },
    {
      position: [4, 0, -8],
      rotation: [0, 0, 0],
      url: "/img/projects/memories/profile.png?url",
    },
    {
      position: [-4, 0, -8],
      rotation: [0, 0, 0],
      url: "/img/projects/memories/sign-in.png?url",
    },
  ];

  return (
    <>
      <Mobile />
      <Canvas onPointerDown={(e) => e.target.requestPointerLock()}>
        <ambientLight color={"#fff"} intensity="1" />
        <Physics timeStep="vary">
          <PlanePhysics />
          <Figures images={images} />
          <Player />
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
};

export default Memories;
