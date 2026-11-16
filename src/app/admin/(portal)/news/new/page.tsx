import type { Metadata } from "next";
import Link from "next/link";
import ArticleForm from "@/components/admin/news/ArticleForm";
import Card from "@/components/ui/Card";
import { getAuth } from "@/lib/admin/auth";
import { createArticleAction } from "../actions";

export const metadata: Metadata = { title: "New article" };

export default async function NewArticlePage() {
  const { user } = await getAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/news"
          className="text-sm font-semibold text-navy hover:text-brand-blue"
        >
          ← All articles
        </Link>
        <h1 className="mt-2 text-section text-navy">New article</h1>
        <p className="mt-1 text-ink-muted">
          Save it as a draft first. You add the cover photo on the next screen.
        </p>
      </div>

      <Card className="p-6">
        <ArticleForm
          mode="create"
          action={createArticleAction}
          initial={{
            title: "",
            excerpt: "",
            category: "",
            body: "",
            authorName: user.name,
            featured: false,
            status: "draft",
          }}
        />
      </Card>
    </div>
  );
}
