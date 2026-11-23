import type { Metadata } from "next";
import Link from "next/link";
import StaffForm, { emptyStaff } from "@/components/admin/people/StaffForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { createStaffAction } from "../../people-actions";

export const metadata: Metadata = { title: "Add staff member" };

export default async function NewStaffPage() {
  await getAuth();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/staff"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All staff
        </Link>
        <h1 className="mt-2 text-section text-navy">Add staff member</h1>
        <p className="mt-1 text-ink-muted">You add the photo on the next screen.</p>
      </div>

      <Card className="p-6">
        <StaffForm mode="create" action={createStaffAction} initial={emptyStaff} />
      </Card>
    </div>
  );
}
