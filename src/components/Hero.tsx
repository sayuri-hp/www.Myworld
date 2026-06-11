import { useEffect, useState } from 'react';
import { Github, Facebook, Download, ChevronDown, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { PersonalInfo } from '../types';

interface HeroProps {
  personalInfo: PersonalInfo | null;
}

const roles = [
  'BSIT Student',
  'Aspiring Developer',
  'Problem Solver',
  'Tech Enthusiast',
  'Future IT Professional',
];

export default function Hero({ personalInfo }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentRole.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden particles-bg grid-bg"
    >
      {/* Background glows */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to my Portfolio
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="shimmer-text">
                {personalInfo?.full_name ?? 'Lera Garcia'}
              </span>
            </h1>

            <div className="text-xl sm:text-2xl text-gray-300 mb-6 h-8">
              <span className="text-purple-400 font-semibold">{displayText}</span>
              <span className="animate-pulse text-purple-400">|</span>
            </div>

            <p className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed">
              {personalInfo?.bio ?? 'Passionate BSIT student at Agusan del Sur State University, building digital solutions and exploring the world of technology.'}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400" />
                {personalInfo?.location ?? 'Agusan del Sur, Philippines'}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                ADSSU — BSIT
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="https://www.facebook.com/lera.garcia.98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-primary"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href="https://github.com/sayuri-hp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 btn-outline"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              {personalInfo?.resume_url && (
                <a
                  href={personalInfo.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              )}
            </div>
          </div>

          {/* Profile image */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-800 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse-slow" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-700 to-purple-400 rounded-full opacity-60" />

              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-purple-600/50">
                <img
                  src={personalInfo?.profile_image_url ?? '/268357fe-b849-415c-bc08-ba6544a96741.jpeg'}
                  alt={personalInfo?.full_name ?? 'Lera Garcia'}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-black border border-purple-700 rounded-xl px-4 py-2 shadow-lg shadow-purple-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 cursor-pointer animate-bounce" onClick={scrollToNext}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
