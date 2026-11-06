const ENTER_KEY = "briteline-enter";
const LEAVE_MS = 420;

let leaving = false;

export function isLeaving() {
  return leaving;
}

/** Fade the page out, then load the next URL. Same-document hash links should not come here. */
export function beginLeave(href: string) {
  if (leaving) return;
  leaving = true;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.location.assign(href);
    return;
  }

  try {
    sessionStorage.setItem(ENTER_KEY, "1");
  } catch {
    /* Private browsing can block storage. The next page still loads. */
  }

  document.documentElement.classList.add("page-leave");
  window.setTimeout(() => {
    window.location.assign(href);
  }, LEAVE_MS);
}
