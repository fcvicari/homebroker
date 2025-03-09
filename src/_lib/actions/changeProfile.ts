"use server"

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { createServerAction, ZSAError } from "zsa";
import { changeProfileSchema } from "../schema/changeProfile";


export const actionChangeProfile = createServerAction()
  .input(changeProfileSchema)
  .handler(async ({ input: {name, email } }) => {
    const session = await getServerSession(options)
    if (!session) return null

    const response = await fetch(process.env.BACKEND_URL + `/user/${session.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ name, email }),
      cache: 'no-store',
    })
    .catch(() => {
      throw new ZSAError(
        "ERROR",
        "Error accessing the new user registration service."
      )
    })

    if (response.status !== 200 && response.status !== 201) {
      const { message } = await response.json()

      throw new ZSAError("INPUT_PARSE_ERROR", message)
    }

    return await response.json()
  })
