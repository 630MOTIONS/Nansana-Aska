import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MatchDetail from "@/components/sections/matches/MatchDetail";
import { fixtures, getFixture } from "@/lib/fixtures";

export function generateStaticParams() {
  return fixtures.map((fixture) => ({ id: fixture.id }));
}

export async function generateMetadata(
  props: PageProps<"/matches/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const fixture = getFixture(id);
  if (!fixture) return {};
  return { title: `${fixture.home.name} vs ${fixture.away.name}` };
}

export default async function MatchPage(props: PageProps<"/matches/[id]">) {
  const { id } = await props.params;
  const fixture = getFixture(id);
  if (!fixture) notFound();
  return <MatchDetail fixture={fixture} />;
}
