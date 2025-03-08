"use client";

import { Button } from "@/_components/ui/button";
import { signOut } from "next-auth/react";

export default function Restrict() {
  return <Button onClick={() => signOut()}>Sair</Button>;
}
