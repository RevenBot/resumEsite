import { createRef, useState } from "react";
import { Environment } from "@react-three/drei";
import file from "../../../assets/textures/nebula.hdr";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import PlanePhysics from "../../ShowRoom/PlanePhysics";
import Player from "../../ShowRoom/Player";
import NodePhysical from "./NodePhysics";
import { NodesPhysics } from "./NodesPhysics";
import Mobile from "../mobile";
import Helper from "../helper";

function Skills() {
  const [
    [
      frontend,
      html,
      css,
      javascript,
      react,
      blazor,
      backend,
      csharp,
      python,
      dotnet,
      django,
      graphql,
      restApi,
      mysql,
      postgresql,
    ],
  ] = useState(() => [...Array(15)].map(createRef));

  return (
    <>
      <Mobile />
      <Canvas onPointerDown={(e) => e.target.requestPointerLock()}>
        <ambientLight color={"#fff"} intensity="1" />
        <Physics timeStep="vary">
          <PlanePhysics />
          <Player />
          <NodesPhysics>
            <NodePhysical
              ref={frontend}
              name="frontend"
              color="#204090"
              position={[-2, 1, -20]}
              scale={1.6}
              connectedTo={[backend]}
            />
            <NodePhysical
              ref={html}
              name="    html"
              color="#fcba03"
              position={[-12, 1, -12]}
              scale={1.6}
              connectedTo={[frontend, react, blazor]}
            />
            <NodePhysical
              ref={css}
              name="    css"
              color="#001aff"
              position={[-12, 1, -6]}
              scale={1.6}
              connectedTo={[frontend, react, blazor]}
            />
            <NodePhysical
              ref={javascript}
              name="javascript"
              color="#204090"
              position={[-12, 1, -2]}
              scale={1.6}
              connectedTo={[frontend, react, blazor]}
            />
            <NodePhysical
              ref={react}
              name="   react"
              color="#00bbff"
              position={[-6, 1, -12]}
              scale={1.6}
              connectedTo={[frontend, graphql]}
            />
            <NodePhysical
              ref={blazor}
              name="blazor"
              color="#000dff"
              position={[-6, 1, -6]}
              scale={1.6}
              connectedTo={[frontend, restApi]}
            />

            <NodePhysical
              ref={backend}
              name="backend"
              color="#ff0000"
              position={[2, 1, -20]}
              scale={1.6}
              connectedTo={[csharp, python, dotnet]}
            />
            <NodePhysical
              ref={csharp}
              name="      c#"
              color="#00ff1a"
              position={[12, 1, -12]}
              scale={1.6}
              connectedTo={[]}
            />
            <NodePhysical
              ref={python}
              name="python"
              color="#eeff00"
              position={[12, 1, -6]}
              scale={1.6}
              connectedTo={[]}
            />
            <NodePhysical
              ref={dotnet}
              name="dotnet"
              color="#204090"
              position={[6, 1, -12]}
              scale={1.6}
              connectedTo={[csharp, mysql, postgresql]}
            />
            <NodePhysical
              ref={django}
              name="django"
              color="#204090"
              position={[6, 1, -6]}
              scale={1.6}
              connectedTo={[python, mysql, postgresql]}
            />
            <NodePhysical
              ref={graphql}
              name="graphql"
              color="#ff00ee"
              position={[0, 1, -10]}
              scale={1.6}
              connectedTo={[dotnet, django]}
            />
            <NodePhysical
              ref={restApi}
              name="restApi"
              color="#204090"
              position={[0, 1, -7]}
              scale={1.6}
              connectedTo={[dotnet, django]}
            />
            <NodePhysical
              ref={postgresql}
              name="PostgreSQL"
              color="#00b3ff"
              position={[7, 1, -2]}
              scale={1.6}
              connectedTo={[]}
            />
            <NodePhysical
              ref={mysql}
              name="MySQL"
              color="#ffa200"
              position={[10, 1, -2]}
              scale={1.6}
              connectedTo={[]}
            />
          </NodesPhysics>
        </Physics>
        <Environment files={file} background />
        <Helper/>
      </Canvas>
    </>
  );
}

export default Skills;
