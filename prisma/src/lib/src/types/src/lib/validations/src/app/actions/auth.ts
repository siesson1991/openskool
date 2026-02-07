"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export async function registerUser(data: unknown) {
  try {
    const validated = registerSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { success: false, message: "Cet email est déjà utilisé" };
    }

    const hashedPassword = await hash(validated.password, 12);

    await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Compte créé avec succès" };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Erreur lors de l'inscription" };
  }
}

export async function loginUser(data: unknown) {
  try {
    const validated = loginSchema.parse(data);

    await signIn("credentials", {
      email: validated.email,
      password: validated.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }
    return { success: false, message: "Erreur de connexion" };
  }
}
