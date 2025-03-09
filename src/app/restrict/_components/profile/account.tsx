"use client";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { actionChangeProfile } from "@/_lib/actions/changeProfile";
import {
  changeProfileFormDate,
  changeProfileSchema,
} from "@/_lib/schema/changeProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

interface AccountProps {
  onClose: () => void;
}

export default function Account({ onClose }: AccountProps) {
  const { isPending, execute } = useServerAction(actionChangeProfile);
  const { data: session } = useSession();

  const methods = useForm<changeProfileFormDate>({
    resolver: zodResolver(changeProfileSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
    },
  });

  async function submitSingUp(values: changeProfileFormDate) {
    await execute(values);

    onClose();
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize >= 2) {
        alert("The maximum image size is 2Mb.");
        return;
      }
    }
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(submitSingUp)} className="mt-4">
        <div className="flex w-full items-center justify-center pb-4">
          <div className="relative">
            <Avatar className="h-28 md:h-32 w-28 md:w-32">
              <AvatarImage
                className="fit"
                src={session?.user.avatar ? session.user.avatar : "/avatar.png"}
              />
            </Avatar>
            <label className="absolute cursor-pointer flex justify-center items-center bottom-0 right-0 w-10 h-10 rounded-full bg-accent">
              <input
                type="file"
                id="avatar"
                onChange={handleImageChange}
                className="object-none hidden"
              />

              <Camera className="size-5" />
            </label>
          </div>
        </div>

        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="name"
                  required
                  placeholder="Name"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="email"
                  required
                  placeholder="E-mail"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          isPending={isPending}
          disabled={isPending}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
