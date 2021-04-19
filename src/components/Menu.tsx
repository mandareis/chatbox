/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { slide as MenuDetails } from "react-burger-menu";
import useScreenSize from "./useScreenSize";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/userSlice";
import { connect } from "react-redux";
import { selectUser } from "../store/userSlice";

const sharedMenuItems: readonly any[] = [
  {
    href: "/",
    id: "home",
    text: "Home",
    requiresAuth: false,
  },
  {
    href: "/messages",
    id: "messages",
    text: "Messages",
    requiresAuth: true,
  },
  {
    href: "/contacts",
    id: "contacts",
    text: "Contacts",
    requiresAuth: true,
  },
  {
    href: "/settings",
    id: "settings",
    text: "Settings",
    requiresAuth: true,
  },
];

const Menu: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const screenSize = useScreenSize();
  const user = useAppSelector(selectUser);

  const handlesLogOut = async () => {
    const response = await fetch("/api/session", {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(logout());
    }
  };

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
          <button
            id="sign-out-full"
            className="menu-item"
            onClick={handlesLogOut}
          >
            Sign Out
          </button>
        </MenuDetails>
      ) : (
        <div className="grid grid-cols-2">
          <div className="font-bold space-x-4 flex justify-center">
            {sharedMenuItems.map((item, idx) =>
              item.requiresAuth && !user ? null : (
                <a key={idx} id={`${item.id}-full`} href={item.href}>
                  {item.text}
                </a>
              )
            )}
          </div>

          <div className="font-bold space-x-4 flex justify-center">
            <a id="login-full" className="menu-item" href="/login">
              Login
            </a>
            <a id="register-full" className="menu-item" href="/register">
              Register
            </a>
            <button
              type="submit"
              id="sign-out-full"
              className="menu-item font-bold"
              onClick={handlesLogOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default connect()(Menu);
