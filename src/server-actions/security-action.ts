"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOutAllDevices() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: "global" });

  if (error) {
    return {
      message: error.message,
      updated: false,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
