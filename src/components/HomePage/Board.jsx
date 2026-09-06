import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { Container, Text } from "@react-three/uikit";
import SafeImage from "../Frames/SafeImage";
import { Button } from "../default/button";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

const Board = ({ page, onClickBack }) => {
  const [, setLocation] = useLocation();
  const { t } = useTranslation("pages");
  const { t: tra } = useTranslation();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024,
  );
  const intialPosition = useMemo(() => {
    if (!isMobile) {
      return new Vector3(0, 50, 160);
    } else {
      return new Vector3(0, 50, 240);
    }
  }, [isMobile]);

  const boardPosition = useMemo(() => {
    if (!isMobile) {
      return new Vector3(0, 200, 0);
    } else {
      return new Vector3(0, 200, 50);
    }
  }, [isMobile]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    if (typeof window !== "undefined") {
      handleResize();
    }
  });

  useFrame((state, dt) => {
    state.camera.position.lerp(
      page == null ? intialPosition : boardPosition,
      MathUtils.damp(0, 1, 3, dt),
    );
  });
  return (
    <>
      <mesh
        position={isMobile ? [-200, -300, -500] : [-700, 150, -500]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <Container pixelSize={2} sizeX={200} sizeY={800} flexDirection="row">
          <Container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
          >
            <Button onClick={() => onClickBack(null)} variant="outline">
              <Text color="white">{tra("back")}</Text>
            </Button>
          </Container>
        </Container>
      </mesh>
      <mesh position={[0, 150, -500]}>
        <Container pixelSize={6} sizeX={1200} sizeY={800} flexDirection="row">
          <Container
            borderWidth={15}
            borderColor="#333"
            backgroundColor={page ? "#000" : "#333"}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={4}
          >
            {page?.name != null && (
              <Container flexDirection="column" gap={4}>
                <Text fontSize={10} padding={8} color="white">
                  {page?.name != null && t(page?.name)}
                </Text>
              </Container>
            )}
            {page?.stringLocalize != null && (
              <Container flexDirection="column" gap={4}>
                <Text fontSize={7} color="white">
                  {page?.stringLocalize != null && t(page?.stringLocalize)}
                </Text>
              </Container>
            )}
            {page?.imageUrl != null && (
              <Container flexDirection="column" gap={4}>
                <SafeImage width={150} src={page?.imageUrl} />
              </Container>
            )}
            {page?.linkButton != null && (
              <Container flexDirection="column" gap={4}>
                <Button
                  height={5}
                  onClick={() => window.open(page?.linkButton, "_blank")}
                  variant="outline"
                >
                  <Text color="white">{tra("visit")}</Text>
                </Button>
              </Container>
            )}
          </Container>
        </Container>
      </mesh>
      <mesh
        position={isMobile ? [300, -300, -430] : [800, 150, -500]}
        rotation={[0, (7 * Math.PI) / 4, 0]}
      >
        <Container pixelSize={2} sizeX={200} sizeY={800} flexDirection="row">
          <Container
            flexDirection="row"
            alignItems="center"
            justifyItems="center"
            justifyContent="space-between"
            flexGrow={1}
          >
            <Container
              flexDirection="row"
              alignItems="center"
              justifyItems="center"
              justifyContent="space-between"
              flexGrow={1}
            >
              <Button
                onClick={() => setLocation(`/page/${page.relativeUrl}/`)}
                variant="outline"
              >
                <Text color="white">3D Version</Text>
              </Button>
            </Container>
          </Container>
        </Container>
      </mesh>
    </>
  );
};

export default Board;
