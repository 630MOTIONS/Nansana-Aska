"use client";

import { useActionState, useState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import Button from "@/components/ui/Button";
import type { FormState } from "@/lib/admin/form-state";
import type { AdminCompetition, MatchStatus } from "@/lib/admin/types";

type Initial = {
  competition: string;
  homeTeam: string;
  awayTeam: string;
  stage: string;
  matchday: number | null;
  kickoff: string; // Uganda time, as a datetime-local value
  venue: string;
  status: MatchStatus;
};

type MatchFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  competitions: AdminCompetition[];
  initial?: Initial;
};

const editableStatuses: MatchStatus[] = ["scheduled", "postponed", "cancelled"];

export default function MatchForm({
  mode,
  action,
  competitions,
  initial,
}: MatchFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);
  const [competition, setCompetition] = useState(initial?.competition ?? "");
  const [home, setHome] = useState(initial?.homeTeam ?? "");
  const [away, setAway] = useState(initial?.awayTeam ?? "");

  const current = competitions.find((item) => item.slug === competition);
  const teams = current?.teams ?? [];
  const hasResult = initial?.status === "final" || initial?.status === "live";
  const statusEditable =
    initial !== undefined && editableStatuses.includes(initial.status);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {mode === "create" ? (
          <Field
            id="match-competition"
            label="Competition"
            className="sm:col-span-2"
          >
            <select
              id="match-competition"
              name="competition"
              required
              value={competition}
              onChange={(event) => {
                setCompetition(event.target.value);
                setHome("");
                setAway("");
              }}
              className={controlClass}
            >
              <option value="">Choose a competition</option>
              {competitions.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} ({item.season})
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <p className="text-sm text-ink-muted sm:col-span-2">
            Competition:{" "}
            <strong className="text-navy">
              {current ? `${current.name} (${current.season})` : competition}
            </strong>
          </p>
        )}

        <Field id="match-home" label="Home team">
          <select
            id="match-home"
            name="homeTeam"
            required
            disabled={hasResult || !current}
            value={home}
            onChange={(event) => setHome(event.target.value)}
            className={controlClass}
          >
            <option value="">Choose a team</option>
            {teams.map((team) => (
              <option key={team.slug} value={team.slug}>
                {team.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="match-away" label="Away team">
          <select
            id="match-away"
            name="awayTeam"
            required
            disabled={hasResult || !current}
            value={away}
            onChange={(event) => setAway(event.target.value)}
            className={controlClass}
          >
            <option value="">Choose a team</option>
            {teams.map((team) => (
              <option key={team.slug} value={team.slug}>
                {team.name}
              </option>
            ))}
          </select>
        </Field>

        {hasResult && (
          <p className="text-sm text-ink-muted sm:col-span-2">
            Clear the result below if you need to change the teams.
          </p>
        )}

        <Field id="match-stage" label="Stage" hint="e.g. Matchday 14">
          <input
            id="match-stage"
            name="stage"
            type="text"
            required
            maxLength={60}
            defaultValue={initial?.stage ?? ""}
            className={controlClass}
          />
        </Field>

        <Field id="match-matchday" label="Matchday number" hint="Optional">
          <input
            id="match-matchday"
            name="matchday"
            type="number"
            inputMode="numeric"
            min={1}
            max={99}
            defaultValue={initial?.matchday ?? ""}
            className={controlClass}
          />
        </Field>

        <Field id="match-kickoff" label="Kick-off" hint="Uganda time (EAT)">
          <input
            id="match-kickoff"
            name="kickoffAt"
            type="datetime-local"
            required
            defaultValue={initial?.kickoff ?? ""}
            className={controlClass}
          />
        </Field>

        <Field id="match-venue" label="Venue" hint="Optional">
          <input
            id="match-venue"
            name="venue"
            type="text"
            maxLength={120}
            defaultValue={initial?.venue ?? ""}
            className={controlClass}
          />
        </Field>

        {mode === "edit" && statusEditable && (
          <Field id="match-status" label="Status">
            <select
              id="match-status"
              name="status"
              defaultValue={initial?.status}
              className={controlClass}
            >
              <option value="scheduled">Scheduled</option>
              <option value="postponed">Postponed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </Field>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Create match"
            : "Save changes"}
      </Button>
      <FormMessage state={state} />
    </form>
  );
}
