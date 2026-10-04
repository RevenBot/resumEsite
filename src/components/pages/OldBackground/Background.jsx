import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import useStore from "../../../context/mode/store";
import useStoreM from "../../../context/banner/store";
import CarouselContainer from "../../three/Carousel/CarouselContainer";
import framesComponents from "../index";
import Caos from "./Caos";
import { useTranslation } from "react-i18next";
import TimeoutMessage from "../../layout/TimeoutMessage/TimeoutMessage";
import { AdaptiveDpr } from "@react-three/drei";

const Background = () => {
  const { t } = useTranslation();
  const words = useMemo(
    () => [
      { text: t("phrase-1") },
      { text: t("phrase-2") },
      { text: t("phrase-3") },
      { text: t("phrase-4") },
    ],
    [t],
  );
  const frames = useMemo(() => framesComponents, []);
  const mode = useStore((state) => state.caosMode);
  const resetStatus = useStoreM((state) => state.resetStatus);

  const reset = () => {
    resetStatus();
  };

  return (
    <>
      <TimeoutMessage />
      <Canvas eventPrefix="client" onPointerLeave={() => reset()}>
        {mode && <Caos words={words} />}
        {!mode && <CarouselContainer frames={frames} />}
        <AdaptiveDpr/>
      </Canvas>
    </>
  );
};

export default Background;
