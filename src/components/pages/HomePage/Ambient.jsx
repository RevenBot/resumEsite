const Ambient = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[0, 100, 0]} intensity={100000} color="#999" />
      <spotLight intensity={10000} position={[0, 0, 200]} color="#fff" />
    </>
  );
};

export default Ambient;
