import z from "zod";

export const requiredString = (field: string) => z.string().trim().min(1, `${field} can't be empty!`);
export const email = () => z.string().trim().toLowerCase().email();

export const username = () => requiredString("username").toLowerCase();
export const password = () => requiredString("password");
