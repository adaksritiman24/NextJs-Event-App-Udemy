import React from "react";
import MainHeader from "./MainHeader";

export default function LayoutComponent(props) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}
