"use client";

import Button from "@/components/ui/Button";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-site px-4 py-24 text-center"
    >
      <h1 className="text-section text-navy">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">
        We couldn’t load this page just now. Please try again in a moment.
      </p>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  );
}
