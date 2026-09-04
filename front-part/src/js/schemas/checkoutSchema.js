import { z } from "zod";

export const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long"),

    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    email: z.email("Invalid email"),

    phone: z.string().min(8, "Phone number is too short"),

    address: z
        .string()
        .min(3, "Address is required"),

    city: z
        .string()
        .min(2, "City is required"),

    postcode: z
        .number()
        .min(4, "Invalid postcode"),

    country: z
        .string()
        .min(1, "Country is required")
});