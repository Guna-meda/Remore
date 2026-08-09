import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './ui/Mascot';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-cream-100 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
                <div className="flex items-center space-x-3 mb-8">
                    <Logo className="w-10 h-10" />
                    <span className="text-2xl font-display font-semibold">Remore</span>
                </div>
                <p className="text-cream-100/50 text-lg max-w-sm leading-relaxed">
                    The AI personal assistant that organizes your life, right inside WhatsApp.
                </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="font-display font-semibold text-cream-50 mb-6">Product</h4>
                    <ul className="space-y-4 text-cream-100/50">
                        <li><a href="#features" className="hover:text-cream-50 transition-colors">Features</a></li>
                        <li><a href="#pricing" className="hover:text-cream-50 transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-cream-50 transition-colors">Testimonials</a></li>
                        <li><a href="#faq" className="hover:text-cream-50 transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-display font-semibold text-cream-50 mb-6">Legal</h4>
                    <ul className="space-y-4 text-cream-100/50">
                        <li><a href="/privacy.html" className="hover:text-cream-50 transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-cream-50 transition-colors">Terms</a></li>
                        <li><a href="#" className="hover:text-cream-50 transition-colors">Security</a></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Massive Text */}
        <div className="border-t border-cream-100/10 pt-12 pb-12">
            <h1 className="text-[12vw] leading-none font-display font-semibold text-cream-100/[0.06] select-none text-center tracking-tighter">
                REMORE
            </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-cream-100/40">
            <p>© {new Date().getFullYear()} Remore Inc. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-cream-50 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-cream-50 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-cream-50 transition-colors"><Linkedin size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};
