import { useEffect } from "react";

export function useWebsiteTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
