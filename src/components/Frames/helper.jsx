import { Container, Image, Root, Text } from "@react-three/uikit";

const Helper = () => {
  return (
    <mesh position={[0, 7, 20]} rotation={[0, Math.PI, 0]}>
      <Root pixelRatio={6} sizeX={15} sizeY={7} flexDirection="row">
        <Container
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={4}
        >
          <Container flexDirection="column" gap={4}>
            <Image width={1400} src={"/img/projects/wasd_controls.png?url"} />
          </Container>
        </Container>
      </Root>
    </mesh>
  );
};

export default Helper;
