import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

const testimonials = [
  { name: "Alex M.", text: "This bot actually saved my marriage. I never forget dates now. 😂", role: "Product Manager" },
  { name: "Sarah J.", text: "It's so much faster than opening Todoist. Just text and done.", role: "Freelancer" },
  { name: "David K.", text: "The voice transcription is uncannily accurate. Love it.", role: "Architect" },
  { name: "Emily R.", text: "I organized my entire wedding using just this bot.", role: "Teacher" },
  { name: "Michael B.", text: "Finally, a task manager that doesn't feel like work.", role: "Developer" },
  { name: "Jessica T.", text: "My ADHD brain thanks you. The reminders are a lifesaver.", role: "Designer" },
  { name: "Ryan P.", text: "Simplicity at its finest. No clutter, just tasks.", role: "Founder" },
  { name: "Chloe W.", text: "I use it for grocery lists and random thoughts. It's perfect.", role: "Writer" },
  { name: "James L.", text: "The onboarding was literally 10 seconds. Insane.", role: "Consultant" }
];

const Column = ({ 
    testimonialGroup, 
    speed = 20, 
    direction = "up", 
    className = "" 
}: { 
    testimonialGroup: typeof testimonials, 
    speed?: number, 
    direction?: "up" | "down",
    className?: string
}) => {
    return (
        <div className={`relative h-[400px] md:h-[600px] overflow-hidden mask-gradient-y pointer-events-none ${className}`}>
             {/* Gradient Masks */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>

            <motion.div 
                animate={{ y: direction === "up" ? [0, -1000] : [-1000, 0] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-6"
            >
                {[...testimonialGroup, ...testimonialGroup, ...testimonialGroup].map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl rounded-tr-sm shadow-sm border border-slate-100 max-w-sm mx-auto w-full">
                        <div className="flex items-center gap-1 mb-2">
                             {[1, 2, 3, 4, 5].map((s) => (
                                 <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />
                             ))}
                        </div>
                        <p className="text-slate-800 text-sm font-medium leading-relaxed mb-4">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">{t.name}</p>
                                <p className="text-[10px] text-slate-400">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeIn>
                <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-full mb-6">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-yellow-700">Loved by 2,000+ early adopters</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    People are trading their <br/> complex apps for <span className="text-primary">a simple chat.</span>
                </h2>
                <p className="text-lg text-slate-600">
                    See what the community is saying about switching to Remore.
                </p>
            </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
            <Column testimonialGroup={testimonials.slice(0, 3)} speed={45} />
            <Column testimonialGroup={testimonials.slice(3, 6)} speed={60} direction="down" className="hidden md:block" />
            <Column testimonialGroup={testimonials.slice(6, 9)} speed={50} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};