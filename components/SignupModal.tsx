import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleFinish = () => {
     onClose();
     setStep(1);
     setPhoneNumber('');
     setOtp('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl overflow-hidden"
        >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
            >
                <X size={20} />
            </button>

            {/* Step 1: Phone Number */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                        <Smartphone size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Get started free</h2>
                    <p className="text-slate-500 mb-6">Enter your WhatsApp number to create your account.</p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
                            <input 
                                type="tel" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <Button 
                            className="w-full" 
                            onClick={handleSendOtp}
                            disabled={!phoneNumber || loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                        </Button>
                        <p className="text-xs text-center text-slate-400 mt-4">
                            By continuing, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
                 <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <div className="w-12 h-12 bg-orange-50 text-secondary rounded-xl flex items-center justify-center mb-6">
                        <Smartphone size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify OTP</h2>
                    <p className="text-slate-500 mb-6">We sent a code to <span className="font-semibold text-slate-900">{phoneNumber}</span></p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Enter Code</label>
                            <input 
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all tracking-widest text-center text-lg font-bold"
                            />
                        </div>
                         <Button 
                            className="w-full" 
                            onClick={handleVerifyOtp}
                            disabled={!otp || loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Verify & Continue"}
                        </Button>
                         <button onClick={() => setStep(1)} className="w-full text-center text-sm text-slate-500 hover:text-primary mt-2">
                            Change number
                        </button>
                    </div>
                </motion.div>
            )}

             {/* Step 3: Success */}
             {step === 3 && (
                 <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">You're all set!</h2>
                    <p className="text-slate-500 mb-8">Start chatting with our bot on WhatsApp now.</p>
                    
                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]" onClick={handleFinish}>
                        Open WhatsApp
                    </Button>
                </motion.div>
            )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};