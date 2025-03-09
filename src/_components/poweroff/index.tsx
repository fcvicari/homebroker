"use client";

import { CirclePowerIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export function PowerOff() {
  return (
    <CirclePowerIcon
      className="size-5 md:size-7 hover:cursor-pointer text-slate-700"
      onClick={() => signOut()}
    />
  );
}
