"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabase } from "@/app/_lib/supabase";
import { signIn, signOut, auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to update your profile.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(id) {
  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to delete a reservation.");

  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(id))
    throw new Error("You are not allowed to delete this reservation.");

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const id = Number(formData.get("id"));

  const session = await auth();

  if (!session)
    throw new Error("You need to be signed in to update a reservation.");

  const guestBookings = await getBookings(session?.user?.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(id))
    throw new Error("You are not allowed to update this reservation.");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations/");
  revalidatePath(`/account/reservations/edit/${id}`);

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
