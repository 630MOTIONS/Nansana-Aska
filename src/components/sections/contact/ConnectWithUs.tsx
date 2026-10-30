import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { socialChannels } from "@/lib/contact";

export default function ConnectWithUs() {
  return (
    <section aria-label="Connect with us" className="bg-surface py-16">
      <div className="mx-auto w-full max-w-site px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Digital community"
            eyebrowTone="gold"
            title="Connect with us"
          />
          <p className="max-w-sm text-sm text-ink-muted">
            Follow the club across social networks for match updates,
            behind-the-scenes access, and community news.
          </p>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socialChannels.map((channel) => {
            const Icon = channel.icon;
            const body = (
              <>
                <span
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${channel.iconClass}`}
                >
                  <Icon size={20} aria-hidden />
                </span>
                <span className="font-display text-card font-extrabold uppercase text-navy">
                  {channel.title}
                </span>
                <span className="text-sm text-ink-muted">{channel.text}</span>
                <span className="mt-auto flex items-center justify-between pt-6 text-label font-bold uppercase tracking-wide text-gold-deep">
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
