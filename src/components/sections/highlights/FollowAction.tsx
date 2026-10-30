import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { channels } from "@/lib/highlights";

export default function FollowAction() {
  return (
    <section aria-label="Follow the action" className="bg-surface-tint py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          align="center"
          className="mx-auto max-w-2xl"
          eyebrow="Club broadcaster network"
          eyebrowTone="gold"
          title="Follow the action"
          description="Stay connected with our official club channels for match livestreams, player reels, and training updates."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const body = (
              <>
                <span
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${channel.iconClass}`}
                >
                  <Icon size={20} aria-hidden />
                </span>
                <span className="text-label font-bold uppercase tracking-widest text-ink-muted">
                  {channel.kicker}
                </span>
                <span className="font-display text-card font-extrabold uppercase text-navy">
                  {channel.title}
                </span>
                <span className="text-sm text-ink-muted">{channel.text}</span>
                <span className="mt-auto flex items-center justify-between pt-6 text-label font-bold uppercase tracking-wide text-navy">
                  {channel.url ? channel.cta : "Link coming soon"}
                  {channel.url && <ExternalLink size={14} aria-hidden />}
                </span>
              </>
            );

            const cardClass =
              "flex h-full flex-col gap-1 rounded-xl bg-white p-5 shadow-card";

            return (
              <li key={channel.id}>
                {channel.url ? (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} transition-shadow hover:shadow-lg`}
                  >
                    {body}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
