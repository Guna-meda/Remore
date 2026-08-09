import React from 'react';
import { motion } from 'framer-motion';

export type MascotColor = 'green' | 'coral' | 'sun' | 'sky' | 'violet';
export type MascotPose =
  | 'wave'      // greeting, one arm up
  | 'calm'      // neutral, relaxed
  | 'peek'      // small, playful
  | 'sit'       // sitting, legs tucked
  | 'think'     // hand near chin, looking up
  | 'happy'     // arms up, big grin, cheering
  | 'overwhelmed' // arms up defensively, wide eyes, sweat drop
  | 'stress'    // furrowed brow, tense arms, sweat drop
  | 'busy'      // holding a little screen, focused
  | 'sleepy';   // eyes closed, zzz

export type MascotProp = 'none' | 'megaphone' | 'question' | 'stack' | 'laptop' | 'coffee' | 'check' | 'star' | 'sparkle';

interface MascotProps {
  color?: MascotColor;
  pose?: MascotPose;
  prop?: MascotProp;
  className?: string;
  blink?: boolean;
  sway?: boolean;
  float?: boolean;
  rotate?: number;
}

const PALETTE: Record<MascotColor, { body: string; shade: string; leaf: string }> = {
  green: { body: '#3B7A57', shade: '#2E6146', leaf: '#7FBE8C' },
  coral: { body: '#FF9376', shade: '#F2653F', leaf: '#7FBE8C' },
  sun: { body: '#F4B740', shade: '#E0A22C', leaf: '#7FBE8C' },
  sky: { body: '#7FA7C9', shade: '#5F87A9', leaf: '#7FBE8C' },
  violet: { body: '#9C86C8', shade: '#7C64AC', leaf: '#7FBE8C' },
};

const INK = '#241E19';

type PoseConfig = {
  armsLeft: string;
  armsRight: string;
  eyesClosed?: boolean;
  browFurrow?: boolean;
  mouth: 'smile' | 'grin' | 'flat' | 'o' | 'small';
  sweat?: boolean;
  blush?: boolean;
  sitLegs?: boolean;
};

const POSES: Record<MascotPose, PoseConfig> = {
  wave: {
    armsLeft: 'M30 62 Q10 46 16 30',
    armsRight: 'M72 66 Q88 72 84 84',
    mouth: 'smile',
  },
  calm: {
    armsLeft: 'M28 66 Q14 70 12 82',
    armsRight: 'M74 66 Q90 70 90 84',
    mouth: 'smile',
  },
  peek: {
    armsLeft: 'M30 64 Q18 62 14 72',
    armsRight: 'M72 64 Q84 62 88 72',
    mouth: 'small',
  },
  sit: {
    armsLeft: 'M30 68 Q22 76 30 80',
    armsRight: 'M72 68 Q80 76 72 80',
    mouth: 'smile',
    sitLegs: true,
  },
  think: {
    armsLeft: 'M30 66 Q14 70 12 82',
    armsRight: 'M74 58 Q84 48 76 40',
    mouth: 'small',
  },
  happy: {
    armsLeft: 'M30 60 Q8 52 8 32',
    armsRight: 'M72 60 Q94 52 94 32',
    mouth: 'grin',
    blush: true,
  },
  overwhelmed: {
    armsLeft: 'M30 58 Q10 40 20 22',
    armsRight: 'M72 58 Q92 40 82 22',
    mouth: 'o',
    sweat: true,
  },
  stress: {
    armsLeft: 'M30 64 Q20 58 26 46',
    armsRight: 'M72 64 Q82 58 76 46',
    mouth: 'flat',
    browFurrow: true,
    sweat: true,
  },
  busy: {
    armsLeft: 'M30 62 Q22 68 28 74',
    armsRight: 'M72 62 Q80 68 74 74',
    mouth: 'small',
  },
  sleepy: {
    armsLeft: 'M28 66 Q14 70 12 82',
    armsRight: 'M74 66 Q90 70 90 84',
    mouth: 'small',
    eyesClosed: true,
  },
};

