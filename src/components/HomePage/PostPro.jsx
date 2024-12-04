import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass } from "three-stdlib";
import { Effects } from "@react-three/drei";

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

function Postpro() {
  const water = useRef();
  useFrame((state) => (water.current.time = state.clock.elapsedTime * 4));
  return (
    <Effects disableGamma>
      <waterPass ref={water} factor={1} />
      <unrealBloomPass args={[undefined, 1.25, 1, 0]} />
    </Effects>
  );
}

export default Postpro;