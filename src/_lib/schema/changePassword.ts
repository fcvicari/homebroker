import { z } from "zod"

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required'),
    newPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
    checkNewPassword: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value), {
        message: 'Must have uppercase, lowercase letters and numbers',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.checkNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['checkNewPassword'],
        message: 'Passwords must be the same',
      })
    }
  })

export type changePasswordFormDate = z.infer<typeof changePasswordSchema>
