import React from "react";
import { GenerateAvator } from "../utils/GenerateAvator";
import { GenerateInitials } from "../utils/GenerateInitials";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {};

export default function AccountHolder({}: Props) {
  const name = useSelector((state: RootState) => state.user.fullName);
  const surname = useSelector((state: RootState) => state.user.surname);
  return (
    <div className=" gap-3 flex w-[180px] items-center right-0">
      <img
        src={GenerateAvator(name)}
        className="w-[30px] h-[30px] rounded-full"
        alt="imagek"
      />

      <p className="font-poppins mt-[1px]">
        {GenerateInitials(name + " " + surname)}
      </p>
    </div>
  );
}
