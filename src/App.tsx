import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
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
const Box4 = styled(BoxTemplate)`
  width: 400px;
  height: 200px;
  position: absolute;
  top: 100px;
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

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  /* path {
    stroke: white;
    stroke-width: 2;
  } */
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

const svgVariants = {
  start: {
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
    stroke: 'white',
    strokeWidth: 2,
    d: 'M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z',
  },
  end: {
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
    transition: {
      default: { duration: 5 },
      fill: { duration: 1, delay: 3 },
    },
  },
};

const box4Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function App() {
  const constraintBoxRef = useRef<HTMLDivElement>(null);

  // interpolation values
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

  // anmation presence values
  const [showing, setShowing] = useState(true);
  const toggleShowing = () => setShowing((prev) => !prev);

  useEffect(() => {
    x.onChange(() => console.log(x.get()));
    scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [x, scrollY, scrollYProgress]);

  return (
    <Wrapper style={{ background }}>
      {/* variants */}
      {/* <Box variants={boxVariants} initial='start' animate='end'>
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box> */}

      {/* gestures */}
      {/* <ConstraintBox ref={constraintBoxRef}>
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
      </ConstraintBox> */}

      {/* motion values */}
      {/* <Box3 drag='x' dragSnapToOrigin style={{ x, scale, rotateZ }} /> */}

      {/* SVG animation */}
      {/* <Svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 448 512'
      >
        <motion.path variants={svgVariants} initial='start' animate='end' />
      </Svg> */}

      {/* AnimatePresence */}
      <AnimatePresence>
        {showing ? (
          <Box4
            variants={box4Variants}
            initial='initial'
            animate='visible'
            exit='leaving'
          />
        ) : null}
      </AnimatePresence>
      <button onClick={toggleShowing}>Click</button>
    </Wrapper>
  );
}

export default App;
