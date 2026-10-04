import { useMemo } from "react";
import Word from "./Word";
import { Spherical, Vector3 } from "three";

function Cloud({ words, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const wordsObjects = useMemo(() => {
    const temp = [];
    const spherical = new Spherical();
    const phiSpan = Math.PI / (words.length + 1);
    const thetaSpan = (Math.PI * 2) / words.length;
    for (let i = 1; i < words.length + 1; i++)
      for (let j = 0; j < words.length; j++)
        temp.push([
          new Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j),
          ),
          words[j].text,
          words[j].link,
        ]);
    return temp;
  }, [words, radius]);
  return wordsObjects.map(([pos, word, link], index) => (
    <Word key={index} position={pos} link={link}>
      {word}
    </Word>
  ));
}

export default Cloud;
