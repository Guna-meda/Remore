import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './ui/Mascot';

interface NavbarProps {
  onOpenSignup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSignup }) => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Product', href: '#features' },
    { name: 'Why Remore', href: '#compare' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 inset-x-0 max-w-5xl mx-auto z-50 px-6 hidden md:block"
      >
        <div className="bg-cream-50/85 backdrop-blur-xl border border-ink/5 shadow-xl shadow-ink/5 rounded-full px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <Logo className="w-9 h-9 group-hover:scale-105 transition-transform duration-300" />
              <span className="text-lg font-display font-semibold tracking-tight text-ink">Remore</span>
            </a>

            {/* Desktop Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink/60 hover:text-ink font-medium transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={onOpenSignup} className="rounded-full px-6">
                Get Started
              </Button>
            </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar (Simple Top Bar) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-ink/5 p-4 flex justify-between items-center">
         <a href="#" className="flex items-center space-x-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-display font-semibold tracking-tight text-ink">Remore</span>
         </a>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-ink">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: '100vh' }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed inset-0 z-40 bg-cream-50 pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-ink font-medium text-2xl font-display"
              >
                {link.name}
              </a>
            ))}
            <hr className="border-ink/10" />
            <Button className="w-full py-4 text-lg" onClick={() => {
              setMobileMenuOpen(false);
              onOpenSignup();
            }}>
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};
