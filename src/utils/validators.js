import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const patientSchema = z.object({
  age: z.number().min(0).max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
});
