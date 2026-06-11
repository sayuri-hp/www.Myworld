import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const educationData = [
  {
    period: '2019–2022',
    school: 'Nangan National High School',
    level: 'Junior High School',
    location: 'Nangan, Agusan del Sur',
    description: 'Completed junior high school education with dedication and strong academic foundations. Built foundational knowledge that paved the way for higher studies.',
    status: 'completed',
  },
  {
    period: '2023–2024',
    school: 'Nangan National High School',
    level: 'Senior High School',
    location: 'Nangan, Agusan del Sur',
    description: 'Completed senior high school education. Developed analytical thinking, communication, and technical skills essential for the IT field.',
    status: 'completed',
  },
  {
    period: '2024–Present',
    school: 'Agusan del Sur State University',
    level: 'Bachelor of Science in Information Technology (BSIT)',
    location: 'Agusan del Sur, Philippines',
    description: 'Currently pursuing BSIT at ADSSU. Studying programming, systems analysis, database management, networking, and various IT disciplines. Passionate about building impactful digital solutions.',
    status: 'current',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            Academic Journey
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            My <span className="purple-gradient-text">Education</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every classroom was a stepping stone. From notebooks to code editors — the journey continues.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-700 via-purple-500 to-purple-800 transform sm:-translate-x-px" />

            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Card */}
                <div className={`ml-16 sm:ml-0 flex-1 ${
                  index % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'
                }`}>
                  <div className={`glass-card p-6 card-hover ${
                    edu.status === 'current'
                      ? 'border-purple-600/50 shadow-lg shadow-purple-900/20'
                      : ''
                  }`}>
                    <div className={`flex items-center gap-3 mb-3 ${
                      index % 2 === 0 ? 'sm:justify-end' : ''
                    }`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        edu.status === 'current'
                          ? 'bg-purple-700/30 text-purple-300 border border-purple-600/30'
                          : 'bg-white/10 text-gray-400 border border-white/10'
                      }`}>
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </div>
                      {edu.status === 'current' && (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-white font-black text-xl mb-1">{edu.school}</h3>
                    <div className="flex items-center gap-1 text-purple-400 text-sm font-semibold mb-2 flex-wrap">
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      {edu.level}
                    </div>
                    <div className={`flex items-center gap-1 text-gray-500 text-xs mb-3 ${
                      index % 2 === 0 ? 'sm:justify-end' : ''
                    }`}>
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 top-6 sm:-translate-x-1/2 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    edu.status === 'current'
                      ? 'bg-purple-500 border-purple-300 shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800 border-gray-600'
                  }`} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
