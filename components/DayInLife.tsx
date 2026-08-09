import React from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Mascot, MascotColor, MascotPose, MascotProp } from './ui/Mascot';
import { WABubble } from './ui/WhatsApp';
import { Doodle } from './ui/Doodle';

const moments: {
  time: string;
  icon: React.ElementType;
  label: string;
  color: MascotColor;
  pose: MascotPose;
  prop: MascotProp;
  rotate: number;
  bubble: React.ReactNode;
}[] = [
  {
    time: '7:30 AM',
    icon: Sunrise,
    label: 'Morning briefing',
    color: 'sun',
    pose: 'happy',
    prop: 'coffee',
    rotate: -3,
    bubble: <>Good morning! ☀️ You've got 3 things today — first up: <span className="font-semibold">Deep Work at 9.</span></>,
  },
  {
    time: '12:30 PM',
    icon: Sun,
    label: 'Voice note, mid-meeting',
    color: 'coral',
    pose: 'busy',
    prop: 'none',
    rotate: 3,
    bubble: <>Transcribed: "Remember to send the invoice before <span className="font-semibold">Friday</span>."</>,
  },
  {
    time: '3:45 PM',
    icon: Sunset,
    label: 'Ticks off a task',
    color: 'sky',
    pose: 'sit',
    prop: 'check',
    rotate: -2,
    bubble: <>Marked <span className="font-semibold">"Send proposal"</span> as done ✅ Nice work.</>,
  },
  {
    time: '9:00 PM',
    icon: Moon,
    label: 'Evening wind-down',
    color: 'violet',
    pose: 'sleepy',
    prop: 'none',
    rotate: 2,
    bubble: <>Tomorrow's agenda is ready. Rest easy — I've got it from here. 🌙</>,
  },
];

export const DayInLife: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-cream-100 relative overflow-hidden">
      <div className="absolute top-16 left-8 hidden md:block opacity-50 -rotate-12">
        <Doodle type="squiggle" className="w-16 h-6 text-secondary" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto relative">
          <FadeIn>
            <span className="font-doodle text-2xl text-secondary">a day with remore</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mt-2 mb-4 tracking-tight">
              It's there for the whole ride.
            </h2>
            <p className="text-lg text-ink/60">
              Not just a reminder app. A quiet companion that shows up exactly when you need it.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
          <div className="hidden md:block absolute top-[46px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-sun via-secondary via-sky to-violet-400 opacity-25 -z-10" />

          {moments.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.12} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink/50 mb-4">
                  <m.icon size={14} />
                  {m.time}
                </div>
                <Mascot color={m.color} pose={m.pose} prop={m.prop} rotate={m.rotate} className="w-28 h-28 mb-4" float={m.pose === 'sleepy'} />
                <h3 className="font-display text-lg font-semibold text-ink mb-3">{m.label}</h3>
                <WABubble from="bot" time={m.time} delay={0.2 + i * 0.1} center tail={false} className="text-left !shadow-md w-full">
                  {m.bubble}
                </WABubble>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
