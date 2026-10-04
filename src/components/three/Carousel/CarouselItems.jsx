import { Frame } from "./Frame";

function CarouselItems({ frames, radius = 1.6 }) {
  const count = frames.length;
  return (
    <>
      {frames.map((item, i) => (
        <Frame
          key={item.id}
          item={item}
          bg="#e4cdac"
          position={[
            Math.sin(((i + 1) / count) * Math.PI * 2) * radius,
            0,
            Math.cos(((i + 1) / count) * Math.PI * 2) * radius,
          ]}
          rotation={[0, ((i + 1) / count) * Math.PI * 2, 0]}
        >
          {item.mesh}
        </Frame>
      ))}
    </>
  );
}

export default CarouselItems;
