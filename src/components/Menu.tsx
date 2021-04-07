import React, { useState, useEffect } from "react";
import { slide as MenuDetails } from "react-burger-menu";
import screens from "./screenSizes";

const screenSizes: readonly string[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

// enum ScreenSizes {
//   XS = 0,
//   SM = 1,
//   //   ...
// }

function getScreenSize() {
  for (let screenSize of screenSizes) {
    if (matchMedia(`(max-width: ${(screens as any)[screenSize]})`).matches) {
      return screenSize;
    }
  }
  return "mega";
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  useEffect(() => {
    // set up "screen resized" event listener
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return screenSize;
};

const Menu: React.FC<{}> = () => {
  const screenSize = useScreenSize();
  useEffect(() => {
    console.log(`screen size is now: ${screenSize}`);
  }, [screenSize]);

  //   if (screenSize > ScreenSizes.SM) {

  //   }
  return (
    <>
      {screenSize === "xs" || screenSize === "sm" ? (
        <MenuDetails right className="">
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="messages" className="menu-item" href="/messages">
            Messages
          </a>
          <a id="contacts" className="menu-item" href="/contacts">
            Contacts
          </a>
          <a
            // onClick={(event) => showSettings(event)}
            id="settings"
            className="menu-item--small"
            href="/settings"
          >
            Settings
          </a>
          <a id="sign-out" className="menu-item" href="/sign-out">
            Sign Out
          </a>
        </MenuDetails>
      ) : null}
    </>
  );
};

export default Menu;
