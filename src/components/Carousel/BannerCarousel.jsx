import {
  PerspectiveCamera,
  RenderTexture,
  Text,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, RepeatWrapping } from "three";
import "../utils/util.js";
import useStore from "../../context/banner/store.js";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";

function Banner(props) {
  const ref = useRef();
  const scroll = useScroll();
  const { t } = useTranslation("carousel");
  const { bannerMessage } = useStore(useShallow((state) => state));

  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 8;
  });

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        toneMapped={false}
        side={DoubleSide}
        transparent={true}
        opacity={0.8}
      >
        <RenderTexture
          attach="map"
          repeat={[15, 1]}
          anisotropy={16}
          wrapS={RepeatWrapping}
          wrapT={RepeatWrapping}
        >
          <PerspectiveCamera
            makeDefault
            manual
            aspect={18}
            position={[0, 0, 5]}
          />
          <color attach="background" args={["#c9af89"]} />
          <ambientLight intensity={1} />
          <Text fontSize={3} color="#000000">
            {t(bannerMessage)}
          </Text>
        </RenderTexture>
      </meshSineMaterial>
    </mesh>
  );
}

export default Banner;
