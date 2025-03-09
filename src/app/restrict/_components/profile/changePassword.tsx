"use client";

import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { InputPassword } from "@/_components/ui/inputPass";
import { actionAlterPassword } from "@/_lib/actions/alterPassword";
import {
  changePasswordFormDate,
  changePasswordSchema,
} from "@/_lib/schema/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

interface ChangePasswordProps {
  onClose: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const { execute, isPending } = useServerAction(actionAlterPassword);

  const methods = useForm<changePasswordFormDate>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      checkNewPassword: "",
    },
  });

  async function submitChangePassword(values: changePasswordFormDate) {
    await execute(values);

    onClose();
  }

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitChangePassword)}
        className="mt-4"
      >
        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword
                  id="password"
                  required
                  disabled={isPending}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword
                  id="newPassword"
                  required
                  disabled={isPending}
                  placeholder="New password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="checkNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPassword
                  id="checkNewPassword"
                  disabled={isPending}
                  required
                  placeholder="Confirm your new password"
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
