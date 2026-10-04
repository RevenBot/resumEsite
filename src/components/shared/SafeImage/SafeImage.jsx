import { Image, VanillaImage } from "@react-three/uikit";

// Patch the underlying uikit Image class so it doesn't throw when the React
// reconciler calls add() in production builds. Image is a leaf component, so
// a no-op add() is safe.
VanillaImage.prototype.add = function add() {
  return this;
};

function SafeImage(props) {
  return <Image {...props} />;
}

export default SafeImage;
