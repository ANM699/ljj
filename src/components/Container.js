import React from "react";
import { WingBlank, WhiteSpace, NavBar } from "antd-mobile";

export default function Container({ children, navBar, header }) {
  return (
    <>
      <NavBar mode="dark">{navBar}</NavBar>
      {header ? <div className="title">{header}</div> : null}
      <WingBlank>
        <WhiteSpace />
        {children}
      </WingBlank>
    </>
  );
}
