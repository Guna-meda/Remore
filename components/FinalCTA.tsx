import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { Mascot } from './ui/Mascot';

interface FinalCTAProps {
    onOpenSignup: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenSignup }) => {
    return (
        <section className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -mt-4">
                <Mascot color="green" pose="wave" className="w-20 h-20" float />
            </div>
            <div className="max-w-5xl mx-auto px-6 text-center pt-16">
                <FadeIn>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-6 tracking-tight">
                        Ready to organize your life?
                    </h2>
                    <p className="text-xl text-ink/60 mb-10 max-w-2xl mx-auto">
                        Join thousands of people who found their peace of mind. It starts with a simple "Hello".
                    </p>
                    <Button size="lg" onClick={onOpenSignup} className="">
                        Start Your 7-Day Free Trial
                    </Button>
                    <p className="mt-6 text-sm text-ink/40">
                        No credit card required. Cancel anytime.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};