import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeletePersonForm from "@/components/admin/people/DeletePersonForm";
import PersonPhotoPanel from "@/components/admin/people/PersonPhotoPanel";
import StaffForm from "@/components/admin/people/StaffForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getStaffMember } from "@/lib/admin/people-data";
import { updateStaffAction } from "../../people-actions";

export const metadata: Metadata = { title: "Edit staff member" };

export default async function EditStaffPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { id } = await props.params;
  const query = await props.searchParams;

  const member = await getStaffMember(id);
  if (!member) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/staff"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All staff
        </Link>
        <h1 className="mt-2 text-section text-navy">{member.name}</h1>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Staff member added. Upload a photo below.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Photo</h2>
        <div className="mt-4">
          <PersonPhotoPanel kind="staff" id={member.id} photoUrl={member.photoUrl} />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <StaffForm
            mode="edit"
            action={updateStaffAction.bind(null, member.id)}
            initial={{
              name: member.name,
              title: member.title,
              kicker: member.kicker ?? "",
              bio: member.bio,
              group: member.group,
              sortOrder: String(member.sortOrder),
              published: member.published,
            }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this person</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes them and their photo. Only administrators can do this. To
            take them off the website without deleting, untick “Show on the
            website”.
          </p>
          <div className="mt-4">
            <DeletePersonForm kind="staff" id={member.id} />
          </div>
        </Card>
      )}
    </div>
  );
}
