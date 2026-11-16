"use client";

import Button from "@/components/ui/Button";

export default function PortalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="rounded-xl bg-white p-8 shadow-card">
      <h1 className="text-section text-navy">This page could not load</h1>
      <p className="mt-3 text-ink-muted">
        The most likely cause is that the API is not running or cannot be
        reached. Check it, then try again. If it keeps happening, the details
        are in the Next.js server log.
      </p>
      <div className="mt-6">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
