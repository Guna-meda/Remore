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
  /**
   * step 1 → enter phone
   * step 2 → waiting for WhatsApp YES
   * step 3 → success
   * step 4 → already registered (409 from checkUserExists)
   */
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

  /* Auto-detect country */
  const [defaultCountry, setDefaultCountry] = useState<Country>("IN");
  const [country, setCountry] = useState<Country>("IN");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          setDefaultCountry(data.country_code as Country);
          setCountry(data.country_code as Country);
        }
      })
      .catch(() => {});
  }, []);

  /* -------------------------------------------------- */
  /* SEND CONSENT TEMPLATE */
  /* -------------------------------------------------- */
  const handleSendConsent = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/auth/send-consent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          country,
        }),
      });

      const data = await res.json();

      if (res.status === 409 && data.exists) {
        setStep(4);
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to send WhatsApp message");
      }

      setStep(2);
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
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) setStep(1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* MODAL */}
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
            <p className="mb-4 text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          {/* -------------------------------------------------- */}
          {/* STEP 1 — ENTER PHONE */}
          {/* -------------------------------------------------- */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Get started with Remore
              </h2>

              <p className="text-slate-500 mb-6">
                Enter your WhatsApp number to continue
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!phoneNumber || loading) return;
                  handleSendConsent();
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
                    "Continue on WhatsApp"
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* -------------------------------------------------- */}
          {/* STEP 2 — WAITING FOR CONSENT */}
          {/* -------------------------------------------------- */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2">
                Check your WhatsApp
              </h2>

              <p className="text-slate-500 mb-6">
                We’ve sent you a message.  
                Tap <b>Yes</b> to continue with Remore.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] mb-6">
                  Open WhatsApp
                </Button>
              </a>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://wa.me/${WHATSAPP_NUMBER}`}
                className="mx-auto"
                alt="WhatsApp QR"
              />

              <p className="mt-4 text-xs text-slate-400">
                After you tap Yes, you can close this window
              </p>
            </motion.div>
          )}

          {/* -------------------------------------------------- */}
          {/* STEP 3 — SUCCESS (OPTIONAL, FUTURE USE) */}
          {/* -------------------------------------------------- */}
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
                You’re all set!
              </h2>

              <p className="text-slate-500 mb-6">
                Start chatting with Remore on WhatsApp
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]">
                  Open WhatsApp
                </Button>
              </a>
            </motion.div>
          )}
  /* -------------------------------------------------- */
  /* STEP 4 — ALREADY REGISTERED */
  /* -------------------------------------------------- */
  {step === 4 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Smartphone size={28} />
      </div>

      <h2 className="text-2xl font-bold mb-2">
        You're already on Remore!
      </h2>

      <p className="text-slate-500 mb-6">
        This number is already registered — just head to WhatsApp to keep chatting.
      </p>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]">
          Open WhatsApp
        </Button>
      </a>
    </motion.div>
  )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};