"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_components/ui/avatar";

export function UserProps() {
  const { data: session, status } = useSession();

  if (status !== "authenticated" && status !== "loading") {
    redirect("/singIn");
  }

  return (
    <Avatar className="h-12 w-12 md:h-14 md:w-14">
      <AvatarImage
        src={session?.user.avatar ? session.user.avatar : "/avatar.png"}
      />
      <AvatarFallback>TT</AvatarFallback>
    </Avatar>
  );
}
