'use client';

import React from 'react';
import { Locale, loadMessages } from '@/content/load';

interface SignalFlowProps {
  locale: Locale;
  compact?: boolean;
}

export const SignalFlow: React.FC<SignalFlowProps> = ({ locale, compact = false }) => {
  const messages = loadMessages(locale);
  const steps = [
    { id: 'input', label: messages.signalFlow.input },
    { id: 'interpret', label: messages.signalFlow.interpret },
    { id: 'structure', label: messages.signalFlow.structure },
    { id: 'build', label: messages.signalFlow.build },
    { id: 'evaluate', label: messages.signalFlow.evaluate },
  ];

  return (
    <div className={`w-full ${compact ? 'py-2' : 'py-6'}`}>
      <div className="relative overflow-hidden rounded-xl border border-line/60 bg-paper/80 p-3 sm:p-5 shadow-sm backdrop-blur-sm">
        {/* Ambient progress line connecting steps on sm+ */}
        <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-[1px] -translate-y-1/2 bg-line/40 sm:block">
          <div className="signal-flow-beam h-full w-24 bg-gradient-to-r from-transparent via-signal to-transparent opacity-80" />
        </div>

        <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group relative flex min-w-0 items-center gap-2.5 rounded-lg border border-transparent p-2 transition-all hover:border-line hover:bg-canvas/60 sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:p-3 sm:text-center"
            >
              <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <span
                  className="signal-flow-step-pulse absolute h-full w-full rounded-full bg-signal/30 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all"
                  style={{ animationDelay: `${index * 1.2}s` }}
                />
                <span
                  className="signal-flow-dot h-2 w-2 rounded-full bg-graphite transition-all duration-300 group-hover:scale-125 group-hover:bg-signal group-hover:shadow-[0_0_10px_var(--color-signal)]"
                  style={{ animationDelay: `${index * 1.2}s` }}
                />
              </div>

              <div className="flex flex-col min-w-0 sm:items-center">
                <span className="mono-label text-[10px] text-muted tracking-widest sm:text-[9px]">
                  STEP 0{index + 1}
                </span>
                <span className="mono-label min-w-0 text-xs font-semibold tracking-wider text-ink transition-colors group-hover:text-ink sm:text-[11px] lg:text-xs">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
