import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { FAQItem } from '../types';
import { Mascot } from './ui/Mascot';
import { Doodle } from './ui/Doodle';

const faqData: FAQItem[] = [
  {
    question: "Do I need to install an app?",
    answer: "No! Remore lives entirely inside WhatsApp. You just chat with our number like you would with a friend."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. We use end-to-end encryption for processing messages. We do not sell your personal data to third parties."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime directly from the chat menu or this website. No questions asked."
  },
  {
    question: "How do I list my tasks?",
    answer: "Simply ask 'What are my tasks for today?' or 'Show my list'. You can also mark tasks as done by replying with the task number."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream-100">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <Mascot color="sky" pose="sit" prop="question" className="w-20 h-20 mx-auto mb-4" rotate={-3} />
          <span className="font-doodle text-2xl text-secondary block text-center mb-1 relative">
            still curious?
            <Doodle type="squiggle" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 text-secondary opacity-50" />
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-ink mb-12 tracking-tight relative inline-block w-full">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-cream-50 rounded-2xl border border-ink/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-ink">{item.question}</span>
                  {openIndex === index ? (
                    <Minus size={20} className="text-primary flex-shrink-0 ml-4" />
                  ) : (
                    <Plus size={20} className="text-ink/30 flex-shrink-0 ml-4" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-ink/60 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};