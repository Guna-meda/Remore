import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, Zap, UserCheck } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

const steps = [
  {
    icon: <UserCheck size={24} />,
    title: "Sign Up & Verify",
    desc: "Enter your number and verify with a simple OTP."
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Chat with Bot",
    desc: "Send a message like 'Remind me to buy milk'."
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Action",
    desc: "The bot saves the task and sets a reminder instantly."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Stay Organized",
    desc: "Get notified on time, every time. Never forget again."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No complex onboarding. It takes less than 30 seconds to get started.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Arrow Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-300 -z-10" />

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="up">
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-lg shadow-slate-200 border border-slate-100 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl relative z-10">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-500 border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed px-4">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};