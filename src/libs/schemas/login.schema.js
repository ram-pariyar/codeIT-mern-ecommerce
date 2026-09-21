import * as z from "zod";

const loginSchema = z.object({
  email: z.email({
    error: (data) => (data.input ? "Invalid Email." : "Email is required."),
  }),
  password: z.string({ error: "Password is required" }),
});

export { loginSchema };
