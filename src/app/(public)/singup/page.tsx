"use client";

import { Button } from "@/_components/ui/button";
import { ButtonLink } from "@/_components/ui/buttonLink";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { InputPassword } from "@/_components/ui/inputPass";
import { Title } from "@/_components/ui/title";
import {
  createNewUserFormDate,
  createNewUserSchema,
} from "@/_lib/schema/newUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SingUp() {
  const methods = useForm<createNewUserFormDate>({
    resolver: zodResolver(createNewUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    },
  });
  const [isPending, startTransaction] = useTransition();

  function submitSingUp({ name, email, password }: createNewUserFormDate) {
    startTransaction(async () => {
      console.log("Singup:", name, email, password);
    });
  }

  return (
    <div className="flex items-center justify-center content-center w-full h-full">
      <div className="flex flex-row justify-center items-center content-center w-full md:max-w-[60dvw] h-[70dvh] m-2 border-[1px] border-black drop-shadow-xl drop-shadow-white bg-white">
        <div className="w-full h-full relative hidden xl:block">
          <Image src="/singinbackgroud.png" alt="singin" fill />
        </div>
        <div className="flex flex-col w-full h-full justify-center content-center items-center gap-8">
          <Form {...methods}>
            <Title size="xl">Register new user</Title>
            <form
              className="flex flex-col gap-1 p-6 h-max w-full"
              onSubmit={methods.handleSubmit(submitSingUp)}
            >
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Name"
                        required={false}
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
                        placeholder="Enter your email"
                        {...field}
                        icon={Mail}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        id="password"
                        placeholder="Enter your password"
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
                name="checkPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        id="checkPassword"
                        placeholder="Confirm your password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                Register
              </Button>
            </form>
          </Form>
          <ButtonLink
            variant="link"
            url="/singIn"
            label="Back to login"
            icon={ArrowLeft}
          />
        </div>
      </div>
    </div>
  );
}
