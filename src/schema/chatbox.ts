import { z } from "zod";

export const FormSchema = z.object({
  chat: z.string().min(2, { message: "Chat must be at least 2 characters." }),
  language: z.string().optional(),
});

export type FormData = z.infer<typeof FormSchema>;
