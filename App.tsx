import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';

const App: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-primary/20 selection:text-primary">
      <Navbar onOpenSignup={openSignup} />
      
      <main>
        <Hero onOpenSignup={openSignup} />
        <SocialProof />
        <HowItWorks />
        <Features />
        <Pricing onOpenSignup={openSignup} />
        <FAQ />
        <FinalCTA onOpenSignup={openSignup} />
      </main>

      <Footer />
      <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />
    </div>
  );
};

export default App;