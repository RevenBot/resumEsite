import { extend } from "@react-three/fiber";
import {
  UnrealBloomPass,
} from "three-stdlib";
import { Effects } from "@react-three/drei";
import {
  Vector2,
  UnsignedByteType,
  SRGBColorSpace,
} from "three";

extend({ UnrealBloomPass });

function Postpro() {
  return (
    <Effects disableGamma type={UnsignedByteType} colorSpace={SRGBColorSpace}>
      <unrealBloomPass args={[new Vector2(256, 256), 0.7, 1, 100]} />
    </Effects>
  );
}

export default Postpro;
