import Monitor from "./Monitor";

function SwarmMonitors(props) {
  const { words, material } = props;
  return words.map((item, i) => (
    <Monitor key={i} material={material}>
      {item.text}
    </Monitor>
  ));
}

export default SwarmMonitors;
