import { z } from "zod"

export const changeProfileSchema = z
  .object({
    name: z.string().min(1, 'Enter your name'),
    email: z.string().email('Provide a valid e-mail').toLowerCase(),
    avatar: z
      .instanceof(File)
      .refine( 
        (file) => file.size > 0 && file.size < 1024, 
        "File size must be less than 1kb"
      )
      .optional(),
  })

export type changeProfileFormDate = z.infer<typeof changeProfileSchema>
