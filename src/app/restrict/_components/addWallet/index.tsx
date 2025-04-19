"use client";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { actionCreateWallet } from "@/_lib/actions/createWallet";
import { walletFormDate, walletSchema } from "@/_lib/schema/createWallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

export function AddWallet() {
  const { execute, isPending } = useServerAction(actionCreateWallet);
  const closeRef = useRef<HTMLButtonElement>(null); // referência para o botão de fechar

  const methods = useForm<walletFormDate>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "",
    },
  });

  async function submitWallet(values: walletFormDate) {
    await execute(values);

    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col w-full items-end">
        <Button variant="link" className="flex gap-2 text-secondary-foreground">
          <Wallet className="text-slate-400" />
          Add new wallet
        </Button>
      </DialogTrigger>
      <DialogContent
        closeButton={false}
        className="flex w-full flex-col p-3 md:p-6 gap-0 h-min"
      >
        <Form {...methods}>
          <DialogHeader>
            <DialogTitle className="font-bold text-xl pb-5">
              New wallet
            </DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-col gap-1 w-full"
            onSubmit={methods.handleSubmit(submitWallet)}
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter wallet name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full gap-4 md:gap-3 mt-3">
              <DialogClose asChild>
                <Button
                  ref={closeRef}
                  variant="secondary"
                  className="w-full md:w-40"
                  disabled={isPending}
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                variant="default"
                className="w-full md:w-40"
                disabled={isPending}
                isPending={isPending}
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
