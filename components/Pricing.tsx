import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { Mascot } from './ui/Mascot';
import { Doodle } from './ui/Doodle';

type Cycle = 'monthly' | 'annual';

const plans = [
  {
    name: "Essentials",
    desc: "Everything you need to stop forgetting things.",
    monthly: 4.99,
    annual: 3.99,
    features: ["Unlimited reminders", "Smart memory", "Calendar sync", "Tasks & lists", "Photo → instant tasks"],
    cta: "Start with Essentials",
    color: 'sky' as const,
    pose: 'sit' as const,
    prop: 'check' as const,
    rotate: -3,
  },
  {
    name: "Complete",
    desc: "Essentials, plus your voice and your mornings.",
    monthly: 8.99,
    annual: 6.99,
    features: ["Everything in Essentials", "Voice notes & transcription", "Daily morning brief", "Priority support"],
    recommended: true,
    cta: "Get Complete",
    color: 'coral' as const,
    pose: 'happy' as const,
    prop: 'star' as const,
    rotate: 3,
  },
];

interface PricingProps {
  onOpenSignup: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenSignup }) => {
  const [cycle, setCycle] = useState<Cycle>('annual');

  return (
    <section id="pricing" className="py-24 md:py-32 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-10 right-10 opacity-30 hidden md:block">
        <Doodle type="star" className="w-12 h-12 text-sun" />
      </div>
      <div className="absolute bottom-16 left-10 opacity-20 hidden md:block -rotate-6">
        <Doodle type="squiggle" className="w-20 h-6 text-cream-100" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <FadeIn>
            <span className="font-doodle text-2xl text-sun">no surprises</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 mt-2 tracking-tight text-cream-50">Simple, transparent pricing</h2>
            <p className="text-cream-100/70 text-lg">Two plans. No hidden tiers, no fine print.</p>
          </FadeIn>
        </div>

        {/* Billing toggle */}
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className={`text-sm font-semibold transition-colors ${cycle === 'monthly' ? 'text-cream-50' : 'text-cream-100/50'}`}>
              Monthly
            </span>
            <button
              onClick={() => setCycle(cycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-8 rounded-full bg-cream-50/15 border border-cream-50/20 flex items-center px-1 flex-shrink-0"
              aria-label="Toggle billing cycle"
            >
              <motion.span
                className="w-6 h-6 rounded-full bg-secondary shadow-md"
                animate={{ x: cycle === 'annual' ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors flex items-center gap-2 ${cycle === 'annual' ? 'text-cream-50' : 'text-cream-100/50'}`}>
              Annually
              <span className="bg-sun/20 text-sun text-[11px] font-bold px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {plans.map((plan, idx) => {
            const price = cycle === 'monthly' ? plan.monthly : plan.annual;
            return (
              <FadeIn key={plan.name} delay={idx * 0.1} className={`relative ${plan.recommended ? 'md:-mt-4' : 'md:mt-4'}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`p-8 rounded-[2rem] border flex flex-col h-full bg-cream-50 text-ink ${plan.recommended ? 'border-secondary shadow-2xl shadow-secondary/20' : 'border-ink/5 shadow-lg shadow-ink/5'}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                      Most Popular
                    </div>
                  )}
                  <Mascot color={plan.color} pose={plan.pose} prop={plan.prop} rotate={plan.rotate} className="w-16 h-16 mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2 text-ink">{plan.name}</h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={cycle}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-display font-semibold text-ink"
                      >
                        ${price.toFixed(2)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-ink/50">/ month</span>
                  </div>
                  <p className="text-xs text-ink/40 mb-6">
                    {cycle === 'annual' ? `Billed $${(price * 12).toFixed(2)} annually` : 'Billed monthly, cancel anytime'}
                  </p>
                  <p className="text-sm text-ink/60 mb-8">{plan.desc}</p>

                  <div className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span className="text-sm text-ink/70">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    className={`w-full ${!plan.recommended ? '!bg-ink !text-cream-50 hover:!bg-ink/85' : ''}`}
                    onClick={onOpenSignup}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-cream-100/50 text-sm mt-10">
            No credit card required to try it. Cancel anytime from the chat.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
