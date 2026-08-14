import { useMemo, useState } from "react";
import Book from "./Books/Book";
import Library from "./Library";
import useStoreHomePage from "../../context/homepage/store";
import { useShallow } from "zustand/react/shallow";
import Board from "./Board";
import { Text } from "@react-three/drei";

const Scene = ({ objects }) => {
  // first left top -90 135 110
  // first right top 3 135 110
  // one 4
  // first right top 3 109 110
  //
  // second top left 18,135,110
  // top right [113,135,110]
  // top right [113,135,110]
  // top right [113,135,110]
  // aggiustare dimensione libri a 5, davanti allineati dietro no
  // 95 / 5  = 19 * 4 = 76  facciamo 48 ? si
  //

  const { pageId, updatePageId } = useStoreHomePage(useShallow((state) => state));

  const [hoverName, setName] = useState(null);

  const objectSize = 5; // Dimensione di ogni oggetto

  const distributedObjects = useMemo(() => {
    const regions = {
      topLeft: { start: -90, end: 3 },
      topRight: { start: 18, end: 113 },
    };

    const regionPositions = {
      topLeft: [],
      topRight: [],
    };

    const generateRandomPosition = (range, existingPositions) => {
      const MAX_ATTEMPTS = 100;

      const minX = range.start + objectSize / 2;
      const maxX = range.end - objectSize / 2;

      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const position = {
          x: Math.random() * (maxX - minX) + minX,
          y: 35,
          z: 100,
        };

        const overlap = existingPositions.some(
          (pos) => Math.abs(pos.x - position.x) < objectSize,
        );

        if (!overlap) {
          return position;
        }
      }

      throw new Error("Impossibile trovare una posizione libera.");
    };

    return objects.map((obj) => {
      const region = regions[obj.region];

      if (!region) {
        throw new Error(`Regione non valida: ${obj.region}`);
      }

      const newPosition = generateRandomPosition(
        region,
        regionPositions[obj.region],
      );

      regionPositions[obj.region].push(newPosition);

      return {
        ...obj,
        position: newPosition,
      };
    });
  }, [objects, objectSize]);


  const OnPointerOver = (e, item) => {
    e.stopPropagation();
    setName(item.name);
  };
  const OnPointerOut = (e) => {
    e.stopPropagation();
    setName(null);
  };

  return (
    <group>
      <Library />
      <Board page={pageId} onClickBack={() => updatePageId(null)} />
      <Text position={[15, 0, 130]} scale={10}>
        {hoverName}
      </Text>
      {distributedObjects.map((item) => (
        <Book
          key={item.id}
          bookType={item.bookType}
          bookName={item.name}
          position={[item.position.x, item.position.y, item.position.z]}
          onClick={(e) => {
            updatePageId(item);
            e.stopPropagation();
          }}
          onPointerEnter={(e) => OnPointerOver(e, item)}
          onPointerLeave={(e) => OnPointerOut(e)}
        />
      ))}
    </group>
  );
};

export default Scene;
