import { Code2, Heart, Facebook, Github, BookOpen } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-xl">Lera<span className="text-purple-400">Garcia</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              BSIT Student at Agusan del Sur State University. Building the future one line of code at a time.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/lera.garcia.98"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/sayuri-hp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800 hover:border-gray-600/50 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Navigation</h4>
            <ul className="space-y-2">
              {['home', 'about', 'skills', 'projects'].map(id => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-gray-500 hover:text-purple-400 text-sm transition-colors capitalize"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">More</h4>
            <ul className="space-y-2">
              {['games', 'education', 'achievements', 'contact'].map(id => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-gray-500 hover:text-purple-400 text-sm transition-colors capitalize"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <h4 className="text-white font-semibold text-sm">Daily Verse</h4>
            </div>
            <blockquote className="text-gray-500 text-xs italic leading-relaxed border-l-2 border-purple-700 pl-3">
              "For I know the plans I have for you, declares the Lord, plans to prosper you..."
            </blockquote>
            <cite className="text-purple-500 text-xs not-italic mt-1 block">— Jeremiah 29:11</cite>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            © {year} Lera Garcia. Made with
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
            and faith.
          </p>
          <p className="text-gray-700 text-xs">
            BSIT Student • Agusan del Sur State University
          </p>
        </div>
      </div>
    </footer>
  );
}
