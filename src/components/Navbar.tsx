import { useState, useEffect } from 'react';
import { Menu, X, Code2, Shield } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Games', href: '#games' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-black/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-purple-900/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">
              Lera<span className="text-purple-400">Garcia</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-purple-400 bg-purple-900/20'
                    : 'text-gray-400 hover:text-purple-400 hover:bg-purple-900/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onAdminClick}
              className="ml-2 flex items-center gap-1.5 px-3 py-2 border border-purple-800/50 text-purple-400 hover:bg-purple-800/20 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-purple-900/30">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-purple-400 bg-purple-900/20'
                    : 'text-gray-400 hover:text-purple-400 hover:bg-purple-900/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setIsOpen(false); onAdminClick(); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-purple-400 border border-purple-800/30 hover:bg-purple-800/20 transition-all duration-200 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
