import React from "react";
import { slide as MenuDetails } from "react-burger-menu";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/userSlice";
import { connect } from "react-redux";
import { selectUser } from "../store/userSlice";
import { sharedMenuItems, shouldShow } from "./Menu";

const MobileMenu: React.FC<{}> = () => {
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
  return (
    <div>
      {screenSize < ScreenSize.MD ? (
        <MenuDetails right className="bm-menu">
          {sharedMenuItems.map((item: any, idx: any) =>
            shouldShow(item.showSetting, user) ? (
              <a key={idx} id={item.id} className="menu-item" href={item.href}>
                {item.text}
              </a>
            ) : null
          )}
          {!user ? null : (
            <button
              type="submit"
              id="sign-out-full"
              className="menu-item "
              onClick={handlesLogOut}
            >
              Sign Out
            </button>
          )}
        </MenuDetails>
      ) : null}
    </div>
  );
};
export default connect()(MobileMenu);
