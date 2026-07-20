import Figures from "./../../ShowRoom/Figures";
import { Physics, RigidBody } from "@react-three/rapier";
import Player from "../../ShowRoom/Player";
import { Canvas } from "@react-three/fiber";
import PlanePhysics from "../../ShowRoom/PlanePhysics";
import file from "../../../assets/textures/multi_nebulae.hdr";
import { Environment } from "@react-three/drei";
import Mobile from "../mobile";
import Helper from "../helper";

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
          <RigidBody type="fixed" colliders="trimesh">
            <PlanePhysics />
          </RigidBody>
          <Figures images={images} />
          <Player />
        </Physics>
        <Environment files={file} background />
        <Helper />
      </Canvas>
    </>
  );
};

export default Memories;
