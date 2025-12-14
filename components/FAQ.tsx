import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Do I need to install an app?",
    answer: "No! WaBot lives entirely inside WhatsApp. You just chat with our number like you would with a friend."
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
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        </FadeIn>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900">{item.question}</span>
                  {openIndex === index ? (
                    <Minus size={20} className="text-primary flex-shrink-0 ml-4" />
                  ) : (
                    <Plus size={20} className="text-slate-400 flex-shrink-0 ml-4" />
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
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">
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