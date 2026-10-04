import { useMemo } from "react";
import Figure from "./Figure";
import { BoxGeometry, MeshStandardMaterial } from "three";
import { MeshBasicMaterial } from "three";

const Figures = ({ images }) => {
  const boxGeometry = useMemo(() => new BoxGeometry(), []);
  const materialMain = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#151515",
        metalness: 0.5,
        roughness: 0.5,
        envMapIntensity: 2,
      }),
    [],
  );
  const materialBasic = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        fog: false,
        color: "#fff",
      }),
    [],
  );

  return (
    <group>
      {images.map(
        (props) => <Figure key={props.url} 
          boxGeometry={boxGeometry}
          materialMain={materialMain}
          materialBasic={materialBasic}
          {...props} /> /* prettier-ignore */,
      )}
    </group>
  );
};

export default Figures;
