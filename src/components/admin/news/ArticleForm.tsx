"use client";

import { useActionState, useState } from "react";
import { Field, FormMessage, controlClass } from "@/components/admin/ui";
import MarkdownEditor from "@/components/admin/news/MarkdownEditor";
import type { FormState } from "@/lib/admin/form-state";
import { articleCategories } from "@/lib/admin/news";
import type { ArticleCategory, ArticleStatus } from "@/lib/admin/news-types";

type ArticleFormProps = {
  mode: "create" | "edit";
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial: {
    title: string;
    excerpt: string;
    category: ArticleCategory | "";
    body: string;
    authorName: string;
    featured: boolean;
    status: ArticleStatus;
  };
};

const primary =
  "rounded-sm bg-brand-orange px-5 py-3 text-button font-bold uppercase tracking-wide text-ink hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60";
const secondary =
  "rounded-sm bg-surface-tint px-5 py-3 text-button font-bold uppercase tracking-wide text-navy hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-60";

export default function ArticleForm({ mode, action, initial }: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const published = mode === "edit" && initial.status === "published";

  return (
    <form action={formAction} className="space-y-6">
      <Field id="article-title" label="Title">
        <input
          id="article-title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={150}
          defaultValue={initial.title}
          className={controlClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="article-category" label="Category">
          <select
            id="article-category"
            name="category"
            required
            defaultValue={initial.category}
            className={controlClass}
          >
            <option value="">Choose…</option>
            {articleCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="article-author" label="Author" hint="Shown on the article">
          <input
            id="article-author"
            name="authorName"
            type="text"
            maxLength={80}
            defaultValue={initial.authorName}
            className={controlClass}
          />
        </Field>
      </div>

      <Field
        id="article-excerpt"
        label="Summary"
        hint={`${excerpt.length}/300 · needed to publish`}
      >
        <textarea
          id="article-excerpt"
          name="excerpt"
          rows={3}
          maxLength={300}
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          className={controlClass}
        />
      </Field>

      <div>
        <p className="mb-1.5 text-label font-bold uppercase tracking-wide text-ink">
          Article text
        </p>
        <MarkdownEditor name="body" defaultValue={initial.body} />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initial.featured}
          className="mt-1 h-4 w-4 accent-navy"
        />
        Feature this article at the top of the news page (replaces the
        current featured article)
      </label>

      <div className="flex flex-wrap gap-3">
        {mode === "create" ? (
          <>
            <button type="submit" name="intent" value="draft" disabled={pending} className={secondary}>
              {pending ? "Saving..." : "Save draft"}
            </button>
            <button type="submit" name="intent" value="publish" disabled={pending} className={primary}>
              Publish
            </button>
          </>
        ) : published ? (
          <>
            <button type="submit" name="intent" value="save" disabled={pending} className={primary}>
              {pending ? "Saving..." : "Save changes"}
            </button>
            <button type="submit" name="intent" value="draft" disabled={pending} className={secondary}>
              Unpublish
            </button>
          </>
        ) : (
          <>
            <button type="submit" name="intent" value="save" disabled={pending} className={secondary}>
              {pending ? "Saving..." : "Save draft"}
            </button>
            <button type="submit" name="intent" value="publish" disabled={pending} className={primary}>
              Publish
            </button>
          </>
        )}
      </div>
      <FormMessage state={state} />
    </form>
  );
}
