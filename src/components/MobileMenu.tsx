import React from "react";
import { slide as MenuDetails } from "react-burger-menu";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/userSlice";
import { connect } from "react-redux";
import { selectUser } from "../store/userSlice";
import { sharedMenuItems } from "./Menu";

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
            item.requiresAuth && !user ? null : (
              <a key={idx} id={item.id} className="menu-item" href={item.href}>
                {item.text}
              </a>
            )
          )}
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
        </MenuDetails>
      ) : null}
      ;
    </div>
  );
};
export default connect()(MobileMenu);
