import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const USER_GREEN = '#E7FFDB';

export const WATick: React.FC<{ read?: boolean }> = ({ read = true }) => (
  <svg width="15" height="10" viewBox="0 0 16 11" className="inline-block ml-1 -mb-px flex-shrink-0">
    <path d="M1 5.8 L4.2 9 L9.5 2" stroke={read ? '#53BDEB' : '#8696A0'} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.6 5.8 L8.8 9 L15 2" stroke={read ? '#53BDEB' : '#8696A0'} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** A single WhatsApp-style text bubble. `from="user"` = outgoing, green, right, tail on the right.
 *  `from="bot"` = incoming, white, left, tail on the left. This matches real WhatsApp conventions.
 *  Pass `center` to use this as a standalone centered quote card instead of a left/right-pinned
 *  chat bubble (e.g. outside a wallpaper chat log) — this avoids the auto-margin cross-axis quirk
 *  that overrides flex centering when a bubble is dropped into a `justify-center`/`items-center` layout. */
export const WABubble: React.FC<{
  from: 'user' | 'bot';
  time: string;
  delay?: number;
  className?: string;
  center?: boolean;
  tail?: boolean;
  children: React.ReactNode;
}> = ({ from, time, delay = 0, className = '', center = false, tail = true, children }) => {
  const isUser = from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: center ? 0 : isUser ? 10 : -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`relative max-w-[80%] px-3 py-2 shadow-sm text-[13px] leading-snug text-slate-800 rounded-lg ${center ? 'mx-auto' : isUser ? 'ml-auto rounded-tr-none' : 'mr-auto rounded-tl-none'} ${className}`}
      style={{ backgroundColor: isUser ? USER_GREEN : '#FFFFFF' }}
    >
      {children}
      <span className="flex items-center justify-end gap-0.5 mt-1 text-[10px] text-slate-400 select-none">
        {time}
        {isUser && <WATick />}
      </span>
      {tail && !center && (
        <span
          className={`absolute top-0 w-3 h-3 pointer-events-none ${isUser ? '-right-[6px]' : '-left-[6px]'}`}
          style={{
            backgroundColor: isUser ? USER_GREEN : '#FFFFFF',
            clipPath: isUser ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      )}
    </motion.div>
  );
};

/** Centered system-style pill, like WhatsApp's date separators — used to label which feature we're viewing. */
export const WASystemPill: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="mx-auto w-fit bg-white/80 backdrop-blur-sm text-[11px] font-semibold text-slate-500 px-3 py-1 rounded-full shadow-sm mb-3"
  >
    {children}
  </motion.div>
);

const BAR_HEIGHTS = [7, 13, 9, 16, 11, 6, 14, 10, 8, 15, 9, 6, 12];

/** A WhatsApp voice-note bubble: play button + waveform + duration. */
export const WAVoiceBubble: React.FC<{ from: 'user' | 'bot'; time: string; duration: string; delay?: number }> = ({ from, time, duration, delay = 0 }) => {
  const isUser = from === 'user';
  return (
    <WABubble from={from} time={time} delay={delay} className="!py-2.5">
      <div className="flex items-center gap-2 min-w-[184px]">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: isUser ? '#3B7A57' : '#3B7A57' }}>
          <Play size={13} fill="white" className="ml-0.5" />
        </div>
        <div className="flex items-end gap-[2px] flex-1 h-6">
          {BAR_HEIGHTS.map((h, i) => (
            <div key={i} className="w-[2.5px] rounded-full bg-slate-400/50" style={{ height: h }} />
          ))}
        </div>
        <span className="text-[10px] text-slate-400 flex-shrink-0">{duration}</span>
      </div>
    </WABubble>
  );
};

/** A WhatsApp image-message bubble: minimal chrome, rounded photo, timestamp overlaid bottom-right. */
export const WAImageBubble: React.FC<{
  from: 'user' | 'bot';
  time: string;
  delay?: number;
  children: React.ReactNode; // the "photo" content
}> = ({ from, time, delay = 0, children }) => {
  const isUser = from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isUser ? 10 : -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`relative max-w-[78%] p-1 shadow-sm rounded-lg ${isUser ? 'ml-auto rounded-tr-none' : 'mr-auto rounded-tl-none'}`}
      style={{ backgroundColor: isUser ? USER_GREEN : '#FFFFFF' }}
    >
      <div className="rounded-md overflow-hidden relative">
        {children}
        <span className="absolute bottom-1.5 right-2 text-[10px] text-white/90 bg-black/25 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
          {time}
          {isUser && <WATick read />}
        </span>
      </div>
      <span
        className={`absolute top-0 w-3 h-3 pointer-events-none ${isUser ? '-right-[6px]' : '-left-[6px]'}`}
        style={{
          backgroundColor: isUser ? USER_GREEN : '#FFFFFF',
          clipPath: isUser ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />
    </motion.div>
  );
};

/** WhatsApp-style interactive button list, attached under a bot message (like real WA "quick reply" buttons). */
export const WAButtonList: React.FC<{
  buttons: { label: string; icon?: React.ReactNode }[];
  delay?: number;
}> = ({ buttons, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="mr-auto max-w-[80%] bg-white rounded-lg rounded-tl-none shadow-sm overflow-hidden mt-1"
  >
    {buttons.map((b, i) => (
      <div
        key={i}
        className={`w-full flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold text-primary ${i > 0 ? 'border-t border-slate-100' : ''}`}
      >
        {b.icon}
        {b.label}
      </div>
    ))}
  </motion.div>
);

/** The tan WhatsApp chat wallpaper, used behind every feature visual for a consistent, authentic look. */
export const WAWallpaper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative h-full bg-[#EFEAE2] px-3 pt-3 pb-4 space-y-2 overflow-x-hidden flex flex-col ${className}`}>
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
    <div className="relative flex-1">
      <div className="space-y-2">{children}</div>
    </div>
  </div>
);
