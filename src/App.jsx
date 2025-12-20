import React from "react";
import AppRoutes from "./routes/AppRoutes";

import Lenis from "lenis";

const App = () => {
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.5,
    duration: 1.6,
    easing: (t) => Math.min(1, 1.01 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: true,
    syncTouchLerp: 0.1,
  });
  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
