import { analytics } from "../lib/firebase/firebase";
import { logEvent } from "firebase/analytics";

export const logShareEvent = async (shareLink: string, method: string) => {
  if (!analytics) return;
  const url = new URL(shareLink!);
  const paths = url.pathname.split("/");

  if (paths.length < 3) return;

  const type = paths[paths.length - 2];
  const itemId = paths[paths.length - 1];

  logEvent(analytics, "share", {
    method: method,
    content_type: type,
    item_id: itemId,
  });
};

export const logSearchEvent = async (searchTerm: string) => {
  if (!analytics) return;
  logEvent(analytics, "search", {
    search_term: searchTerm,
  });
};

export const logSelectContentEvent = async (
  contenType: string,
  contentId: string
) => {
  if (!analytics) return;
  logEvent(analytics, "select_content", {
    content_type: contenType,
    content_id: contentId,
  });
};
