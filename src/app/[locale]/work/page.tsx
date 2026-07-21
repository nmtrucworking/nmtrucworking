import React from 'react';
import Link from 'next/link';
import { Locale, loadMessages } from '@/content/load';
import { getProjects } from '@/content/selectors';
import { Search, Filter, ArrowRight } from 'lucide-react';

interface WorkPageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ role?: string; domain?: string; query?: string }>;
}

export default async function WorkPage({ params, searchParams }: WorkPageProps) {
  const [{ locale: localeParam }, resolvedSearchParams = {}] = await Promise.all([
    params,
    searchParams,
  ]);
  const locale = localeParam as Locale;
  const messages = loadMessages(locale);

  const activeRole = resolvedSearchParams.role || 'all';
  const activeDomain = resolvedSearchParams.domain || 'all';
  const query = resolvedSearchParams.query || '';

  const projects = getProjects(locale, {
    role: activeRole,
    domain: activeDomain,
    query: query,
  });

  const rolesList = ['all', 'DA', 'DS', 'BA', 'SA', 'PRODUCT'];
  const domainsList = [
    'all',
    'enterprise-saas',
    'operations',
    'ai-ml',
    'analytics',
    'e-commerce',
    'product',
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Header & Title */}
      <div className="space-y-4 border-b border-line/60 pb-8">
        <span className="mono-label text-xs text-muted">Portfolio Index</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          {messages.work.title}
        </h1>
        <p className="text-lg text-muted max-w-3xl leading-relaxed">
          {messages.work.subtitle}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-6 rounded-xl border border-line/60 bg-paper space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Form */}
          <form method="GET" className="relative flex-1 max-w-md">
            {activeRole !== 'all' && <input type="hidden" name="role" value={activeRole} />}
            {activeDomain !== 'all' && <input type="hidden" name="domain" value={activeDomain} />}
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder={messages.work.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-canvas text-sm font-sans placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
            />
          </form>

          {/* Quick Clear */}
          {(activeRole !== 'all' || activeDomain !== 'all' || query !== '') && (
            <Link
              href={`/${locale}/work`}
              className="text-xs font-mono text-muted hover:text-ink underline self-start md:self-auto"
            >
              Reset filters
            </Link>
          )}
        </div>

        {/* Role Filters */}
        <div className="space-y-2">
          <span className="mono-label text-xs text-muted block font-semibold">
            {messages.work.filterRole}:
          </span>
          <div className="flex flex-wrap gap-2">
            {rolesList.map((r) => {
              const isActive = activeRole === r;
              const label =
                r === 'all'
                  ? messages.roles.all
                  : `${r} — ${messages.roles[r as keyof typeof messages.roles] || r}`;

              const paramsObj = new URLSearchParams();
              if (r !== 'all') paramsObj.set('role', r);
              if (activeDomain !== 'all') paramsObj.set('domain', activeDomain);
              if (query) paramsObj.set('query', query);

              const href = `/${locale}/work?${paramsObj.toString()}`;

              return (
                <Link
                  key={r}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-ink text-signal font-bold'
                      : 'bg-canvas border border-line/60 text-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Domain Filters */}
        <div className="space-y-2 pt-2 border-t border-line/40">
          <span className="mono-label text-xs text-muted block font-semibold">
            {messages.work.filterDomain}:
          </span>
          <div className="flex flex-wrap gap-2">
            {domainsList.map((d) => {
              const isActive = activeDomain === d;
              const paramsObj = new URLSearchParams();
              if (activeRole !== 'all') paramsObj.set('role', activeRole);
              if (d !== 'all') paramsObj.set('domain', d);
              if (query) paramsObj.set('query', query);

              const href = `/${locale}/work?${paramsObj.toString()}`;

              return (
                <Link
                  key={d}
                  href={href}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-graphite text-canvas font-semibold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  #{d}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects List Grid */}
      {projects.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-line/60 bg-paper space-y-4">
          <p className="text-muted text-base">{messages.work.noProjects}</p>
          <Link
            href={`/${locale}/work`}
            className="inline-block px-4 py-2 rounded bg-ink text-canvas text-xs font-mono font-bold"
          >
            Clear Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="p-8 rounded-2xl border border-line/60 bg-paper hover:border-ink transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-graphite text-signal font-semibold">
                      {project.roles.primary}
                    </span>
                    {project.roles.secondary.map((sec) => (
                      <span key={sec} className="px-2 py-0.5 rounded border border-line">
                        {sec}
                      </span>
                    ))}
                  </div>
                  <span>{project.yearStart}</span>
                </div>

                <h2 className="font-display text-2xl font-bold text-ink group-hover:underline">
                  <Link href={`/${locale}/work/${project.slug}`}>
                    {project.localizedContent.title}
                  </Link>
                </h2>

                <p className="text-sm text-muted leading-relaxed">
                  {project.localizedContent.summary}
                </p>
              </div>

              {/* Metrics or Capabilities */}
              <div className="space-y-4 pt-4 border-t border-line/40">
                {project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-4 font-mono text-xs">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="font-bold text-ink">{m.value}</span>
                        <span className="text-[10px] text-muted block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="mono-label text-[10px] text-muted uppercase">
                    Stage: {project.stage}
                  </span>
                  <Link
                    href={`/${locale}/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-ink group-hover:translate-x-1 transition-transform"
                  >
                    <span>{messages.work.viewProject}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
