import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import logo from "../logo.svg";

function NavBar(props) {
  return (
    <div>
      <Menu
        // theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[]}
      >
        <Menu.Item key={0}>
          <Link to="/">
            <img src={logo} className="header-logo pointer" />
          </Link>
        </Menu.Item>
        <Menu.Item key={1}>
          <Link to="/history">Transactions</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default NavBar;
