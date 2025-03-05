"use client";

import { Button } from "@/_components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singInSchema = z.object({
  email: z.string().email("Provide a valid e-mail").toLowerCase(),
  password: z.string().min(8, "Must be at least 8 characters long"),
});

type singInFormDate = z.infer<typeof singInSchema>;

export default function SingIn() {
  const methods = useForm<singInFormDate>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransaction] = useTransition();

  function submitSingIn({ email, password }: singInFormDate) {
    startTransaction(async () => {
      console.log(email, password);
    });
  }

  return (
    <div className="flex items-center justify-center content-center w-full h-full">
      <div className="flex flex-row justify-center items-center content-center w-full md:max-w-[60dvw] min-h-[70dvh] gap-6">
        <div className="flex flex-col gap-8 w-full xl:w-1/2 min-h-max">
          <Form {...methods}>
            <Title size="xl">Welcome!</Title>
            <form
              className="flex flex-col gap-1"
              onSubmit={methods.handleSubmit(submitSingIn)}
            >
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
              <Button type="submit">Sing in</Button>
            </form>
          </Form>
          <span>Don&lsquo;t have an account?</span>
        </div>
        <div className="w-1/2 min-h-max relative hidden xl:block">
          <Image src="/singinbackgroud.png" alt="singin" fill />
          <span>teste</span>
        </div>
      </div>
    </div>
  );
}
