import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideMenuBar from "../components/SideMenuBar";
type Props = {};

export default function Layout({}: Props) {
  return (
    <div className=" min-w-[100vw]">
      <Header />
      <Outlet />
    </div>
  );
}
