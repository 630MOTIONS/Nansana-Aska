"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Bold,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  Quote,
} from "lucide-react";
import { controlClass } from "@/components/admin/ui";
import ArticleBody from "@/components/news/ArticleBody";
import {
  insertText,
  prefixLines,
  wrapSelection,
} from "@/lib/admin/markdown-edit";
import type { EditResult } from "@/lib/admin/markdown-edit";
import { uploadImage } from "@/lib/admin/upload-client";

const toolbarButton =
  "rounded-md p-2 text-navy hover:bg-surface-strong disabled:opacity-50";

export default function MarkdownEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const picker = useRef<HTMLInputElement>(null);

  function apply(edit: (start: number, end: number) => EditResult) {
    const element = area.current;
    if (!element) return;
    const result = edit(element.selectionStart, element.selectionEnd);
    setValue(result.value);
    requestAnimationFrame(() => {
      element.focus();
      element.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  async function onPickImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    const result = await uploadImage(file, { purpose: "inline" });
    setUploading(false);

    if (result.error || !result.url) {
      setUploadError(result.error ?? "The upload failed.");
      return;
    }
    const address = result.url;
    apply((start, end) =>
      insertText(value, start, end, `\n\n![Describe the photo](${address})\n\n`),
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-md border-2 border-b-0 border-surface-strong bg-surface-tint px-2 py-1">
        <div className="flex items-center gap-1" role="toolbar" aria-label="Formatting">
          <button
            type="button"
            className={toolbarButton}
            aria-label="Bold"
            title="Bold"
            onClick={() =>
              apply((s, e) => wrapSelection(value, s, e, "**", "**", "bold text"))
            }
          >
            <Bold size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Italic"
            title="Italic"
            onClick={() =>
              apply((s, e) => wrapSelection(value, s, e, "_", "_", "italic text"))
            }
          >
            <Italic size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Heading"
            title="Heading"
            onClick={() => apply((s, e) => prefixLines(value, s, e, "## "))}
          >
            <Heading2 size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Bulleted list"
            title="Bulleted list"
            onClick={() => apply((s, e) => prefixLines(value, s, e, "- "))}
          >
            <List size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Quote"
            title="Quote"
            onClick={() => apply((s, e) => prefixLines(value, s, e, "> "))}
          >
            <Quote size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Link"
            title="Link"
            onClick={() =>
              apply((s, e) =>
                wrapSelection(value, s, e, "[", "](https://)", "link text"),
              )
            }
          >
            <LinkIcon size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={toolbarButton}
            aria-label="Insert photo"
            title="Insert photo"
            disabled={uploading}
            onClick={() => picker.current?.click()}
          >
            <ImageIcon size={18} aria-hidden />
          </button>
          <input
            ref={picker}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={onPickImage}
          />
        </div>

        <div role="group" aria-label="Editor view" className="flex gap-1">
          {(["write", "preview"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={`rounded-md px-3 py-1.5 text-label font-bold uppercase tracking-wide ${
                tab === item
                  ? "bg-navy text-white"
                  : "text-navy hover:bg-surface-strong"
              }`}
            >
              {item === "write" ? "Write" : "Preview"}
            </button>
          ))}
        </div>
      </div>

      {/* Always in the page so the text is submitted from either view. */}
      <textarea
        ref={area}
        id={`${name}-editor`}
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={20}
        maxLength={60000}
        aria-label="Article text"
        className={`${controlClass} rounded-t-none font-mono text-sm leading-relaxed ${
          tab === "preview" ? "hidden" : ""
        }`}
      />

      {tab === "preview" && (
        <div className="min-h-[20rem] rounded-b-md border-2 border-surface-strong bg-white p-5">
          {value.trim() ? (
            <ArticleBody markdown={value} />
          ) : (
            <p className="text-ink-muted">Nothing to preview yet.</p>
          )}
        </div>
      )}

      <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
        {uploading
          ? "Uploading photo…"
          : "Use the toolbar for formatting. Photos are resized, and location data is removed."}
      </p>
      {uploadError && (
        <p role="alert" className="mt-2 text-sm font-semibold text-red-800">
          {uploadError}
        </p>
      )}
    </div>
  );
}
