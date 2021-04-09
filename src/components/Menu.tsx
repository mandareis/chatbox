import React, { useEffect } from "react";
import { slide as MenuDetails } from "react-burger-menu";
import useScreenSize from "./useScreenSize";

const sharedMenuItems: readonly any[] = [
  {
    href: "/",
    id: "home",
    text: "Home",
  },
  {
    href: "/messages",
    id: "messages",
    text: "Messages",
  },
  {
    href: "/contacts",
    id: "contacts",
    text: "Contacts",
  },
  {
    href: "/settings",
    id: "settings",
    text: "Settings",
  },
];

const Menu: React.FC<{}> = () => {
  const screenSize = useScreenSize();
  useEffect(() => {
    console.log(`screen size is now: ${screenSize}`);
  }, [screenSize]);

  return (
    <>
      {screenSize === "xs" || screenSize === "sm" ? (
        <MenuDetails right className="bm-menu">
          {sharedMenuItems.map((item, idx) => (
            <a key={idx} id={item.id} className="menu-item" href={item.href}>
              {item.text}
            </a>
          ))}
          <a id="sign-out" className="menu-item" href="/sign-out">
            Sign Out
          </a>
        </MenuDetails>
      ) : (
        <div className="grid grid-cols-2">
          <div className=" font-bold space-x-4 flex justify-center">
            {sharedMenuItems.map((item, idx) => (
              <a key={idx} id={`${item.id}-full`} href={item.href}>
                {item.text}
              </a>
            ))}
          </div>
          <div className="font-bold space-x-4 flex justify-center">
            <a id="login-full" className="menu-item" href="/login">
              Login
            </a>
            <a id="sign-out-full" className="menu-item" href="/sign-out">
              Sign Out
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
