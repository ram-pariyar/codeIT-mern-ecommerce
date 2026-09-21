import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.email({
    error: (data) =>
      data.input ? "Please Enter Valid Email." : "Email is required.",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string({ error: "Password is required" }),
  user: z.string(),
  token: z.string(),
});

export { forgotPasswordSchema, resetPasswordSchema };
