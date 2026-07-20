import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto font-mono">
      <div className="text-6xl font-bold font-display text-ink">404</div>
      <h1 className="text-xl font-bold text-ink">Route / Resource Not Found</h1>
      <p className="text-sm text-muted">
        The system path you requested does not exist or has moved.
      </p>
      <div>
        <Link
          href="/en"
          className="inline-block px-6 py-3 rounded bg-ink text-canvas text-xs font-bold hover:bg-graphite transition-colors"
        >
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}
