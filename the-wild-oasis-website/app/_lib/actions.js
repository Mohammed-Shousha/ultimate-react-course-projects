"use server";

import { supabase } from "@/app/_lib/supabase";
import { signIn, signOut, auth } from "@/app/_lib/auth";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("You need to be signed in to update your profile.");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  console.log(data);
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
