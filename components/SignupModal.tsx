import React, { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          otp,
          country: country.value // ISO code like "IN"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onClose();
    setStep(1);
    setPhoneNumber("");
    setOtp("");
    setCountry(null);
    setError(null);
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
          className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50"
          >
            <X size={20} />
          </button>

          {/* ERROR */}
          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Get started free
              </h2>
              <p className="text-slate-500 mb-6">
                Enter your WhatsApp number to create your account.
              </p>

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 555 000 0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 mb-4"
              />

              <Button
                className="w-full"
                onClick={handleSendOtp}
                disabled={!phoneNumber || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
              </Button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Verify OTP
              </h2>

              <p className="text-slate-500 mb-6">
                We sent a code to{" "}
                <span className="font-semibold">{phoneNumber}</span>
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-slate-200 mb-4"
              />

              <Select
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Country or region"
                isSearchable
              />

              <Button
                className="w-full mt-4"
                onClick={handleVerifyOtp}
                disabled={!otp || !country || loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verify & Continue"
                )}
              </Button>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-3 text-sm text-slate-500 hover:text-primary"
              >
                Change number
              </button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                You're all set!
              </h2>
              <p className="text-slate-500 mb-8">
                Start chatting with our bot on WhatsApp.
              </p>

              <Button
                className="w-full bg-[#25D366] hover:bg-[#128C7E]"
                onClick={handleFinish}
              >
                Open WhatsApp
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
