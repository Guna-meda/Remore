import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, Brain, Sun, RefreshCcw, ArrowRight, User } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

const features = [
  {
    id: "natural",
    icon: <MessageSquare className="text-white" size={24} />,
    title: "Speak Human, Not Robot",
    desc: "Text exactly how you think. 'Remind me to call Mom later' or 'I need to prepare for the meeting'. No complex forms, just natural conversation.",
    color: "bg-blue-600",
    visual: (
      <div className="flex flex-col justify-center h-full p-8 bg-slate-50/50">
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 max-w-[85%]"
            >
                <p className="text-slate-800 text-sm font-medium">Remind me to check the oven in 20 mins.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">10:41 AM</span>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#E7FFDB] p-5 rounded-2xl rounded-tr-sm shadow-sm border border-green-100 self-end ml-auto max-w-[85%]"
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
       <div className="flex flex-col justify-center h-full p-8 bg-slate-50/50 items-center">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-purple-500/10 border border-slate-100"
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
      <div className="flex flex-col justify-center h-full p-8 bg-slate-50/50 items-center">
        <motion.div 
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-orange-500/10 border border-slate-100 max-w-xs relative overflow-hidden"
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
       <div className="flex flex-col justify-center h-full p-8 bg-slate-50/50 items-center">
         <motion.div 
            className="w-full bg-white p-6 rounded-[2rem] shadow-xl shadow-emerald-500/10 border border-slate-100"
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
  }
];

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 md:text-center max-w-3xl mx-auto">
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Scrollable Text Side */}
          <div className="flex flex-col space-y-32 py-12 order-2 lg:order-1">
            {features.map((feature, index) => (
              <FeatureItem 
                key={feature.id} 
                feature={feature} 
                index={index}
                setActiveFeature={setActiveFeature}
              />
            ))}
          </div>

          {/* Sticky Visual Side */}
          <div className="hidden lg:block relative h-full order-1 lg:order-2">
             {/* Changed top-32 to top-24 and reduced height to 650px to fit better in viewports */}
             <div className="sticky top-24 h-[650px] w-full max-w-[380px] mx-auto bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-300 border-[12px] border-slate-900 overflow-hidden ring-1 ring-slate-900/10">
                {/* Status Bar */}
                <div className="h-7 bg-white w-full flex justify-between items-center px-6 text-[10px] font-bold text-slate-900 z-20 relative">
                     <span>9:41</span>
                     <div className="flex gap-1.5">
                         <div className="w-4 h-2.5 bg-slate-900 rounded-[2px]" />
                         <div className="w-4 h-2.5 bg-slate-900 rounded-[2px]" />
                         <div className="w-5 h-2.5 border border-slate-900 rounded-[2px] relative">
                             <div className="absolute inset-0.5 bg-slate-900" />
                         </div>
                     </div>
                </div>

                {/* Dynamic Header */}
                <motion.div 
                    animate={{ backgroundColor: featureColors(activeFeature) }}
                    className="h-24 w-full flex items-end px-6 pb-4 relative z-10 transition-colors duration-500"
                >
                    <div className="flex items-center gap-4 text-white">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {features[activeFeature].icon}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div>
                            <p className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">Current Mode</p>
                            <p className="font-bold text-lg leading-none">{features[activeFeature].title}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="h-full bg-white relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="h-full w-full"
                        >
                            {features[activeFeature].visual}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full z-20" />
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
            className="flex flex-col justify-center min-h-[60vh]"
        >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200 text-white`}>
                {feature.icon}
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8 max-w-md">{feature.desc}</p>
            
            <div className="flex items-center text-primary font-bold cursor-pointer hover:underline group">
                Learn more <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Mobile Visual Fallback */}
            <div className="lg:hidden mt-8 h-80 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden relative shadow-inner">
                 {feature.visual}
            </div>
        </motion.div>
    );
};