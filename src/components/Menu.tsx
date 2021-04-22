import React, { useEffect } from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout, User } from "../store/userSlice";
import { connect } from "react-redux";
import { selectUser } from "../store/userSlice";

const SHOW_LOGGED_IN = 1;
const SHOW_ANY = 2;
const SHOW_LOGGED_OUT = 3;

export const sharedMenuItems: readonly any[] = [
  {
    href: "/",
    id: "home",
    text: "Home",
    showSetting: SHOW_ANY,
  },
  {
    href: "/messages",
    id: "messages",
    text: "Messages",
    showSetting: SHOW_LOGGED_IN,
  },
  {
    href: "/contacts",
    id: "contacts",
    text: "Contacts",
    showSetting: SHOW_LOGGED_IN,
  },
  {
    href: "/settings",
    id: "settings",
    text: "Settings",
    showSetting: SHOW_LOGGED_IN,
  },
  {
    href: "/login",
    id: "login",
    text: "Login",
    showSetting: SHOW_LOGGED_OUT,
  },
  {
    href: "/register",
    id: "register",
    text: "Register",
    showSetting: SHOW_LOGGED_OUT,
  },
];

export const shouldShow = (showSetting: number, user: User | null): boolean => {
  switch (showSetting) {
    case SHOW_ANY:
      return true;
    case SHOW_LOGGED_IN:
      return Boolean(user);
    case SHOW_LOGGED_OUT:
      return !user;
  }
  throw new Error("invalid showSetting");
};

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
        <div className="grid grid-cols-1">
          <div className="font-bold space-x-4 flex justify-center">
            {sharedMenuItems.map((item, idx) =>
              shouldShow(item.showSetting, user) ? (
                <a key={idx} id={`${item.id}-full`} href={item.href}>
                  {item.text}
                </a>
              ) : null
            )}
            {!user ? null : (
              <button
                type="submit"
                id="sign-out-full"
                className="menu-item font-bold "
                onClick={handlesLogOut}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default connect()(Menu);
