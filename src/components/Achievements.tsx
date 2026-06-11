import { Award, Star, Shield, Zap, CheckCircle, Trophy, Medal } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
}

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  'check-circle': <CheckCircle className="w-6 h-6" />,
  trophy: <Trophy className="w-6 h-6" />,
  medal: <Medal className="w-6 h-6" />,
};

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Hall of Fame
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            My <span className="purple-gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of wins, milestones, and proof that hard work (and a little bit of faith) pays off.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="glass-card p-6 card-hover relative overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-800/30">
                    {iconMap[achievement.icon ?? 'award'] ?? <Award className="w-6 h-6" />}
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full font-mono">
                    {achievement.year}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-purple-700 to-purple-400 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Achievements are loading or being added soon!
          </div>
        )}
      </div>
    </section>
  );
}
