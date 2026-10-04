import { RigidBody } from "@react-three/rapier";
import MonitorStatic from "./MonitorStatic";

const MonitorStaticPhysic = ({ children, ...props }) => {
  return (
    <RigidBody type="dynamic" colliders="cuboid">
      <MonitorStatic {...props}>{children}</MonitorStatic>
    </RigidBody>
  );
};

export default MonitorStaticPhysic;
