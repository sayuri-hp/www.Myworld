import { useState } from 'react';
import { Code2, Database, Wrench, Palette, Network, Star } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-4 h-4" />,
  Backend: <Database className="w-4 h-4" />,
  Tools: <Wrench className="w-4 h-4" />,
  Design: <Palette className="w-4 h-4" />,
  'IT Fundamentals': <Network className="w-4 h-4" />,
  General: <Star className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  Frontend: 'from-purple-600to-purple-400',
  Backend: 'from-violet-700 to-violet-500',
  Tools: 'from-purple-800 to-purple-600',
  Design: 'from-fuchsia-700 to-fuchsia-500',
  'IT Fundamentals': 'from-indigo-700 to-purple-500',
  General: 'from-purple-700 to-purple-500',
};

export default function Skills({ skills }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            Technical Arsenal
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            My <span className="purple-gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of technologies I've wrestled with, befriended, and occasionally argued with.
            Each one earned with blood, sweat, and Stack Overflow.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-700/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-600/50 hover:text-purple-400'
              }`}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(skill => (
            <div
              key={skill.id}
              className={`glass-card p-5 card-hover cursor-pointer transition-all duration-300 ${
                hoveredSkill === skill.id ? 'border-purple-600/50 shadow-lg shadow-purple-900/20' : ''
              }`}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-base">{skill.name}</h3>
                  <span className="text-xs text-gray-500">{skill.category}</span>
                </div>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[skill.category] ?? 'from-purple-700 to-purple-500'} flex items-center justify-center text-white`}>
                  {categoryIcons[skill.category] ?? <Star className="w-4 h-4" />}
                </div>
              </div>

              {/* Skill level bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Proficiency</span>
                  <span className="text-xs font-bold text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category] ?? 'from-purple-800 to-purple-500'} transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Funny description - shows on hover */}
              <div className={`transition-all duration-300 overflow-hidden ${
                hoveredSkill === skill.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-xs text-gray-400 italic leading-relaxed border-t border-white/5 pt-3">
                  "{skill.funny_description}"
                </p>
              </div>

              {hoveredSkill !== skill.id && (
                <p className="text-xs text-gray-600 italic">Hover for a fun fact!</p>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No skills found in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
