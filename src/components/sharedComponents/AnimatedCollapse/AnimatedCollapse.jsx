import { useSpring, animated } from 'react-spring';

export const AnimatedCollapse = ({ inProp, children }) => {
  const style = useSpring({
    opacity: inProp ? 1 : 0,
    maxHeight: inProp ? "500px" : "0px",
    overflow: "hidden",
    config: {
      duration: 500, // Збільшений час анімації (500ms)
      easing: (t) => t * (2 - t), // Плавне прискорення на початку та уповільнення в кінці
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};
