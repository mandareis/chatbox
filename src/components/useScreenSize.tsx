import React, { useState, useEffect } from "react";
import screens from "./screenSizes";

export enum ScreenSize {
  XS = 0,
  SM = 1,
  MD = 2,
  LG = 3,
  XL = 4,
  TWOXL = 5,
  MEGA = 6,
}

// screenSizes is an array of the keys in `screens` so we can be
// ABSOLUTELY SURE the order in which we iterate over the `screens`
// object
const screenSizes: readonly string[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

const enumMapping: { [k: string]: ScreenSize } = Object.freeze({
  xs: ScreenSize.XS,
  sm: ScreenSize.SM,
  md: ScreenSize.MD,
  lg: ScreenSize.LG,
  xl: ScreenSize.XL,
  "2xl": ScreenSize.TWOXL,
});

function getScrnSizes(): ScreenSize {
  for (let screenSize of screenSizes) {
    if (matchMedia(`(max-width: ${(screens as any)[screenSize]})`).matches) {
      return enumMapping[screenSize];
    }
  }
  return ScreenSize.MEGA;
}

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
