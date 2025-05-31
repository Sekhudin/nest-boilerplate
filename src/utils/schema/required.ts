import z from "zod";

export const string = (field: string = "field") => z.string().trim().min(1, `${field} can't be empty`);
export const email = () => z.string().toLowerCase().trim().email();

export const username = () => string("username").toLowerCase();
export const password = () => string("password");
