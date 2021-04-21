/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/userSlice";
import { connect } from "react-redux";
import { selectUser } from "../store/userSlice";

export const sharedMenuItems: readonly any[] = [
  {
    href: "/",
    id: "home",
    text: "Home",
    requiresAuth: false,
    LoggedIn: false,
  },
  {
    href: "/messages",
    id: "messages",
    text: "Messages",
    requiresAuth: true,
    LoggedIn: false,
  },
  {
    href: "/contacts",
    id: "contacts",
    text: "Contacts",
    requiresAuth: true,
    LoggedIn: false,
  },
  {
    href: "/settings",
    id: "settings",
    text: "Settings",
    requiresAuth: true,
    LoggedIn: false,
  },
  {
    href: "/login",
    id: "login",
    text: "Login",
    requiresAuth: false,
    LoggedIn: true,
  },
  {
    href: "/register",
    id: "register",
    text: "Register",
    requiresAuth: false,
    LoggedIn: true,
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
      {screenSize > ScreenSize.SM ? (
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
          {!user ? null : (
            <button
              type="submit"
              id="sign-out-full"
              className="menu-item font-bold"
              onClick={handlesLogOut}
            >
              Sign Out
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};
export default connect()(Menu);
