import { Container, Image } from "@react-three/uikit";

const Helper = () => {
  return (
    <mesh position={[0, 7, 20]} rotation={[0, Math.PI, 0]}>
      <Container pixelSize={6} sizeX={15} sizeY={7} flexDirection="row">
        <Container
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={4}
        >
          <Container flexDirection="column" gap={4}>
            <Image width={1400} src={"/img/projects/wasd_controls.png"} />
          </Container>
        </Container>
      </Container>
    </mesh>
  );
};

export default Helper;
