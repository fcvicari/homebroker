import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/_components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_components/ui/tabs";
import { useSession } from "next-auth/react";
import Account from "./account";
import ChangePassword from "./changePassword";

interface ProfileFormProps {
  opened?: boolean;
  setOpened: () => void;
}

export function ProfileForm({ opened = false, setOpened }: ProfileFormProps) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Sheet open={opened} onOpenChange={setOpened}>
      <SheetContent className="flex flex-col px-4 gap-4">
        <SheetHeader>
          <SheetTitle>My profile</SheetTitle>
        </SheetHeader>
        <div>
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage
                src={session.user.avatar ? session.user.avatar : "/avatar.png"}
              />
              <AvatarFallback>TT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start text-left w-full">
              <span className="text-primary text-base">
                {" "}
                {session.user.name}{" "}
              </span>
              <span className="text-xs"> {session.user.email} </span>
            </div>
          </div>

          <Tabs defaultValue="account" className="w-full mt-4">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="account">
                Account
              </TabsTrigger>
              <TabsTrigger className="w-full" value="password">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Account onClose={setOpened} />
            </TabsContent>
            <TabsContent value="password">
              <ChangePassword onClose={setOpened} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
