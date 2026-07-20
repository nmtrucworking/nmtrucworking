'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto font-mono">
      <div className="text-4xl font-bold font-display text-danger">SYSTEM_ERROR</div>
      <h1 className="text-lg font-bold text-ink">An unexpected error occurred</h1>
      <p className="text-xs text-muted">
        {error.message || 'System rendering boundary exception.'}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded bg-ink text-canvas text-xs font-bold"
        >
          Try Again
        </button>
        <Link
          href="/en"
          className="px-4 py-2 rounded border border-line text-xs font-bold hover:border-ink"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
