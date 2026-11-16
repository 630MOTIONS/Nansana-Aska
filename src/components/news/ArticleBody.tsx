import ReactMarkdown from "react-markdown";

// Renders an article's Markdown. It never renders raw HTML, and it drops unsafe
// links such as javascript: addresses, so article text cannot run scripts.
// Photos stored by the club are written as /media/<id> and are loaded from the
// API.
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export default function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-4 text-ink">
      <ReactMarkdown
        components={{
          // The page title is the h1, so # and ## both become section headings.
          h1: ({ children }) => (
            <h2 className="pt-4 text-section text-navy">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="pt-4 text-section text-navy">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-2 text-card text-navy">{children}</h3>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-6">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="rounded-r-lg border-l-4 border-brand-orange bg-surface-tint p-4 italic text-navy">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-surface-strong" />,
          a: ({ href, children }) => {
            const external = typeof href === "string" && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-semibold text-brand-blue underline hover:text-navy"
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            const address =
              typeof src === "string" && src.startsWith("/media/")
                ? `${API_URL}${src}`
                : src;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={typeof address === "string" ? address : undefined}
                alt={alt ?? ""}
                loading="lazy"
                className="my-4 h-auto max-w-full rounded-lg"
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
