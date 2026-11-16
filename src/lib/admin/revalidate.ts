import "server-only";
import { revalidatePath, updateTag } from "next/cache";

// Call after any admin change, from a Server Action.
// - refreshes the admin screens
// - expires the "matches" tag. The public pages will use it once they read
//   from the API instead of the sample files.
export function refreshAfterChange() {
  revalidatePath("/admin", "layout");
  updateTag("matches");
}

// The same for news articles.
export function refreshNewsAfterChange() {
  revalidatePath("/admin", "layout");
  updateTag("news");
}
