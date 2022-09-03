import React from "react";
import Notification from "../ui/Notification";
import MainHeader from "./MainHeader";

export default function LayoutComponent(props) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <Notification title="test" message="hi" status="error"/>
    </>
  );
}
