export const LINKS_PER_PAGE = 3;

export function getDomain(url) {
  return url.replace(/^https?:\/\//i, "");
}

