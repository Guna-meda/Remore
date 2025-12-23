import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, Brain, Sun, RefreshCcw, ArrowRight, User, Calendar, Mic, Image as ImageIcon, ShoppingBag, Camera, CheckSquare } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

const features = [
  {
    id: "natural",
    icon: <MessageSquare className="text-white" size={24} />,
    title: "Speak Human, Not Robot",
    desc: "Text exactly how you think. 'Remind me to call Mom later' or 'I need to prepare for the meeting'. No complex forms, just natural conversation.",
    color: "bg-blue-600",
    visual: (
      <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-blue-50/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)]" />
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-2xl rounded-tl-sm shadow-md border border-slate-100/50 backdrop-blur-sm max-w-[85%]"
            >
                <p className="text-slate-800 text-sm font-medium">Remind me to check the oven in 20 mins.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">10:41 AM</span>
            </motion.div>
           
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#E7FFDB] p-5 rounded-2xl rounded-tr-sm shadow-md border border-green-100/50 backdrop-blur-sm self-end ml-auto max-w-[85%]"
            >
                <p className="text-slate-900 text-sm">Got it. Timer set for 20 minutes. 🍕</p>
                <span className="text-[10px] text-green-700/60 mt-2 block text-right">10:41 AM</span>
            </motion.div>
        </div>
      </div>
    )
  },
  {
    id: "memory",
    icon: <Brain className="text-white" size={24} />,
    title: "A Brain That Remembers",
    desc: "Store important notes, preferences, and context. Ask 'What did I say about the Q3 budget?' and Remore recalls it instantly.",
    color: "bg-purple-600",
    visual: (
       <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-purple-50/20 items-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(147,51,234,0.1),transparent)]" />
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-purple-500/10 border border-slate-100/50 backdrop-blur-md"
         >
             <div className="flex items-start gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                     <Brain size={20} />
                 </div>
                 <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600">
                     What was the door code for the Airbnb?
                 </div>
             </div>
            
             <div className="flex items-start gap-4 justify-end">
                 <div className="bg-purple-50 p-3 rounded-2xl rounded-tr-none text-sm text-slate-800 font-medium border border-purple-100">
                     You noted it as <span className="font-bold text-purple-700">8842#</span> last Tuesday. 🏠
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                     <User size={20} />
                 </div>
             </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "agenda",
    icon: <Sun className="text-white" size={24} />,
    title: "Stress-Free Daily Agenda",
    desc: "Receive a calm morning briefing and gentle nudges for unfinished tasks. We help you stay on track without the anxiety of constant alarms.",
    color: "bg-orange-500",
    visual: (
      <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-orange-50/20 items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.1),transparent)]" />
        <motion.div
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-orange-500/10 border border-slate-100/50 backdrop-blur-md max-w-xs relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-400"></div>
            <h4 className="font-bold text-slate-900 mb-2 text-lg">Good Morning! ☀️</h4>
            <p className="text-slate-500 text-sm mb-6">Here is your flow for today:</p>
           
            <div className="space-y-4">
                <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-orange-500 mt-1">09:00</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Deep Work</p>
                        <p className="text-xs text-slate-400">Finish proposal</p>
                    </div>
                </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-slate-400 mt-1">11:30</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Team Sync</p>
                        <p className="text-xs text-slate-400">Zoom</p>
                    </div>
                </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-slate-400 mt-1">14:00</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Call Supplier</p>
                        <p className="text-xs text-slate-400">Follow up on invoice</p>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "recover",
    icon: <RefreshCcw className="text-white" size={24} />,
    title: "Smart Rescheduling",
    desc: "Missed a task? No problem. Remore suggests the best time to reschedule based on your flow, ensuring nothing falls through the cracks.",
    color: "bg-emerald-500",
    visual: (
       <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-emerald-50/20 items-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]" />
         <motion.div
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-emerald-500/10 border border-slate-100/50 backdrop-blur-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
         >
             <div className="flex items-start gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                     <RefreshCcw size={20} />
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-sm text-slate-600 leading-relaxed">
                     Looks like you missed <span className="font-semibold text-slate-900">"Gym"</span> this morning. Should I move it to <span className="font-semibold text-emerald-600">tomorrow at 7 AM?</span>
                 </div>
             </div>
             <div className="flex gap-3 pl-14">
                 <button className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors">
                     Yes, move it
                 </button>
                 <button className="bg-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                     Skip
                 </button>
             </div>
         </motion.div>
      </div>
    )
  },
  {
    id: "sync",
    icon: <Calendar className="text-white" size={24} />,
    title: "Seamless Google Calendar Sync",
    desc: "Effortlessly integrate your tasks, reminders, and events with Google Calendar. Stay perfectly in sync across all your devices without manual updates.",
    color: "bg-indigo-600",
    visual: (
      <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-indigo-50/20 items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.1),transparent)]" />
        <motion.div
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-indigo-500/10 border border-slate-100/50 backdrop-blur-md max-w-xs relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400"></div>
            <h4 className="font-bold text-slate-900 mb-2 text-lg">Calendar Sync Active 🔄</h4>
            <p className="text-slate-500 text-sm mb-6">Your events are now in perfect harmony:</p>
           
            <div className="space-y-4">
                <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-indigo-500 mt-1">10:00</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Client Meeting</p>
                        <p className="text-xs text-slate-400">Synced from Google</p>
                    </div>
                </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-slate-400 mt-1">13:00</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Lunch Break</p>
                        <p className="text-xs text-slate-400">Added in Remore</p>
                    </div>
                </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-xs font-bold text-slate-400 mt-1">15:30</span>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">Project Review</p>
                        <p className="text-xs text-slate-400">Synced from Google</p>
                    </div>
                </div>
            </div>
            <motion.div 
              className="absolute bottom-4 right-4 text-indigo-600 text-xs font-medium flex items-center gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar size={12} /> Syncing...
            </motion.div>
        </motion.div>
      </div>
    )
  },
  {
    id: "voice",
    icon: <Mic className="text-white" size={24} />,
    title: "Voice-Powered Notes",
    desc: "Capture thoughts instantly with voice notes. Automatic transcription turns your spoken ideas into organized, searchable text in your workflow.",
    color: "bg-pink-500",
    visual: (
       <div className="flex flex-col justify-center h-full p-8 bg-gradient-to-br from-slate-50/50 to-pink-50/20 items-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.1),transparent)]" />
         <motion.div
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-pink-500/10 border border-slate-100/50 backdrop-blur-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
         >
             <div className="flex items-center justify-center mb-6">
                 <motion.div 
                   className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600"
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 >
                     <Mic size={28} />
                 </motion.div>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl text-sm text-slate-600 leading-relaxed mb-4">
                 Transcribing: "Remember to buy milk, eggs, and bread on the way home. Also, schedule dentist appointment for next week."
             </div>
             <div className="flex gap-3 justify-center">
                 <button className="bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                     Save Note
                 </button>
                 <button className="bg-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                     Cancel
                 </button>
             </div>
             <div className="mt-4 flex justify-center gap-1">
               {[...Array(5)].map((_, i) => (
                 <motion.div 
                   key={i}
                   className="w-2 h-8 bg-pink-300 rounded-full"
                   animate={{ height: [8, Math.random() * 24 + 8, 8] }}
                   transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                 />
               ))}
             </div>
         </motion.div>
      </div>
    )
  },
{
  id: "images",
  icon: <ImageIcon className="text-white" size={24} />,
  title: "Photo → Instant Tasks",
  desc: "Snap a photo of a handwritten list, receipt or note. Remore reads it and instantly turns it into real tasks or shopping items — no typing required.",
  color: "bg-cyan-600",
  visual: (
    <div className="h-full bg-white p-6 flex flex-col">
      {/* Photo Upload Section */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
            <ImageIcon size={16} />
          </div>
          <span className="font-medium text-slate-800 text-sm">Uploaded Photo</span>
        </div>

        <div className="p-5 bg-slate-50 aspect-[4/3] relative">
          {/* Placeholder for real photo */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-medium">
            Handwritten shopping list / receipt
          </div>

          {/* Simple, clean detected highlights (minimal style) */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { top: "22%", label: "Milk" },
              { top: "36%", label: "Eggs x12" },
              { top: "50%", label: "Avocados" },
            ].map((item, i) => (
              <div
                key={i}
                className="absolute left-6 right-6 h-9 bg-cyan-500/10 border border-cyan-400/40 rounded-md flex items-center px-3"
                style={{ top: item.top }}
              >
                <span className="text-xs font-medium text-cyan-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resulting Tasks - Very clean & simple */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <CheckSquare size={16} className="text-cyan-600" />
          Tasks Created
        </h4>

        <div className="space-y-2.5">
          {["Buy milk", "Buy eggs (12 pack)", "Get avocados"].map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100"
>
              <div className="w-5 h-5 rounded-md border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-sm" />
              </div>
              <span className="text-sm text-slate-800 font-medium">{task}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-4">
          4 items added to "Groceries" • Ready to shop
        </p>
      </div>
    </div>
  ),
},
];

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="bg-white py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Productivity, <br />
              <span className="text-slate-400">Reimagined.</span>
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              We stripped away the complexity of project management apps. What's left is pure, chat-based efficiency.
            </p>
          </FadeIn>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT: Scrollable text features */}
          <div className="lg:order-1 space-y-32 lg:space-y-40 py-8 lg:py-12">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
                index={index}
                setActiveFeature={setActiveFeature}
              />
            ))}

            {/* Extra padding at bottom so last item can be centered properly */}
            <div className="h-32 lg:h-64" />
          </div>

          {/* RIGHT: Sticky phone mockup */}
          <div className="hidden lg:block lg:sticky lg:top-12 lg:order-2 h-[720px] xl:h-[760px]">
            <div 
              className="
                relative 
                w-full max-w-[380px] mx-auto 
                bg-gradient-to-b from-slate-900 to-black 
                rounded-[3rem] 
                shadow-2xl shadow-slate-400/30 
                border-[14px] border-slate-900 
                overflow-hidden
                ring-1 ring-slate-950/20
              "
            >
              {/* Notch / Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30" />

              {/* Status bar */}
              <div className="h-8 bg-white flex justify-between items-center px-6 text-xs font-semibold text-slate-900">
                <span>9:41</span>
                <div className="flex gap-2">
                  <div className="w-5 h-2 bg-slate-900 rounded-sm" />
                  <div className="w-5 h-2 bg-slate-900 rounded-sm" />
                  <div className="w-8 h-2.5 border border-slate-900 rounded-sm relative">
                    <div className="absolute inset-[2px] bg-slate-900 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Dynamic header */}
              <motion.div
                animate={{ backgroundColor: featureColors(activeFeature) }}
                transition={{ duration: 0.6 }}
                className="h-20 flex items-end px-6 pb-4 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {features[activeFeature].icon}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wider font-semibold">Feature</p>
                    <p className="font-bold text-lg leading-tight">
                      {features[activeFeature].title}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content area */}
              <div className="bg-white h-[calc(100%-28px-80px)] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
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