const Mouth: React.FC<{ type: PoseConfig['mouth'] }> = ({ type }) => {
  switch (type) {
    case 'grin':
      return <path d="M39 65 Q50 78 61 65 Q50 74 39 65 Z" fill={INK} opacity="0.85" />;
    case 'flat':
      return <path d="M41 68 L59 68" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />;
    case 'o':
      return <ellipse cx="50" cy="68" rx="4.5" ry="5.5" fill={INK} opacity="0.8" />;
    case 'small':
      return <circle cx="50" cy="68" r="2.6" fill={INK} opacity="0.7" />;
    case 'smile':
    default:
      return <path d="M42 66 Q50 72 58 66" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />;
  }
};

/**
 * A small, original blob-creature mascot: round body, stub legs,
 * two big oval eyes that blink, and a sprouting leaf that sways.
 * Each `pose` gives it a distinct expression/gesture, and `prop`
 * adds a little accessory so the illustrations read as a real family
 * of characters rather than one repeated graphic.
 */
export const Mascot: React.FC<MascotProps> = ({
  color = 'green',
  pose = 'calm',
  prop = 'none',
  className = 'w-40 h-40',
  blink = true,
  sway = true,
  float = false,
  rotate = 0,
}) => {
  const c = PALETTE[color];
  const p = POSES[pose];
  const eyesClosed = p.eyesClosed;

  return (
    <motion.div
      className={className}
      style={rotate ? { rotate } : undefined}
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={float ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* soft ground shadow */}
        <ellipse cx="50" cy="94" rx="22" ry="4" fill="#000" opacity="0.08" />

        {/* leaf sprout */}
        <motion.g
          style={{ transformOrigin: '50px 22px' }}
          animate={sway ? { rotate: [-7, 7, -7] } : undefined}
          transition={sway ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <path d="M50 22 C 47 14, 47 6, 51 2" stroke={c.leaf} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M51 2 C 55 4, 58 9, 55 13 C 51 12, 49 7, 51 2 Z" fill={c.leaf} />
        </motion.g>

        {/* body */}
        <path
          d="M50 20 C 74 20 82 42 80 62 C 78 84 66 90 50 90 C 34 90 22 84 20 62 C 18 42 26 20 50 20 Z"
          fill={c.body}
        />
        <path
          d="M50 20 C 74 20 82 42 80 62 C 79 71 76 78 70 82 C 74 66 72 44 58 30 C 55 26 52 23 50 20 Z"
          fill={c.shade}
          opacity="0.35"
        />

        {/* legs */}
        {p.sitLegs ? (
          <>
            <path d="M34 84 Q40 90 48 86" stroke={c.shade} strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M66 84 Q60 90 52 86" stroke={c.shade} strokeWidth="6" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <path d="M38 88 L36 96" stroke={c.shade} strokeWidth="6" strokeLinecap="round" />
            <path d="M62 88 L64 96" stroke={c.shade} strokeWidth="6" strokeLinecap="round" />
          </>
        )}

        {/* arms — drawn on top of the body so tucked-in poses stay visible */}
        <path d={p.armsLeft} stroke={c.body} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={p.armsRight} stroke={c.body} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d={p.armsLeft} stroke={INK} strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.12" />
        <path d={p.armsRight} stroke={INK} strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.12" />

        {/* eyebrows (stress) */}
        {p.browFurrow && (
          <>
            <path d="M31 42 L45 46" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M69 42 L55 46" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </>
        )}

        {/* eyes */}
        {eyesClosed ? (
          <>
            <path d="M31 52 Q38 58 45 52" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M55 52 Q62 58 69 52" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <g>
            <motion.g
              animate={blink ? { scaleY: [1, 1, 0.1, 1, 1, 1] } : undefined}
              transition={blink ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.9, 0.94, 0.98, 0.99, 1] } : undefined}
              style={{ transformOrigin: '38px 52px' }}
            >
              <ellipse cx="38" cy="52" rx="8" ry="10" fill="white" />
              <circle cx={pose === 'think' || pose === 'overwhelmed' ? 40 : 39} cy="53" r="4" fill={INK} />
              <circle cx="41" cy="50" r="1.4" fill="white" />
            </motion.g>
            <motion.g
              animate={blink ? { scaleY: [1, 1, 0.1, 1, 1, 1] } : undefined}
              transition={blink ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.9, 0.94, 0.98, 0.99, 1] } : undefined}
              style={{ transformOrigin: '62px 52px' }}
            >
              <ellipse cx="62" cy="52" rx="8" ry="10" fill="white" />
              <circle cx={pose === 'think' || pose === 'overwhelmed' ? 64 : 63} cy="53" r="4" fill={INK} />
              <circle cx="65" cy="50" r="1.4" fill="white" />
            </motion.g>
          </g>
        )}

        {/* blush */}
        {p.blush && (
          <>
            <ellipse cx="27" cy="62" rx="4" ry="2.6" fill={c.shade} opacity="0.5" />
            <ellipse cx="73" cy="62" rx="4" ry="2.6" fill={c.shade} opacity="0.5" />
          </>
        )}

        {/* sweat drop */}
        {p.sweat && (
          <path d="M74 32 C 77 36 77 40 74 41 C 71 40 71 36 74 32 Z" fill="#7FC4E0" opacity="0.9" />
        )}

        <Mouth type={p.mouth} />

        {/* zzz for sleepy */}
        {pose === 'sleepy' && (
          <g fill={c.shade} opacity="0.8" fontFamily="serif">
            <text x="78" y="34" fontSize="10" fontWeight="bold">z</text>
            <text x="85" y="24" fontSize="8" fontWeight="bold">z</text>
            <text x="90" y="16" fontSize="6" fontWeight="bold">z</text>
          </g>
        )}

        {/* ---- accessory props ---- */}
        {prop === 'megaphone' && (
          <g transform="translate(66,54) rotate(-18)">
            <path d="M0 6 L14 0 L14 16 L0 10 Z" fill={c.shade} />
            <rect x="-6" y="5" width="7" height="6" rx="1.5" fill={c.shade} />
            <path d="M14 3 Q22 8 14 13" stroke={c.shade} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {prop === 'question' && (
          <g transform="translate(70,6)">
            <circle cx="10" cy="10" r="11" fill="white" stroke={c.shade} strokeWidth="1.5" />
            <text x="10" y="15" fontSize="14" fontWeight="bold" textAnchor="middle" fill={c.shade}>?</text>
          </g>
        )}
        {prop === 'stack' && (
          <g transform="translate(70,50)">
            <rect x="0" y="16" width="20" height="8" rx="2" fill={c.shade} />
            <rect x="2" y="8" width="16" height="8" rx="2" fill={c.body} />
            <rect x="4" y="0" width="12" height="8" rx="2" fill={c.shade} opacity="0.85" />
          </g>
        )}
        {prop === 'laptop' && (
          <g transform="translate(31,70)">
            <rect x="0" y="0" width="34" height="16" rx="2" fill="white" stroke={c.shade} strokeWidth="1.5" />
            <rect x="-3" y="16" width="40" height="4" rx="2" fill={c.shade} />
          </g>
        )}
        {prop === 'coffee' && (
          <g transform="translate(74,58)">
            <path d="M0 4 h14 v10 a7 7 0 0 1 -14 0 Z" fill="white" stroke={c.shade} strokeWidth="1.5" />
            <path d="M14 7 q6 0 6 5 t-6 5" stroke={c.shade} strokeWidth="1.5" fill="none" />
            <path d="M3 0 q1 -3 3 0" stroke={c.shade} strokeWidth="1.2" fill="none" opacity="0.7" />
            <path d="M8 0 q1 -3 3 0" stroke={c.shade} strokeWidth="1.2" fill="none" opacity="0.7" />
          </g>
        )}
        {prop === 'check' && (
          <g transform="translate(72,8)">
            <circle cx="10" cy="10" r="11" fill={c.shade} />
            <path d="M5 10 L9 14 L16 6" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        )}
        {(prop === 'star' || prop === 'sparkle') && (
          <g transform="translate(72,4)" fill={c.shade}>
            <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" />
            {prop === 'sparkle' && <path d="M20 14 L21 17 L24 18 L21 19 L20 22 L19 19 L16 18 L19 17 Z" opacity="0.7" />}
          </g>
        )}
      </svg>
    </motion.div>
  );
};

