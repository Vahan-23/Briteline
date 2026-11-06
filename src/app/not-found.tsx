import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-slate">404</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-navy">Page not found</h1>
        <p className="mt-4 text-muted">That page is not on this site.</p>
        <Link
          href="/"
          className="mt-8 inline-flex bg-navy px-5 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-white"
        >
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
