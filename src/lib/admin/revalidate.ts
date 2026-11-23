import "server-only";
import { revalidatePath, updateTag } from "next/cache";

// Call after any admin change, from a Server Action.
// - refreshes the admin screens
// - expires the matching cache tag, so the public pages show the change
//   straight away.
export function refreshAfterChange() {
  revalidatePath("/admin", "layout");
  updateTag("matches");
}

export function refreshNewsAfterChange() {
  revalidatePath("/admin", "layout");
  updateTag("news");
}

export function refreshGalleryAfterChange() {
  revalidatePath("/admin", "layout");
  updateTag("gallery");
}