/** Brand logo mark used in the navbar, footer, favicon, and WhatsApp mockups:
 *  the full waving mascot — the approved brand character, not an abstract icon. */
export const Logo: React.FC<{ className?: string; animated?: boolean }> = ({ className = 'w-9 h-9', animated = true }) => (
  <svg viewBox="-8 -8 116 116" className={className}>
    {/* soft ground shadow */}
    <ellipse cx="50" cy="94" rx="22" ry="4" fill="#000000" opacity="0.10" />

    {/* sprouting leaf */}
    <motion.g
      style={{ transformOrigin: '50px 22px' }}
      animate={animated ? { rotate: [-7, 7, -7] } : undefined}
      transition={animated ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <path d="M50 22 C 47 14, 47 6, 51 2" stroke="#7FBE8C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M51 2 C 55 4, 58 9, 55 13 C 51 12, 49 7, 51 2 Z" fill="#7FBE8C" />
    </motion.g>

    {/* legs */}
    <path d="M38 88 L36 96" stroke="#2E6146" strokeWidth="6" strokeLinecap="round" />
    <path d="M62 88 L64 96" stroke="#2E6146" strokeWidth="6" strokeLinecap="round" />

    {/* arms (wave pose) */}
    <path d="M30 62 Q10 46 16 30" stroke="#3B7A57" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M72 66 Q88 72 84 84" stroke="#3B7A57" strokeWidth="6" strokeLinecap="round" fill="none" />

    {/* body */}
    <path d="M50 20 C 74 20 82 42 80 62 C 78 84 66 90 50 90 C 34 90 22 84 20 62 C 18 42 26 20 50 20 Z" fill="#3B7A57" />
    <path d="M50 20 C 74 20 82 42 80 62 C 79 71 76 78 70 82 C 74 66 72 44 58 30 C 55 26 52 23 50 20 Z" fill="#2E6146" opacity="0.35" />

    {/* eyes */}
    <motion.g
      animate={animated ? { scaleY: [1, 1, 0.1, 1, 1, 1] } : undefined}
      transition={animated ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.9, 0.94, 0.98, 0.99, 1] } : undefined}
      style={{ transformOrigin: '38px 52px' }}
    >
      <ellipse cx="38" cy="52" rx="8" ry="10" fill="#FFFFFF" />
      <circle cx="39" cy="53" r="4" fill="#241E19" />
      <circle cx="41" cy="50" r="1.4" fill="#FFFFFF" />
    </motion.g>
    <motion.g
      animate={animated ? { scaleY: [1, 1, 0.1, 1, 1, 1] } : undefined}
      transition={animated ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.9, 0.94, 0.98, 0.99, 1] } : undefined}
      style={{ transformOrigin: '62px 52px' }}
    >
      <ellipse cx="62" cy="52" rx="8" ry="10" fill="#FFFFFF" />
      <circle cx="63" cy="53" r="4" fill="#241E19" />
      <circle cx="65" cy="50" r="1.4" fill="#FFFFFF" />
    </motion.g>

    {/* smile */}
    <path d="M42 66 Q50 72 58 66" stroke="#241E19" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);
