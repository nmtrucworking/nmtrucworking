'use client';

import React from 'react';
import { Locale } from '@/content/load';
import { loadMessages } from '@/content/load';

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
      <div className="flex flex-wrap items-center justify-between gap-2 border-y border-line/60 py-3 px-4 bg-paper/60 backdrop-blur-sm rounded-lg">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2 group">
              <span className="w-2 h-2 rounded-full bg-graphite group-hover:bg-signal transition-colors" />
              <span className="mono-label text-ink font-semibold text-xs tracking-wider">
                0{index + 1}. {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden sm:block text-muted/40 font-mono text-xs select-none">
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
