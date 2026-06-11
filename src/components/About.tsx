import { Heart, Coffee, Code2, BookOpen, Facebook, Github, Download, MapPin, Mail } from 'lucide-react';
import { PersonalInfo } from '../types';

interface AboutProps {
  personalInfo: PersonalInfo | null;
}

const funFacts = [
  { icon: <Coffee className="w-5 h-5" />, label: 'Coffee Consumed', value: '∞ cups', color: 'text-amber-400' },
  { icon: <Code2 className="w-5 h-5" />, label: 'Lines of Code', value: '10,000+', color: 'text-blue-400' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Books Studied', value: 'Too many', color: 'text-green-400' },
  { icon: <Heart className="w-5 h-5" />, label: 'Faith Level', value: 'Max ✝', color: 'text-purple-400' },
];

export default function About({ personalInfo }: AboutProps) {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            About Me
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Who <span className="purple-gradient-text">Am I?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: image + fun facts */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-800 to-purple-500 rounded-2xl blur opacity-20" />
              <div className="relative glass-card p-2 rounded-2xl overflow-hidden">
                <img
                  src={personalInfo?.profile_image_url ?? '/268357fe-b849-415c-bc08-ba6544a96741.jpeg'}
                  alt={personalInfo?.full_name ?? 'Lera Garcia'}
                  className="w-full h-72 object-cover object-top rounded-xl"
                />
              </div>
            </div>

            {/* Fun facts grid */}
            <div className="grid grid-cols-2 gap-3">
              {funFacts.map(fact => (
                <div key={fact.label} className="glass-card p-4 flex items-center gap-3">
                  <div className={`${fact.color} flex-shrink-0`}>{fact.icon}</div>
                  <div>
                    <div className="text-white font-bold text-sm">{fact.value}</div>
                    <div className="text-gray-500 text-xs">{fact.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio and details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-black text-3xl mb-2">
                {personalInfo?.full_name ?? 'Lera Garcia'}
              </h3>
              <p className="text-purple-400 font-semibold mb-5">
                {personalInfo?.tagline ?? 'BSIT Student | Aspiring Full-Stack Developer'}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {personalInfo?.bio ?? 'Hello! I am Lera Garcia, a passionate BSIT student at Agusan del Sur State University. I love building digital solutions and exploring the world of technology. My faith guides my journey, and I believe that with God, all things are possible.'}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 glass-card rounded-xl">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{personalInfo?.location ?? 'Agusan del Sur, Philippines'}</span>
              </div>
              {personalInfo?.email && (
                <div className="flex items-center gap-3 p-3 glass-card rounded-xl">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{personalInfo.email}</span>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
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
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
