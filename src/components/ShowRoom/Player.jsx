import { Gltf, KeyboardControls, SpotLight, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Ecctrl } from "ecctrl";
import { EcctrlCameraControls } from "ecctrl/camera";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

const Player = () => {
  const ecctrl = useRef();
  const cameraControls = useRef();
  const cameraUp = useRef(new THREE.Vector3());
  const light = useRef();
  const lightTarget = useRef();
  const cameraInitialized = useRef(false);
  const mouseDelta = useRef({ x: 0, y: 0 });
  const [, getKeys] = useKeyboardControls();
  const { camera, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (e) => {
      if (document.pointerLockElement === canvas) {
        mouseDelta.current.x += e.movementX;
        mouseDelta.current.y += e.movementY;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame(() => {
    if (light.current && lightTarget.current) {
      light.current.target = lightTarget.current;
    }

    if (ecctrl.current) {
      const keys = getKeys();
      const movement = {
        forward: false,
        backward: false,
        leftward: false,
        rightward: false,
        run: false,
        jump: false,
        joystick: { x: 0, y: 0 },
      };

      Object.entries(keys).forEach(([key, value]) => {
        switch (key) {
          case "forward":
            movement.forward = value;
            break;
          case "backward":
            movement.backward = value;
            break;
          case "leftward":
            movement.leftward = value;
            break;
          case "rightward":
            movement.rightward = value;
            break;
          case "run":
            movement.run = value;
            break;
          case "jump":
            movement.jump = value;
            break;
        }
      });

      ecctrl.current.setMovement(movement);
    }

    if (ecctrl.current && cameraControls.current) {
      const target = ecctrl.current.currPos;

      if (!cameraInitialized.current && cameraControls.current.setLookAt) {
        cameraControls.current.setLookAt(
          target.x,
          target.y + 2.5,
          target.z - 6,
          target.x,
          target.y,
          target.z,
          false,
        );
        cameraInitialized.current = true;
      } else {
        cameraControls.current.moveTo(target.x, target.y, target.z, true);
      }

      cameraUp.current.copy(ecctrl.current.upAxis);
      camera.up.lerp(cameraUp.current, 0.1);
      cameraControls.current.setUp(camera.up);

      if (mouseDelta.current.x !== 0 || mouseDelta.current.y !== 0) {
        cameraControls.current.rotate(
          -mouseDelta.current.x * 0.003,
          -mouseDelta.current.y * 0.003,
          true,
        );
        mouseDelta.current.x = 0;
        mouseDelta.current.y = 0;
      }
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <Ecctrl ref={ecctrl} maxWalkVel={5} maxRunVel={10} position={[0, 10, 10]}>
          <mesh position={[0, -1, 4]} ref={lightTarget} visible={false} />
          <Gltf
            castShadow
            receiveShadow
            scale={0.4}
            position={[0, -0.5, 0]}
            src="/spaceship.glb"
          />
          <SpotLight
            ref={light}
            position={[0, 0.2, 1]}
            angle={0.5}
            color={"#fff"}
            penumbra={1}
            intensity={2000}
            distance={4}
            castShadow
          />
        </Ecctrl>
      </Suspense>
      <EcctrlCameraControls ref={cameraControls} makeDefault smoothTime={0.1} />
    </>
  );
};

const PlayerWithControls = () => (
  <KeyboardControls map={keyboardMap}>
    <Player />
  </KeyboardControls>
);

export default PlayerWithControls;
