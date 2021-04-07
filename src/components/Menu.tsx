import React from "react";
import { slide as MenuDetails } from "react-burger-menu";

const Menu: React.FC<{}> = () => {
  var showSettings = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  return (
    <MenuDetails right>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        Contacts
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Messages
      </a>
      <a
        onClick={(event) => showSettings(event)}
        className="menu-item--small"
        href="/settings"
      >
        Settings
      </a>
    </MenuDetails>
  );
};

export default Menu;
