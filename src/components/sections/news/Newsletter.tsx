import { Mail } from "lucide-react";

// The design has a working sign-up form. There is no backend to receive
// emails yet, so the form is shown but disabled. It would be misleading to let
// people submit an address that goes nowhere. When the backend exists, remove
// the `disabled` props and add the submit handler.
export default function Newsletter() {
  return (
    <section
      aria-label="Newsletter"
      className="bg-linear-to-br from-navy to-brand-blue py-14 text-white"
    >
      <div className="mx-auto grid w-full max-w-site items-center gap-8 px-4 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 text-label font-bold uppercase tracking-widest text-gold-soft">
            <Mail size={14} aria-hidden /> Weekly gazette & dispatches
          </p>
          <h2 className="mt-3 text-hero">Get club news in your inbox</h2>
          <p className="mt-3 max-w-lg text-white/85">
            Receive match reports, squad announcements, youth clinic schedules,
            and club dispatches straight to your inbox.
          </p>
        </div>

        <div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            aria-describedby="newsletter-note"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Enter your email address..."
              disabled
              className="w-full rounded-md bg-white px-4 py-3 text-ink placeholder:text-ink-muted disabled:opacity-70"
            />
            <button
              type="submit"
              disabled
              className="rounded-sm bg-brand-orange px-6 py-3 text-button font-bold uppercase tracking-wide text-ink disabled:cursor-not-allowed disabled:opacity-70"
            >
              Subscribe
            </button>
          </form>
          <p
            id="newsletter-note"
            className="mt-3 text-label font-semibold uppercase tracking-wide text-white/80"
          >
            Newsletter sign-up opens soon.
          </p>
        </div>
      </div>
    </section>
  );
}
