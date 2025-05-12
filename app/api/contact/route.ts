import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().min(1, "name is required").max(50),
  email: z.string().email("invalid email"),
  subject: z.string().min(1, "subject is required").max(50),
  message: z.string().min(1, "message is required").max(500),
});
