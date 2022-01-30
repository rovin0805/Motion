import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const BoxTemplate = styled(motion.div)`
  display: grid;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 1);
`;
const Box = styled(BoxTemplate)`
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
`;
const Box2 = styled(BoxTemplate)`
  width: 50px;
  height: 50px;
`;
const Box3 = styled(BoxTemplate)`
  width: 200px;
  height: 200px;
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ConstraintBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const boxVariants: Variants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants: Variants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const box2Variants: Variants = {
  hover: { scale: 1.2, rotateZ: 90 },
  click: { scale: 1, borderRadius: '100px' },
  drag: { backgroundColor: 'rgb(46, 204, 113)', transition: { duration: 5 } },
};

function App() {
  const constraintBoxRef = useRef<HTMLDivElement>(null);
  // interpolation value
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-360, 360]);
  const background = useTransform(
    x,
    [-500, 500],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ]
  );
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  useEffect(() => {
    x.onChange(() => console.log(x.get()));
    scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [x, scrollY, scrollYProgress]);

  return (
    <Wrapper style={{ background }}>
      {/* variants */}
      <Box variants={boxVariants} initial='start' animate='end'>
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>

      {/* gestures */}
      <ConstraintBox ref={constraintBoxRef}>
        <Box2
          variants={box2Variants}
          whileHover='hover'
          whileTap='click'
          drag
          whileDrag='drag'
          dragConstraints={constraintBoxRef}
          dragSnapToOrigin
          // dragElastic={0.5}
        />
      </ConstraintBox>

      {/* motion values */}
      <Box3 drag='x' dragSnapToOrigin style={{ x, scale, rotateZ }} />
    </Wrapper>
  );
}

export default App;
