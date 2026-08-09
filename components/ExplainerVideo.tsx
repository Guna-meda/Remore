import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Mascot } from './ui/Mascot';
import { Doodle } from './ui/Doodle';

/**
 * Drop your explainer video file at /public/explainer.mp4 (and an optional
 * poster frame at /public/explainer-poster.jpg) — this section will pick it
 * up automatically. Until then it shows a friendly placeholder.
 */
export const ExplainerVideo: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section className="relative py-20 md:py-28 bg-cream-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="font-doodle text-2xl text-secondary">see it in action</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mt-1">
              60 seconds, and you'll get it.
            </h2>
          </div>
        </FadeIn>

        <div className="absolute -top-6 -left-6 md:-left-14 hidden sm:block z-20">
          <Mascot color="sky" pose="think" className="w-16 h-16 md:w-20 md:h-20" float />
        </div>
        <div className="absolute -bottom-8 -right-4 md:-right-12 hidden sm:block z-20 rotate-6">
          <Doodle type="star" className="w-10 h-10 text-sun" />
        </div>

        <FadeIn delay={0.1}>
          <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-ink/15 bg-forest-900 aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/explainer.mp4"
              poster="/explainer-poster.jpg"
              controls={playing}
              playsInline
            />
            {!playing && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-forest-900/70 via-forest-900/50 to-primary/40 text-white"
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center shadow-xl"
                >
                  <Play size={28} fill="currentColor" className="ml-1" />
                </motion.span>
                <span className="font-medium text-white/90">Watch how Remore works</span>
              </button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
