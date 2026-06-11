import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { BibleVerse } from '../types';

interface BibleVersesProps {
  verses: BibleVerse[];
}

export default function BibleVerses({ verses }: BibleVersesProps) {
  const [current, setCurrent] = useState(0);

  if (verses.length === 0) return null;

  const prev = () => setCurrent((current - 1 + verses.length) % verses.length);
  const next = () => setCurrent((current + 1) % verses.length);

  const verse = verses[current];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-black" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Word of God
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Bible <span className="purple-gradient-text">Verses</span>
          </h2>
        </div>

        <div className="relative">
          {/* Verse card */}
          <div className="glass-card p-8 sm:p-12 text-center border-purple-900/40">
            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-800 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-800/30">
              <Heart className="w-6 h-6 text-white" />
            </div>

            <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 italic">
              "{verse.verse_text}"
            </blockquote>

            <cite className="text-purple-400 font-bold text-lg not-italic">
              — {verse.reference}
            </cite>

            {verse.is_featured && (
              <div className="mt-4">
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-700/30 text-purple-300 text-xs rounded-full">
                  Featured Verse
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-900/30 hover:border-purple-600/50 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {verses.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 h-2 bg-purple-500'
                      : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-900/30 hover:border-purple-600/50 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
