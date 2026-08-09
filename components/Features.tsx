import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, Brain, Sun, ListChecks, ArrowRight, Calendar, Mic, Image as ImageIcon, CheckSquare } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Mascot, MascotColor, MascotPose, MascotProp, Logo } from './ui/Mascot';
import { WABubble, WASystemPill, WAVoiceBubble, WAImageBubble, WAButtonList, WAWallpaper } from './ui/WhatsApp';
import { Doodle } from './ui/Doodle';

const features = [
  {
    id: "natural",
    icon: <MessageSquare className="text-white" size={24} />,
    title: "Speak Human, Not Robot",
    desc: "Text exactly how you think. 'Remind me to call Mom later' or 'I need to prepare for the meeting'. No complex forms, just natural conversation.",
    color: "bg-blue-600",
    visual: (
      <WAWallpaper>
        <WASystemPill>Speak Human, Not Robot</WASystemPill>
        <WABubble from="user" time="10:41 AM" delay={0.15}>
          Remind me to check the oven in 20 mins.
        </WABubble>
        <WABubble from="bot" time="10:41 AM" delay={0.5}>
          Got it. Timer set for 20 minutes. 🍕
        </WABubble>
      </WAWallpaper>
    )
  },
  {
    id: "memory",
    icon: <Brain className="text-white" size={24} />,
    title: "A Brain That Remembers",
    desc: "Store important notes, preferences, and context. Ask 'What did I say about the Q3 budget?' and Remore recalls it instantly.",
    color: "bg-purple-600",
    visual: (
      <WAWallpaper>
        <WASystemPill>A Brain That Remembers</WASystemPill>
        <WABubble from="user" time="8:02 PM" delay={0.15}>
          What was the door code for the Airbnb?
        </WABubble>
        <WABubble from="bot" time="8:02 PM" delay={0.5}>
          You noted it as <span className="font-bold text-primary">8842#</span> last Tuesday. 🏠
        </WABubble>
      </WAWallpaper>
    )
  },
  {
    id: "agenda",
    icon: <Sun className="text-white" size={24} />,
    title: "Stress-Free Daily Agenda",
    desc: "Receive a calm morning briefing and gentle nudges for unfinished tasks. We help you stay on track without the anxiety of constant alarms.",
    color: "bg-orange-500",
    visual: (
      <WAWallpaper>
        <WASystemPill>Stress-Free Daily Agenda</WASystemPill>
        <WABubble from="bot" time="7:30 AM" delay={0.2} className="!max-w-[86%]">
          <p className="font-bold text-slate-900 mb-1">Good Morning! ☀️</p>
          <p className="text-slate-500 mb-3">Here's your flow for today:</p>
          <div className="space-y-2.5">
            {[
              { t: "09:00", title: "Deep Work", sub: "Finish proposal" },
              { t: "11:30", title: "Team Sync", sub: "Zoom" },
              { t: "14:00", title: "Call Supplier", sub: "Follow up on invoice" },
            ].map((row) => (
              <div key={row.title} className="flex gap-2.5 items-start">
                <span className="text-[11px] font-bold text-secondary mt-0.5 w-10 flex-shrink-0">{row.t}</span>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800 leading-tight">{row.title}</p>
                  <p className="text-[11px] text-slate-400">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </WABubble>
      </WAWallpaper>
    )
  },
  {
    id: "lists",
    icon: <ListChecks className="text-white" size={24} />,
    title: "Tasks & Lists That Just Work",
    desc: "Keep running to-do lists, shopping lists, or project checklists. Add, check off, or reorder items with a single message — no app to open.",
    color: "bg-emerald-500",
    visual: (
      <WAWallpaper>
        <WASystemPill>Tasks & Lists</WASystemPill>
        <WABubble from="user" time="4:20 PM" delay={0.15}>
          Add "renew passport" to my errands list.
        </WABubble>
        <WABubble from="bot" time="4:20 PM" delay={0.5} className="!max-w-[86%]">
          <p className="mb-2">Added ✅ Your <span className="font-semibold text-emerald-700">Errands</span> list now has 4 items:</p>
          <div className="space-y-1.5">
            {["Renew passport", "Pick up dry cleaning", "Return library books", "Book dentist"].map((task) => (
              <div key={task} className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <CheckSquare size={13} className="text-emerald-600 flex-shrink-0" />
                <span className="text-[12px] text-slate-700 font-medium">{task}</span>
              </div>
            ))}
          </div>
        </WABubble>
      </WAWallpaper>
    )
  },
  {
    id: "sync",
    icon: <Calendar className="text-white" size={24} />,
    title: "Seamless Google Calendar Sync",
    desc: "Effortlessly integrate your tasks, reminders, and events with Google Calendar. Stay perfectly in sync across all your devices without manual updates.",
    color: "bg-indigo-600",
    visual: (
      <WAWallpaper>
        <WASystemPill>Google Calendar Sync</WASystemPill>
        <WABubble from="bot" time="6:00 AM" delay={0.2} className="!max-w-[86%]">
          <p className="font-bold text-slate-900 mb-1">Calendar Sync Active 🔄</p>
          <p className="text-slate-500 mb-3">Your events are in perfect harmony:</p>
          <div className="space-y-2.5">
            {[
              { t: "10:00", title: "Client Meeting", sub: "Synced from Google" },
              { t: "13:00", title: "Lunch Break", sub: "Added in Remore" },
              { t: "15:30", title: "Project Review", sub: "Synced from Google" },
            ].map((row) => (
              <div key={row.title} className="flex gap-2.5 items-start">
                <span className="text-[11px] font-bold text-violet-500 mt-0.5 w-10 flex-shrink-0">{row.t}</span>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800 leading-tight">{row.title}</p>
                  <p className="text-[11px] text-slate-400">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </WABubble>
      </WAWallpaper>
    )
  },
  {
    id: "voice",
    icon: <Mic className="text-white" size={24} />,
    title: "Voice-Powered Notes",
    desc: "Capture thoughts instantly with voice notes. Automatic transcription turns your spoken ideas into organized, searchable text in your workflow.",
    color: "bg-pink-500",
    visual: (
      <WAWallpaper>
        <WASystemPill>Voice-Powered Notes</WASystemPill>
        <WAVoiceBubble from="user" time="6:48 PM" duration="0:18" delay={0.15} />
        <WABubble from="bot" time="6:48 PM" delay={0.55}>
          <p className="text-slate-500 text-[11px] font-semibold mb-1 uppercase tracking-wide">Transcribed for you</p>
          "Remember to buy milk, eggs, and bread on the way home. Also, schedule dentist appointment for next week."
        </WABubble>
        <WAButtonList delay={0.85} buttons={[{ label: "Save as note" }, { label: "Discard" }]} />
      </WAWallpaper>
    )
  },
  {
    id: "images",
    icon: <ImageIcon className="text-white" size={24} />,
    title: "Photo → Instant Tasks",
    desc: "Snap a photo of a handwritten list, receipt or note. Remore reads it and instantly turns it into real tasks or shopping items — no typing required.",
    color: "bg-cyan-600",
    visual: (
      <WAWallpaper>
        <WASystemPill>Photo → Instant Tasks</WASystemPill>
        <WAImageBubble from="user" time="5:14 PM" delay={0.15}>
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-cyan-100 via-cyan-50 to-amber-50 flex flex-col items-center justify-center gap-2 relative">
            <ImageIcon size={30} className="text-cyan-400/70" />
            <div className="flex flex-col gap-1 w-2/3">
              <div className="h-1.5 rounded-full bg-cyan-900/10 w-full" />
              <div className="h-1.5 rounded-full bg-cyan-900/10 w-4/5" />
              <div className="h-1.5 rounded-full bg-cyan-900/10 w-5/6" />
            </div>
            <span className="text-[10px] text-cyan-700/50 font-medium mt-1">shopping-list.jpg</span>
          </div>
        </WAImageBubble>
        <WABubble from="bot" time="5:14 PM" delay={0.6} className="!max-w-[86%]">
          <p className="mb-2">Got it! I found 3 items and added them to <span className="font-semibold text-cyan-700">Groceries</span> ✅</p>
          <div className="space-y-1.5">
            {["Buy milk", "Buy eggs (12 pack)", "Get avocados"].map((task) => (
              <div key={task} className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <CheckSquare size={13} className="text-cyan-600 flex-shrink-0" />
                <span className="text-[12px] text-slate-700 font-medium">{task}</span>
              </div>
            ))}
          </div>
        </WABubble>
      </WAWallpaper>
    ),
  },
];

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="bg-cream-50 py-16 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <FadeIn>
            <span className="font-doodle text-2xl text-secondary">under the hood</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-ink mt-2 mb-6 tracking-tight">
              Productivity, <br />
              <span className="relative inline-block italic text-primary">
                reimagined.
                <Doodle type="underline" className="absolute -bottom-3 left-0 w-full h-4 text-secondary opacity-60" />
              </span>
            </h2>
            <p className="text-xl text-ink/60 font-medium">
              We stripped away the complexity of project management apps. What's left is pure, chat-based efficiency.
            </p>
          </FadeIn>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT: Scrollable text features */}
          <div className="lg:order-1 space-y-12 lg:space-y-40 py-8 lg:py-12">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
                index={index}
                setActiveFeature={setActiveFeature}
              />
            ))}

            {/* Extra padding at bottom so last item can be centered properly */}
            <div className="h-0 lg:h-64" />
          </div>

          {/* RIGHT: Sticky phone mockup — a real, consistent WhatsApp screen */}
          <div className="hidden lg:flex lg:sticky lg:top-20 lg:order-2 items-start justify-center">
            <div
              className="
                relative
                w-[320px] h-[660px]
                bg-gradient-to-b from-forest-900 to-ink
                rounded-[3rem]
                shadow-2xl shadow-ink/30
                border-[12px] border-forest-900
                overflow-hidden
                ring-1 ring-black/20
              "
            >
              {/* Side buttons for a proper phone silhouette */}
              <div className="absolute top-24 -left-[12px] h-8 w-1 bg-forest-800 rounded-l-md" />
              <div className="absolute top-40 -left-[12px] h-12 w-1 bg-forest-800 rounded-l-md" />
              <div className="absolute top-56 -left-[12px] h-12 w-1 bg-forest-800 rounded-l-md" />
              <div className="absolute top-44 -right-[12px] h-16 w-1 bg-forest-800 rounded-r-md" />

              {/* Notch / Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30" />

              {/* Status bar */}
              <div className="h-8 bg-[#F0F2F5] flex justify-between items-center px-6 text-xs font-semibold text-slate-900 flex-shrink-0">
                <span>9:41</span>
                <div className="flex gap-2">
                  <div className="w-5 h-2 bg-slate-900 rounded-sm" />
                  <div className="w-5 h-2 bg-slate-900 rounded-sm" />
                  <div className="w-8 h-2.5 border border-slate-900 rounded-sm relative">
                    <div className="absolute inset-[2px] bg-slate-900 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Real, constant WhatsApp header — Remore contact, not a per-feature banner */}
              <div className="bg-[#F0F2F5] h-14 flex items-center px-4 gap-3 border-b border-slate-200 flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Logo className="w-10 h-10" animated={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-[14px] leading-tight">Remore</p>
                  <p className="text-[10px] text-slate-500 font-medium">Business Account • Online</p>
                </div>
                <div className="text-slate-400 text-lg">⋮</div>
              </div>

              {/* Content area — fixed height; taller visuals scroll instead of stretching the phone */}
              <div className="h-[478px] overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full"
                  >
                    {features[activeFeature].visual}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-400/60 rounded-full z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FEATURE_MASCOTS: Record<string, { color: MascotColor; pose: MascotPose; prop: MascotProp; size: string; rotate: number }> = {
  natural:  { color: 'sky',    pose: 'wave',        prop: 'question', size: 'w-24 h-24', rotate: -3 },
  memory:   { color: 'violet', pose: 'think',        prop: 'star',     size: 'w-28 h-28', rotate: 2 },
  agenda:   { color: 'sun',    pose: 'happy',        prop: 'coffee',   size: 'w-24 h-24', rotate: -2 },
  lists:    { color: 'green',  pose: 'happy',        prop: 'check',    size: 'w-24 h-24', rotate: 3 },
  sync:     { color: 'violet', pose: 'busy',         prop: 'laptop',   size: 'w-28 h-28', rotate: -2 },
  voice:    { color: 'coral',  pose: 'happy',        prop: 'sparkle',  size: 'w-24 h-24', rotate: 2 },
  images:   { color: 'sky',    pose: 'overwhelmed',  prop: 'stack',    size: 'w-28 h-28', rotate: -3 },
};

const FeatureItem: React.FC<{
    feature: any,
    index: number,
    setActiveFeature: (index: number) => void
}> = ({ feature, index, setActiveFeature }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });
    useTransform(scrollYProgress, (pos) => {
        if (pos > 0 && pos < 1) {
            setActiveFeature(index);
        }
        return pos;
    });
    const mascot = FEATURE_MASCOTS[feature.id] ?? { color: 'green', pose: 'calm', prop: 'none', size: 'w-24 h-24', rotate: 0 };
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-20% 0px -20% 0px" }}
            className="flex flex-col justify-center lg:min-h-[60vh] relative"
        >
            <div className={`absolute -left-12 top-0 w-1 h-full ${feature.color.replace('bg-', 'bg-opacity-20 ')} rounded-full`} />
            <div className="flex items-center gap-4 mb-6">
                <Mascot color={mascot.color} pose={mascot.pose} prop={mascot.prop} className={mascot.size} rotate={mascot.rotate} />
                <div className={`w-9 h-9 rounded-full ${feature.color} flex items-center justify-center shadow-md ring-2 ring-cream-50 text-white flex-shrink-0`}>
                    {feature.icon}
                </div>
            </div>
            <h3 className="font-display text-3xl font-semibold text-ink mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-lg text-ink/60 leading-relaxed font-medium mb-8 max-w-md">{feature.desc}</p>
           
            <div className="flex items-center text-primary font-bold cursor-pointer hover:underline group">
                Learn more <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
            {/* Mobile Visual Fallback */}
            <div className="lg:hidden mt-8 h-[440px] bg-[#EFEAE2] rounded-3xl border border-ink/5 overflow-hidden relative shadow-inner shadow-ink/5">
                 <motion.div 
                   className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-200 rounded-b-md flex justify-center items-end pb-0.5 z-10"
                   initial={{ scale: 0.8 }}
                   whileInView={{ scale: 1 }}
                 >
                   <div className="w-6 h-0.5 bg-slate-300 rounded-full" />
                 </motion.div>
                 <div className="h-full pt-4">
                   {feature.visual}
                 </div>
            </div>
        </motion.div>
    );
};
