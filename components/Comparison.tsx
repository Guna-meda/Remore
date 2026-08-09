import React from 'react';
import { X, Check } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Mascot } from './ui/Mascot';
import { Doodle } from './ui/Doodle';

const rows = [
  { old: '5 different apps to keep track of your life', neu: 'One chat you already have open' },
  { old: "Sticky notes you'll lose by Tuesday", neu: "Nothing to lose — it's all in the thread" },
  { old: 'Set a reminder, forget to check it', neu: 'Nudges come to you, right on time' },
  { old: 'Onboarding tutorials and settings menus', neu: 'Zero onboarding. Just start typing' },
  { old: 'One more login to remember', neu: 'Your WhatsApp number is the login' },
];

export const Comparison: React.FC = () => {
  return (
    <section id="compare" className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
      <div className="absolute top-24 right-10 hidden md:block opacity-40 rotate-6">
        <Doodle type="star" className="w-9 h-9 text-sun" />
      </div>
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-doodle text-2xl text-secondary">side by side</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mt-2 tracking-tight relative inline-block">
              The old way, vs. Remore.
              <Doodle type="underline" className="absolute -bottom-2 left-0 w-full h-3 text-primary opacity-50" />
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[2rem] border border-ink/5 shadow-sm overflow-hidden bg-cream-50">
            {/* Header */}
            <div className="grid grid-cols-2">
              <div className="flex flex-col items-center gap-3 py-8 px-4 border-r border-ink/5 bg-cream-100">
                <Mascot color="coral" pose="overwhelmed" prop="stack" className="w-16 h-16" rotate={-3} />
                <h3 className="font-display text-lg font-semibold text-ink/70">The Old Way</h3>
              </div>
              <div className="flex flex-col items-center gap-3 py-8 px-4 bg-forest-900">
                <Mascot color="green" pose="happy" prop="star" className="w-16 h-16" rotate={3} float />
                <h3 className="font-display text-lg font-semibold text-cream-50">With Remore</h3>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 ${i > 0 ? 'border-t border-ink/5' : ''}`}>
                <div className="flex items-center gap-3 py-5 px-5 md:px-8 border-r border-ink/5">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                    <X size={13} strokeWidth={3} />
                  </span>
                  <p className="text-sm md:text-[15px] text-ink/50 leading-snug">{row.old}</p>
                </div>
                <div className="flex items-center gap-3 py-5 px-5 md:px-8 bg-forest-900/[0.03]">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <p className="text-sm md:text-[15px] text-ink font-medium leading-snug">{row.neu}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
