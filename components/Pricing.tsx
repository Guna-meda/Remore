import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "3 months",
    desc: "Perfect to get started.",
    features: ["Unlimited Tasks", "Basic Reminders", "7 Days History"],
    cta: "Start Free Trial",
    variant: "outline" as const
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/ month",
    desc: "For power users.",
    features: ["Everything in Free", "Recurring Tasks", "Calendar Sync", "Voice Notes", "Priority Support"],
    recommended: true,
    cta: "Get Pro",
    variant: "primary" as const
  },
  {
    name: "Yearly",
    price: "$39.99",
    period: "/ year",
    desc: "Best value.",
    features: ["Everything in Pro", "2 Months Free", "Early Access Features"],
    cta: "Go Yearly",
    variant: "outline" as const
  }
];

interface PricingProps {
  onOpenSignup: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenSignup }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-lg">Start for free, upgrade when you love it.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className={`relative ${plan.recommended ? 'md:-mt-8 md:mb-8' : ''}`}>
               <motion.div 
                 whileHover={{ y: -8 }}
                 className={`p-8 rounded-3xl border ${plan.recommended ? 'bg-slate-800 border-primary shadow-2xl shadow-primary/20' : 'bg-slate-900/50 border-slate-700'} flex flex-col h-full`}
               >
                 {plan.recommended && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     Most Popular
                   </div>
                 )}
                 <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                 <div className="flex items-baseline mb-2">
                   <span className="text-4xl font-bold">{plan.price}</span>
                   <span className="text-slate-400 ml-2 text-sm">{plan.period}</span>
                 </div>
                 <p className="text-slate-400 text-sm mb-8">{plan.desc}</p>
                 
                 <div className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feat, fIdx) => (
                     <div key={fIdx} className="flex items-start space-x-3">
                       <div className="mt-1 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                         <Check size={12} className="text-primary" />
                       </div>
                       <span className="text-slate-300 text-sm">{feat}</span>
                     </div>
                   ))}
                 </div>

                 <Button 
                    variant={plan.recommended ? 'primary' : 'outline'} 
                    className="w-full"
                    onClick={onOpenSignup}
                 >
                   {plan.cta}
                 </Button>
               </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};