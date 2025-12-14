import React from 'react';
import { MessageCircle, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900">
                        <MessageCircle size={20} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-bold">Remore</span>
                </div>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                    The AI personal assistant that organizes your life, right inside WhatsApp.
                </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6">Legal</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Massive Text */}
        <div className="border-t border-slate-800 pt-12 pb-12">
            <h1 className="text-[12vw] leading-none font-bold text-slate-800 select-none text-center tracking-tighter">
                REMORE
            </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Remore Inc. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};