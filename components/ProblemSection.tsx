import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { Mascot } from './ui/Mascot';
import { Doodle } from './ui/Doodle';

const cards = [
  {
    color: 'coral' as const,
    pose: 'overwhelmed' as const,
    prop: 'question' as const,
    size: 'w-24 h-24',
    rotate: -4,
    title: '“Wait, I forgot again.”',
    desc: 'Sticky notes, five different apps, a dozen unread reminders. Your brain is the one holding it all together — and it\'s tired.',
  },
  {
    color: 'sky' as const,
    pose: 'think' as const,
    prop: 'none' as const,
    size: 'w-20 h-20',
    rotate: 3,
    title: '“Where did I even write that?”',
    desc: 'Notes app, WhatsApp chats, your own memory. Important details scatter across everywhere and nowhere.',
  },
  {
    color: 'sun' as const,
    pose: 'stress' as const,
    prop: 'stack' as const,
    size: 'w-28 h-28',
    rotate: -2,
    title: '“Another app to manage my apps?”',
    desc: 'Productivity tools promise calm, then hand you onboarding flows, tutorials, and yet another home screen icon.',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-cream-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-doodle text-2xl text-secondary">sound familiar?</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mt-2 tracking-tight">
              Your brain wasn't built <br className="hidden md:block" /> to be a task manager.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12}>
              <div className="bg-cream-50 rounded-[2rem] p-8 h-full border border-ink/5 shadow-sm relative overflow-hidden">
                <Mascot color={card.color} pose={card.pose} prop={card.prop} className={`${card.size} mb-6`} rotate={card.rotate} />
                <h3 className="font-display text-xl font-semibold text-ink mb-3">{card.title}</h3>
                <p className="text-ink/60 leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Turn */}
        <FadeIn delay={0.2}>
          <div className="relative bg-forest-900 rounded-[2.5rem] px-8 py-14 md:py-20 text-center overflow-hidden">
            <div className="absolute top-8 left-10 opacity-40">
              <Doodle type="squiggle" className="w-24 h-8 text-cream-100" />
            </div>
            <div className="absolute bottom-10 right-12 opacity-40 rotate-12">
              <Doodle type="star" className="w-10 h-10 text-sun" />
            </div>

            <Mascot color="green" pose="happy" prop="sparkle" className="w-24 h-24 mx-auto mb-6" float />
            <p className="font-doodle text-2xl text-sun mb-2">so we made it simple</p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-cream-50 max-w-2xl mx-auto tracking-tight">
              One chat. Everything remembered. Nothing to install.
            </h3>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
