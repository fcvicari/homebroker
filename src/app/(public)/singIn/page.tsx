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
import { useAlertHook } from "@/_hook/alertHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const { openError } = useAlertHook();

  function submitSingIn({ email, password }: singInFormDate) {
    startTransaction(async () => {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resp?.ok) {
        router.push("/restrict");
      } else {
        if (resp?.error) {
          openError(resp.error);
        } else {
          openError("There was a problem with your request.");
        }
      }
    });
  }

  return (
    <div className="flex items-center justify-center content-center w-full h-full">
      <div className="flex flex-row justify-center items-center content-center w-full md:max-w-[60dvw] min-h-[70dvh] h-[70dvh] m-2 p-4 xl:p-0 border-[1px] border-black drop-shadow-xl drop-shadow-white bg-white">
        <div className="flex flex-col w-full h-full justify-center content-center items-center gap-8">
          <Form {...methods}>
            <Title size="xl">Welcome!</Title>
            <form
              className="flex flex-col gap-1 p-0 xl:p-4 h-max w-full"
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
              <Button
                className="mt-4"
                type="submit"
                isPending={isPending}
                disabled={isPending}
              >
                Sing in
              </Button>
            </form>
          </Form>
          <ButtonLink
            url="/singup"
            label="Don&lsquo;t have an account?"
            variant="link"
          />
          <span>I forgot my password</span>
        </div>
        <div className="w-full h-full relative hidden xl:block">
          <Image src="/singinbackgroud.png" alt="singin" fill />
        </div>
      </div>
    </div>
  );
}
