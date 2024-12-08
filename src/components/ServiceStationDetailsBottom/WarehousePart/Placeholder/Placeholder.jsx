const Placeholder = ({ node, depth }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: -7,
        right: 0,
        height: 4,
        left: depth * 40,
        transform: "translateY(-50%)",
        backgroundColor: "var( --blue-btn-normal)",
        zIndex: 100,
      }}
    />
  );
};

export default Placeholder;
