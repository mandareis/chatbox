import React, { useState, useEffect } from "react";
import screens from "./screenSizes";

const screenSizes: readonly string[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

// enum ScreenSizes {
//   XS = 0,
//   SM = 1,
//   MD = 2,
//   LG = 3,
//   XL = 4,
//   TWOXL = 5,
//   MEGA = 6,
// }

function getScrnSizes() {
  for (let screenSize of screenSizes) {
    if (matchMedia(`(max-width: ${(screens as any)[screenSize]})`).matches) {
      return screenSize;
    }
  }
  return "mega";
}
// if (screenSize > ScreenSizes.SM) {

// }

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScrnSizes());

  useEffect(() => {
    // set up "screen resized" event listener
    const handleResize = () => {
      setScreenSize(getScrnSizes());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return screenSize;
};

export default useScreenSize;
