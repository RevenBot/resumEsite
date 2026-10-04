import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { suspend } from "suspend-react";
import { HDRJPGLoader } from "@monogrid/gainmap-js";
import { EquirectangularReflectionMapping } from "three";

function EnvironmentSite({ isMobile }) {
  const gl = useThree((state) => state.gl);

  const texture = suspend(async () => {
    const loader = new HDRJPGLoader(gl);
    let url = "/omegacanistest.jpg";
    if (isMobile) {
      url = "/omegacanis480.jpg";
    }
    const result = await loader.loadAsync(url);
    result.renderTarget.texture.mapping = EquirectangularReflectionMapping;
    // loader.dispose() call this if implementeW546,
    return result.renderTarget.texture;
  }, [isMobile]);
  return <Environment map={texture} background />;
}

export default EnvironmentSite;
