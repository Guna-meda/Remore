import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import type { Country } from "react-phone-number-input";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  // resend otp
  const [resendTimer, setResendTimer] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

  /* Auto detect country (industry standard) */
const [defaultCountry, setDefaultCountry] = useState<Country>("IN");
const [country, setCountry] = useState<Country>("IN");


 useEffect(() => {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
      if (data?.country_code) {
        setDefaultCountry(data.country_code as Country);
      }
    })
    .catch(() => {});
}, []);


  
  /* Resend OTP countdown */
  
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  /* -------------------------------------------------- */
  /* Send OTP */
  /* -------------------------------------------------- */
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (res.status === 409) {
        setAlreadyRegistered(true);
        setStep(3);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep(2);
      setResendTimer(30); // 30s cooldown
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
        country, 
      }),
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

  const handleClose = () => {
    onClose();
    setStep(1);
    setPhoneNumber(undefined);
    setOtp("");
    setError(null);
    setAlreadyRegistered(false);
    setResendTimer(0);
  };

  if (!isOpen) return null;

return (
  <AnimatePresence>
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
              <Smartphone size={24} />
            </div>

            <h2 className="text-2xl font-bold mb-2">Get started free</h2>
            <p className="text-slate-500 mb-6">
              Enter your WhatsApp number
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!phoneNumber || loading) return;
                handleSendOtp();
              }}
            >
              <PhoneInput
                international
                defaultCountry={defaultCountry}
                value={phoneNumber}
                onChange={setPhoneNumber}
                onCountryChange={(c) => c && setCountry(c)}
                placeholder="Enter phone number"
                className="flex items-center gap-2 mb-4"
                countrySelectProps={{
                  className:
                    "flex items-center gap-1 px-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20",
                }}
                numberInputProps={{
                  className:
                    "w-full px-4 py-3 rounded-xl border border-slate-200 text-base focus:outline-none focus:ring-2 focus:ring-primary/20",
                  autoComplete: "tel",
                }}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!phoneNumber || loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>

            <p className="text-slate-500 mb-6">
              Code sent to <b>{phoneNumber}</b>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!otp || loading) return;
                handleVerifyOtp();
              }}
            >
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border mb-4"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!otp || loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </form>

            {/* RESEND OTP */}
            <button
              disabled={resendTimer > 0}
              onClick={handleSendOtp}
              className="w-full mt-4 text-sm text-slate-500 hover:text-primary disabled:opacity-50"
            >
              {resendTimer > 0
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-2 text-sm text-slate-400"
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

            <h2 className="text-2xl font-bold mb-2">
              {alreadyRegistered
                ? "You're already registered"
                : "You're all set!"}
            </h2>

            <p className="text-slate-500 mb-6">
              Start chatting with Remore on WhatsApp
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] mb-4">
                Open WhatsApp
              </Button>
            </a>

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/${WHATSAPP_NUMBER}`}
              className="mx-auto"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  </AnimatePresence>
);

};
