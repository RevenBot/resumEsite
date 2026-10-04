import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Word from "./Word";

extend({ TextGeometry });

function SwarmWords(props) {
  const { words } = props;
  return words.map((item, i) => <Word key={i}>{item.text}</Word>);
}

export default SwarmWords;
