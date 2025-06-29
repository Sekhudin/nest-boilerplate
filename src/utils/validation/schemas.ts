import z from "zod/v4";

export const username = () => z.string().min(1).toLowerCase().trim();

export const password = () => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
  return z.string().trim().regex(pattern, {
    message: "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.",
  });
};
