import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeletePersonForm from "@/components/admin/people/DeletePersonForm";
import PersonPhotoPanel from "@/components/admin/people/PersonPhotoPanel";
import PlayerForm from "@/components/admin/people/PlayerForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { getPlayer } from "@/lib/admin/people-data";
import { updatePlayerAction } from "../../people-actions";

export const metadata: Metadata = { title: "Edit player" };

export default async function EditPlayerPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await getAuth();
  const { id } = await props.params;
  const query = await props.searchParams;

  const player = await getPlayer(id);
  if (!player) notFound();

  const text = (value: number | null) => (value === null ? "" : String(value));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/players"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All players
        </Link>
        <h1 className="mt-2 text-section text-navy">{player.name}</h1>
      </div>

      {query.created === "1" && (
        <p
          role="status"
          className="rounded-md bg-surface-tint p-3 text-sm font-semibold text-navy"
        >
          Player added. Upload a photo below.
        </p>
      )}

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Photo</h2>
        <div className="mt-4">
          <PersonPhotoPanel kind="player" id={player.id} photoUrl={player.photoUrl} />
        </div>
      </Card>

      <Card as="section" className="p-6">
        <h2 className="text-card text-navy">Details</h2>
        <div className="mt-4">
          <PlayerForm
            mode="edit"
            action={updatePlayerAction.bind(null, player.id)}
            initial={{
              name: player.name,
              squad: player.squad,
              position: player.position,
              number: text(player.number),
              role: player.role ?? "",
              foot: player.foot ?? "",
              appearances: text(player.appearances),
              goals: text(player.goals),
              cleanSheets: text(player.cleanSheets),
              saves: text(player.saves),
              published: player.published,
            }}
          />
        </div>
      </Card>

      {user.role === "admin" && (
        <Card as="section" className="border-2 border-red-100 p-6">
          <h2 className="text-card text-red-800">Delete this player</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Removes the player and their photo. Only administrators can do
            this. To take them off the website without deleting, untick “Show
            on the website”.
          </p>
          <div className="mt-4">
            <DeletePersonForm kind="player" id={player.id} />
          </div>
        </Card>
      )}
    </div>
  );
}
