import * as z from "zod";

const productSchema = z.object({
  name: z
    .string({ error: "Product name is required" })
    .trim()
    .check(z.minLength(3, { error: "Name too small." }), z.maxLength(50)),
  brand: z.string().trim().optional(),
  price: z
    .string({
      error: (data) =>
        !data.input ? "Price is required" : "Price must be a number",
    })
    .min(1, { error: "Price must be greater than 0." })
    .max(100000),
  category: z.string({ error: "Category name is required" }).trim(),
  stock: z.string().min(1, { error: "stock must greater than 0" }).optional(),
  description: z.string().trim().optional(),
  imageUrls: z.array(z.string().trim()).optional(),
});

export { productSchema };
