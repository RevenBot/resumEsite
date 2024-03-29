import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import useStore from "../../context/mode/store";
import CarouselContainer from "../Carousel/CarouselContainer";
import framesComponents from "../Frames";
import Caos from "./Caos";
import { useTranslation } from "react-i18next";

const Background = () => {
  const { t } = useTranslation();
  const words = useMemo(
    () => [
      { text: t("phrase-1") },
      { text: t("phrase-2") },
      { text: t("phrase-3") },
      { text: t("phrase-4") },
      { text: "World" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "Hello" },
      { text: "World" },
      { text: "Hello" },
      { text: "World" },
    ],
    [t],
  );
  const frames = useMemo(() => framesComponents, []);
  const mode = useStore((state) => state.caosMode);

  return (
    <Canvas
      eventPrefix="client"
      camera={{ fov: 70, near: 1, far: 10000, position: [0, 0, 100] }}
    >
      {mode && <Caos words={words} />}
      {!mode && <CarouselContainer frames={frames} />}
    </Canvas>
  );
};

export default Background;
