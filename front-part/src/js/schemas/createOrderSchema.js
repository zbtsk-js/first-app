import { z } from "zod";

export const createOrderSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long"),

    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    email: z.email("Invalid email"),
    address: z
        .string()
        .min(3, "Address is required"),

    city: z
        .string()
        .min(2, "City is required"),

    postcode: z
        .string()
        .min(4, "Invalid postcode"),

    country: z
        .string()
        .min(1, "Country is required")
});