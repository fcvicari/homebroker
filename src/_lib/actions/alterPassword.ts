"use server"

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { createServerAction, ZSAError } from "zsa";
import { changePasswordSchema } from "../schema/changePassword";

export const actionAlterPassword = createServerAction()
  .input(changePasswordSchema)
  .handler(async ({ input: { password, newPassword }}) => {
    const session = await getServerSession(options)
    if (!session) return null

    await fetch(process.env.BACKEND_URL + `/user/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ password, newPassword }),
      cache: 'no-store',
    })
    .catch(() => {
      throw new ZSAError(
        "ERROR",
        "Error accessing the new user registration service."
      )
    })

    redirect('/singIn')
  })
