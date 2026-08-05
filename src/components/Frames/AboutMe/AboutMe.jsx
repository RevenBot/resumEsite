import { Environment, Preload, Text3D } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { useTranslation } from "react-i18next";
import { Physics, RigidBody } from "@react-three/rapier";
import MonitorStaticPhysic from "./MonitorStaticPhysic";
import PlanePhysics from "../../ShowRoom/PlanePhysics";
import Player from "../../ShowRoom/Player";
import file from "../../../assets/textures/silver_and_gold_nebulae.hdr";
import { Canvas } from "@react-three/fiber";
import Mobile from "../mobile";
import Helper from "../helper";
import CosmicObjectPhysics from "../../Navigation/CosmicObjectPhysics/CosmicObjectPhysics.jsx"

const AboutMe = () => {
  const { t, ready } = useTranslation("about-me", { useSuspense: false });

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#789DBC",
        roughness: 0,
        metalness: 1,
        fog: true,
      }),
    [],
  );

  return (
    <>
      <Mobile />
      <Canvas onPointerDown={(e) => e.target.requestPointerLock()}>
        <Suspense fallback={null}>
          <ambientLight color={"#fff"} intensity="1" />
          <Physics timeStep="vary">
            <MonitorStaticPhysic position={[-2, 0, 0]} scale={1.2}>
              {`ci{CTRL^R"0p`}
            </MonitorStaticPhysic>
            <MonitorStaticPhysic position={[-5, 0, -1]} scale={1.2}>
              {`:s/Junior/Mid/ge`}
            </MonitorStaticPhysic>
            <PlanePhysics />
            <RigidBody type="fixed" colliders="cuboid">
              <Text3D
                material={material}
                curveSegments={32}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.1}
                lineHeight={0.5}
                receiveShadow
                position={[-2, 4, 0]}
                font={"/Inter_Medium_Regular.json?url"}
              >
                {ready && t("phrase")}
              </Text3D>
            </RigidBody>
            <MonitorStaticPhysic
              position={[11, 0, 0]}
              scale={1.2}
              invert={true}
            >
              {`:wq`}
            </MonitorStaticPhysic>
            <MonitorStaticPhysic
              position={[14, 0, -1]}
              scale={1.2}
              invert={true}
            >
              {`:qa!`}
            </MonitorStaticPhysic>
            <RigidBody type="dynamic" colliders="ball">
              <Text3D
                curveSegments={32}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.1}
                lineHeight={0.5}
                receiveShadow
                position={[1, 6, -10]}
                scale={0.7}
                material={material}
                font={"/Inter_Medium_Regular.json?url"}
              >
                JUNIOR
              </Text3D>
            </RigidBody>
            <MonitorStaticPhysic position={[0, 0, -20]} scale={1.2}>
              {`Score`}
            </MonitorStaticPhysic>
            <MonitorStaticPhysic position={[6, 0, -20]} scale={1.2}>
              {`GOOOOOOL`}
            </MonitorStaticPhysic>
            <CosmicObjectPhysics
              position={[0, 2, 100]}
              label="Home"
              url="/"
              glowColor="#2527a0"
            />
            <CosmicObjectPhysics
              position={[-100, 2, 0]}
              label="Contacts"
              url="/page/contacts"
              glowColor="#29b347"
            />
            <CosmicObjectPhysics
              position={[100, 2, 0]}
              label="Skills"
              url="/page/skills"
              glowColor="#b63131"
            />
            <Player />
          </Physics>
          <Environment files={file} background />
          <Preload all />
          <Helper />
        </Suspense>
      </Canvas>
    </>
  );
};

export default AboutMe;
