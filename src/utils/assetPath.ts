/**
 * Resolves a public-asset path so it works under any deployment base
 * (GitHub Pages subpath, project root, Vercel/Cloudflare, or local dev).
 *
 * Folder-relative paths (without a leading "/") resolve naturally relative
 * to the page, which is always served at the deploy base for this single-page
 * app. Leading slashes are stripped because absolute paths would point at the
 * domain root and break under a subpath.
 */
export function asset(path: string | undefined): string | undefined {
  if (!path) return path;
  return path.replace(/^\/+/, "");
}
