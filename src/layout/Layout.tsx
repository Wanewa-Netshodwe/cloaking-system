import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
type Props = {};

export default function Layout({}: Props) {
  return (
    <div className=" min-w-[100vw]">
      <Header />
      <Outlet />
    </div>
  );
}
