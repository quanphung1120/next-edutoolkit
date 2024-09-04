"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email(),
});

export async function signInWithEmail(
  captchaToken: string,
  prevState: any,
  formData: FormData,
) {
  const headersList = headers();
  const origin = headersList.get("origin");

  if (!origin) {
    return {
      completed: false,
      message: "Invalid request",
    };
  }

  const supabase = createClient();
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      completed: false,
      message: "Please enter a valid email address",
    };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: validatedFields.data.email,

    options: {
      shouldCreateUser: true,
      emailRedirectTo: origin,
      captchaToken,
    },
  });

  if (error) {
    return {
      message: error.message,
      completed: false,
    };
  }

  return {
    message: "Please check your inbox for the email",
    completed: true,
  };
}

export async function verifyUserOTP(
  email: string,
  prevState: any,
  formData: FormData,
) {
  if (!formData.has("token")) {
    return {
      message: "Invalid token",
      completed: false,
    };
  }

  const token = formData.get("token") as string;
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return {
      message: error.message,
      completed: false,
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
