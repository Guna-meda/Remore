import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';

interface FinalCTAProps {
    onOpenSignup: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenSignup }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Ready to organize your life?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Join thousands of people who found their peace of mind. It starts with a simple "Hello".
                    </p>
                    <Button size="lg" onClick={onOpenSignup} className="shadow-xl shadow-blue-500/20">
                        Start Your 3-Month Free Trial
                    </Button>
                    <p className="mt-6 text-sm text-slate-400">
                        No credit card required. Cancel anytime.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};