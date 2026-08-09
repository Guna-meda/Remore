import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { Mascot, MascotColor, MascotPose, MascotProp } from './ui/Mascot';

const steps: { color: MascotColor; pose: MascotPose; prop: MascotProp; size: string; rotate: number; title: string; desc: string }[] = [
  { color: 'green', pose: 'wave', prop: 'none', size: 'w-16 h-16', rotate: -3, title: 'Say hi', desc: 'Enter your number and verify with a simple OTP. No app to download.' },
  { color: 'sky', pose: 'think', prop: 'question', size: 'w-14 h-14', rotate: 2, title: 'Just chat', desc: `Send something like "Remind me to call Mom later" — in your own words.` },
  { color: 'sun', pose: 'happy', prop: 'check', size: 'w-16 h-16', rotate: -2, title: 'It happens', desc: 'The task is saved and the reminder is set before you\'ve locked your phone.' },
  { color: 'coral', pose: 'busy', prop: 'star', size: 'w-14 h-14', rotate: 3, title: 'Stay ahead', desc: 'Gentle nudges, right on time, every time. Never forget again.' },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <FadeIn>
            <span className="font-doodle text-2xl text-secondary">no learning curve</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mt-2 mb-4 tracking-tight">How it works</h2>
            <p className="text-lg text-ink/60">
              No complex onboarding. It takes less than 30 seconds to get started.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-ink/15 -z-10" />

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.15} direction="up">
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-[2rem] bg-cream-50 shadow-lg shadow-ink/5 border border-ink/5 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl relative z-10">
                  <Mascot color={step.color} pose={step.pose} prop={step.prop} className={step.size} rotate={step.rotate} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-cream-100">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">{step.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed px-4">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
