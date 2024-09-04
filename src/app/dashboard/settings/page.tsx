import Avatar from "@/components/dashboard/settings/profile/ProfileAvatarUpdate";
import Birthdate from "@/components/dashboard/settings/profile/ProfileBirthdateUpdate";
import DisplayName from "@/components/dashboard/settings/profile/ProfileDisplayNameUpdate";
import { getUserProfile } from "@/db/dto/profiles";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Settings() {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/");
    redirect("/");
  }

  return (
    <section className="grid gap-8">
      <Avatar />
      <DisplayName displayName={data.displayName!} />
      <Birthdate birthdate={data.birthdate!} />
    </section>
  );
}
