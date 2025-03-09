"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { DropdownItemMenu } from "@/_components/ui/dropItemMenu";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_components/ui/avatar";
import { ProfileForm } from "./profileForm";

export function Profile() {
  const { data: session, status } = useSession();
  const [openProfile, setOpenProfile] = useState(false);

  if (status !== "authenticated" && status !== "loading") {
    redirect("/singIn");
  }

  function handleSetOpenProfile() {
    setOpenProfile(!openProfile);
  }

  return (
    <div className="flex gap-1 justify-center content-center items-end md:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-12 w-12 md:h-14 md:w-14">
            <AvatarImage
              src={session?.user.avatar ? session.user.avatar : "/avatar.png"}
            />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 mr-3 shadow-md">
          <DropdownMenuLabel className="flex items-center content-center gap-2 pb-2">
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage
                src={session?.user.avatar ? session.user.avatar : "/avatar.png"}
              />
              <AvatarFallback>TT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start text-left w-full">
              <span className="text-primary text-base">
                {" "}
                {session?.user.name}{" "}
              </span>
              <span className="text-xs"> {session?.user.email} </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownItemMenu
              onClick={() => handleSetOpenProfile()}
              label="My profile"
              icon={User}
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownItemMenu
            onClick={() => signOut()}
            label="Log out"
            icon={LogOut}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileForm
        opened={openProfile}
        setOpened={() => handleSetOpenProfile()}
      />
    </div>
  );
}