const featureColors = (index: number) => {
    switch(index) {
        case 0: return '#2563EB'; // Blue
        case 1: return '#9333EA'; // Purple
        case 2: return '#F97316'; // Orange
        case 3: return '#10B981'; // Emerald
        case 4: return '#4F46E5'; // Indigo
        case 5: return '#EC4899'; // Pink
        case 6: return '#06B6D4'; // Cyan
        default: return '#2563EB';
    }
}

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
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-20% 0px -20% 0px" }}
            className="flex flex-col justify-center min-h-[60vh] relative"
        >
            <div className={`absolute -left-12 top-0 w-1 h-full ${feature.color.replace('bg-', 'bg-opacity-20 ')} rounded-full`} />
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200/50 ring-1 ring-white/20 text-white`}>
                {feature.icon}
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8 max-w-md">{feature.desc}</p>
           
            <div className="flex items-center text-primary font-bold cursor-pointer hover:underline group">
                Learn more <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
            {/* Mobile Visual Fallback */}
            <div className="lg:hidden mt-8 h-80 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden relative shadow-inner shadow-slate-200/50">
                 <motion.div 
                   className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-200 rounded-b-md flex justify-center items-end pb-0.5"
                   initial={{ scale: 0.8 }}
                   whileInView={{ scale: 1 }}
                 >
                   <div className="w-6 h-0.5 bg-slate-300 rounded-full" />
                 </motion.div>
                 {feature.visual}
            </div>
        </motion.div>
    );
};