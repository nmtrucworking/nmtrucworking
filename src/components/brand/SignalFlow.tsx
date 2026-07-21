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
      <div className="grid grid-cols-1 gap-1.5 rounded-lg border-y border-line/60 bg-paper/60 px-3 py-3 backdrop-blur-sm sm:grid-cols-5 sm:gap-2 sm:px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="group flex min-w-0 items-center gap-2 rounded px-1 py-1.5 sm:justify-center sm:px-0">
            <span className="h-2 w-2 shrink-0 rounded-full bg-graphite transition-colors group-hover:bg-signal" />
            <span className="mono-label min-w-0 text-[11px] font-semibold tracking-wide text-ink lg:text-xs lg:tracking-wider">
              0{index + 1}. {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
