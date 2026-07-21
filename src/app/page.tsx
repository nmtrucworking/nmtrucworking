import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm text-muted">
          Redirecting to the English portfolio…
        </p>
        <Link
          href="/en/"
          className="inline-flex items-center justify-center rounded border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink"
        >
          Continue to portfolio
        </Link>
      </div>
    </main>
  );
}
