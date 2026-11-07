/**
 * The ambient layer behind every page, as in the Tabletsgo app's home shell: a grid
 * and two glows in the page's accent, faint enough for text to read straight on top.
 *
 * It stays put while the page scrolls over it, and sits under everything in #root.
 */
export default function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="page-grid absolute inset-0" />
      <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
    </div>
  )
}
