import Link from "next/link";
import { logoutAction } from "@/app/admin/auth-actions";
import { getAuth } from "@/lib/admin/auth";

export default async function UserMenu() {
  const { user } = await getAuth();

  return (
    <div className="space-y-3 text-sm">
      <div>
        <p className="font-semibold text-navy">{user.name}</p>
        <p className="text-ink-muted">
          <span className="rounded-sm bg-surface-tint px-1.5 py-0.5 text-label font-bold uppercase text-navy">
            {user.role}
          </span>
        </p>
      </div>
      <Link
        href="/"
        className="block font-semibold text-navy hover:text-brand-blue"
      >
        View site
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          className="font-semibold text-navy hover:text-brand-blue"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
