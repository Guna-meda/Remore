import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Calendar, ArrowRight, ShieldCheck, MessageCircle, Signal, Wifi, Battery } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { Doodle } from './ui/Doodle';

interface HeroProps {
  onOpenSignup: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSignup }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={targetRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#F8FAFC] min-h-[90vh] flex items-center">
      {/* Background decoration - More subtle */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 w-full">
        
        {/* Text Content */}
        <div className="max-w-2xl relative order-1 lg:order-1">
          {/* Top Doodle */}
          <div className="absolute -top-12 -left-8 hidden md:block">
             <Doodle type="star" className="w-12 h-12 text-yellow-400" delay={0.2} />
          </div>
          
          <FadeIn>
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-600">Remore is live on WhatsApp</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-slate-900">
              Your Second Brain, <br />
              <span className="relative inline-block text-primary">
                Inside WhatsApp.
                <Doodle type="underline" className="absolute -bottom-2 left-0 w-full h-4 text-primary opacity-30" delay={0.5} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed max-w-lg font-medium">
              Offload your mental clutter. Daily agendas, smart follow-ups, and important notes managed through a simple chat.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8 relative">
              
              {/* Arrow pointing at input */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 hidden lg:block pointer-events-none">
                 <Doodle type="arrow-curved" className="w-full h-full text-slate-300 rotate-[130deg]" delay={0.8} />
              </div>

              <div className="relative w-full sm:w-auto">
                <input 
                  type="text" 
                  placeholder="Enter your phone number" 
                  className="w-full sm:w-72 pl-5 pr-4 py-4 rounded-full border border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 focus:border-primary outline-none transition-all shadow-lg shadow-slate-100"
                />
              </div>
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2 shadow-xl shadow-blue-500/20" onClick={onOpenSignup}>
                <span>Start Free Trial</span>
                <ArrowRight size={18} />
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
              <ShieldCheck size={16} className="text-green-500" />
              <span>No credit card required • 14-day free trial</span>
            </div>
          </FadeIn>
        </div>

        {/* Visual Content (Phone Mockup) */}
        <motion.div 
            style={{ y }}
            className="relative block order-2 lg:order-2 perspective-1000 mt-12 lg:mt-0"
        >
            {/* The Phone Container */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-[290px] h-[580px] md:w-[350px] md:h-[700px] bg-slate-950 rounded-[3rem] md:rounded-[3.5rem] shadow-[0_0_0_8px_#1e293b,0_0_0_10px_#475569,0_30px_60px_-10px_rgba(0,0,0,0.6)] md:shadow-[0_0_0_10px_#1e293b,0_0_0_12px_#475569,0_30px_60px_-10px_rgba(0,0,0,0.6)] z-20"
          >
             {/* Side Buttons (Physical) */}
             <div className="absolute top-28 -left-[10px] md:-left-[14px] h-8 w-1 bg-slate-700 rounded-l-md shadow-sm"></div> {/* Mute */}
             <div className="absolute top-44 -left-[10px] md:-left-[14px] h-14 w-1 bg-slate-700 rounded-l-md shadow-sm"></div> {/* Vol Up */}
             <div className="absolute top-64 -left-[10px] md:-left-[14px] h-14 w-1 bg-slate-700 rounded-l-md shadow-sm"></div> {/* Vol Down */}
             <div className="absolute top-48 -right-[10px] md:-right-[14px] h-20 w-1 bg-slate-700 rounded-r-md shadow-sm"></div> {/* Power */}

            {/* Screen Container */}
            <div className="w-full h-full bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative flex flex-col z-10 border-[6px] border-slate-950">
              
              {/* Top Status Bar Area (Inside Screen) */}
              <div className="h-12 w-full flex justify-between items-start pt-4 px-7 text-slate-900 z-30 absolute top-0 left-0 right-0 bg-transparent">
                  <span className="text-[13px] font-bold tracking-wide">9:41</span>
                  <div className="flex items-center gap-1.5">
                      <Signal size={14} fill="currentColor" />
                      <Wifi size={14} />
                      <div className="relative">
                          <Battery size={18} />
                          <div className="absolute inset-0 bg-current opacity-40 w-[60%] h-[60%] top-[20%] left-[10%] rounded-[1px]"></div>
                      </div>
                  </div>
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-[28px] w-[96px] bg-black rounded-full z-40 flex items-center justify-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-900/50 absolute -top-10 blur-xl"></div>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-[#F0F2F5]/95 backdrop-blur-md h-24 w-full flex items-end pb-3 px-4 border-b border-slate-200 z-20 pt-10">
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <MessageCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-base leading-tight">Remore</div>
                    <div className="text-[11px] text-slate-500 font-medium">Business Account • Online</div>
                  </div>
                  <div className="text-primary text-2xl mb-1">...</div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 space-y-4 overflow-hidden relative bg-[#EFEAE2] flex flex-col">
                {/* Chat Wallpaper Pattern */}
                <div className="absolute inset-0 opacity-[0.06]" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                    }}
                ></div>

                {/* Messages */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="self-end bg-[#E7FFDB] p-3 rounded-xl rounded-tr-none shadow-[0_1px_2px_rgba(0,0,0,0.1)] max-w-[90%] ml-auto relative group"
                >
                  <p className="text-[13px] md:text-[14px] text-slate-900 leading-snug">Add "Submit quarterly report" to my tasks.</p>
                  <span className="text-[10px] text-slate-500/80 block text-right mt-1.5 font-medium">10:42 AM <span className="text-[#53bdeb] ml-0.5">✓✓</span></span>
                  {/* Tail */}
                  <div className="absolute -top-0 -right-2 w-4 h-4 bg-[#E7FFDB]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5 }}
                  className="self-start bg-white p-3 rounded-xl rounded-tl-none shadow-[0_1px_2px_rgba(0,0,0,0.1)] max-w-[90%] relative"
                >
                  <p className="text-[13px] md:text-[14px] text-slate-900 leading-snug">Done. I've added <b>"Submit quarterly report"</b> to your list. 📝</p>
                  <span className="text-[10px] text-slate-400 block text-right mt-1.5 font-medium">10:42 AM</span>
                   {/* Tail */}
                   <div className="absolute -top-0 -left-2 w-4 h-4 bg-white transform scale-x-[-1]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                </motion.div>

                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.5 }}
                  className="self-end bg-[#E7FFDB] p-3 rounded-xl rounded-tr-none shadow-[0_1px_2px_rgba(0,0,0,0.1)] max-w-[90%] ml-auto relative mt-2"
                >
                  <p className="text-[13px] md:text-[14px] text-slate-900 leading-snug">Brainstorming with Mike tomorrow at 10am</p>
                  <span className="text-[10px] text-slate-500/80 block text-right mt-1.5 font-medium">10:43 AM <span className="text-[#53bdeb] ml-0.5">✓✓</span></span>
                  <div className="absolute -top-0 -right-2 w-4 h-4 bg-[#E7FFDB]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                </motion.div>
                
                 <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 6 }}
                  className="self-start bg-white p-2 rounded-xl rounded-tl-none shadow-[0_1px_2px_rgba(0,0,0,0.1)] max-w-[95%] relative"
                >
                  <div className="flex items-center space-x-3 mb-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex flex-col items-center justify-center text-red-500 font-bold flex-shrink-0 border border-red-100">
                        <span className="text-[8px] uppercase tracking-wider">MAR</span>
                        <span className="text-base leading-none">12</span>
                    </div>
                    <div className="text-left">
                        <div className="text-[13px] font-bold text-slate-900">Brainstorming</div>
                        <div className="text-[11px] text-slate-500">10:00 AM - 11:00 AM</div>
                    </div>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-slate-900 px-1 pb-1">Meeting created & invite sent. 📅</p>
                  <span className="text-[10px] text-slate-400 block text-right mt-1 font-medium pr-1">10:43 AM</span>
                  <div className="absolute -top-0 -left-2 w-4 h-4 bg-white transform scale-x-[-1]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                </motion.div>
              </div>

              {/* Input Area */}
              <div className="bg-[#F0F2F5] p-2 flex items-center space-x-2 pb-8 pt-3 border-t border-slate-200 z-30">
                <div className="w-8 h-8 rounded-full text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer">+</div>
                <div className="flex-1 h-9 bg-white rounded-full px-4 text-[13px] md:text-[15px] text-slate-400 flex items-center shadow-sm border border-slate-100">Type a message...</div>
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:bg-primaryHover transition-colors cursor-pointer">
                    <ArrowRight size={18} />
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full z-50"></div>
            </div>

            {/* Reflection Overlay */}
             <div className="absolute inset-0 rounded-[3rem] md:rounded-[3.5rem] pointer-events-none z-50 ring-1 ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-40 rounded-[3rem] md:rounded-[3.5rem]"></div>
             </div>

          </motion.div>

          {/* Floating Elements - Z-Index Fix - Hidden on Mobile to prevent clutter */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-48 -left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-white hidden md:flex items-center gap-4 max-w-[240px] z-30"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Task Complete</p>
              <p className="text-xs text-slate-500">Groceries added to list</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-32 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-white hidden md:flex items-center gap-4 max-w-[240px] z-30"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Upcoming Event</p>
              <p className="text-xs text-slate-500">Design Review in 10m</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};