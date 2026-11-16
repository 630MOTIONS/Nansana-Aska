import UserDropdown from "@/components/admin/UserDropdown";
import { getAuth } from "@/lib/admin/auth";

export default async function UserMenu() {
  const { user } = await getAuth();
  return <UserDropdown name={user.name} email={user.email} role={user.role} />;
}
