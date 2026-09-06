import { extend } from "@react-three/fiber";
import { WaterPass, UnrealBloomPass, LUTPass } from "three-stdlib";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { Effects } from "@react-three/drei";
import { Vector2, UnsignedByteType, SRGBColorSpace } from "three";

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

function Postpro() {
  return (
    <Effects disableGamma type={UnsignedByteType} colorSpace={SRGBColorSpace}>
      <filmPass args={[0.5, false]} />
      <unrealBloomPass args={[new Vector2(256, 256), 0.7, 1, 100]} />
    </Effects>
  );
}

export default Postpro;
