import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getAuth } from "@/lib/admin/auth";
import { logoSrc } from "@/lib/admin/logo";
import { label, groupOptions } from "@/lib/admin/people";
import { listStaff } from "@/lib/admin/people-data";

export const metadata: Metadata = { title: "Staff" };

export default async function StaffPage() {
  await getAuth();
  const staff = await listStaff();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-section text-navy">Staff</h1>
          <p className="mt-1 text-ink-muted">
            Coaches, the technical team and club leadership shown on the Team
            page.
          </p>
        </div>
        <Button href="/admin/staff/new">Add staff member</Button>
      </div>

      {staff.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-center text-ink-muted shadow-card">
          No staff yet.
        </p>
      ) : (
        <ul className="divide-y divide-surface-strong overflow-hidden rounded-xl bg-white shadow-card">
          {staff.map((member) => {
            const src = logoSrc(member.photoUrl);
            return (
              <li key={member.id}>
                <Link
                  href={`/admin/staff/${member.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-surface-tint"
                >
                  <span className="h-14 w-11 shrink-0 overflow-hidden rounded-md bg-surface-tint ring-1 ring-surface-strong">
                    {src && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-navy">
                      {member.name}
                    </span>
                    <span className="block truncate text-sm text-ink-muted">
                      {member.title}
                    </span>
                  </span>
                  <span className="hidden rounded-sm bg-surface-tint px-2 py-1 text-label font-bold uppercase text-navy sm:inline">
                    {member.group === "management"
                      ? "Leadership"
                      : "Technical"}
                  </span>
                  {!member.published && (
                    <span className="rounded-sm bg-surface-strong px-2 py-1 text-label font-bold uppercase text-ink-muted">
                      Hidden
                    </span>
                  )}
                  <span className="text-label font-bold uppercase tracking-wide text-navy">
                    Edit
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <span className="sr-only">{label(groupOptions, "technical")}</span>
    </div>
  );
}
