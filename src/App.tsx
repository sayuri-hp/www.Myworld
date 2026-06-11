import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Project, Skill, Achievement, BibleVerse, PersonalInfo } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MiniGames from './components/MiniGames';
import Education from './components/Education';
import Achievements from './components/Achievements';
import BibleVerses from './components/BibleVerses';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';

export default function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [piRes, pRes, sRes, aRes, vRes] = await Promise.all([
        supabase.from('personal_info').select('*').maybeSingle(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('category'),
        supabase.from('achievements').select('*').order('year', { ascending: false }),
        supabase.from('bible_verses').select('*').order('created_at'),
      ]);

      if (piRes.data) setPersonalInfo(piRes.data);
      if (pRes.data) setProjects(pRes.data);
      if (sRes.data) setSkills(sRes.data);
      if (aRes.data) setAchievements(aRes.data);
      if (vRes.data) setVerses(vRes.data);

      setLoading(false);
    };

    loadData();
    trackVisit();
  }, []);

  const trackVisit = async () => {
    const { data } = await supabase
      .from('visitor_stats')
      .select('stat_value')
      .eq('stat_key', 'total_visitors')
      .maybeSingle();

    if (data) {
      await supabase
        .from('visitor_stats')
        .update({ stat_value: (data.stat_value ?? 0) + 1, updated_at: new Date().toISOString() })
        .eq('stat_key', 'total_visitors');
    }
  };

  const handleProjectView = async () => {
    const { data } = await supabase
      .from('visitor_stats')
      .select('stat_value')
      .eq('stat_key', 'total_project_views')
      .maybeSingle();

    if (data) {
      await supabase
        .from('visitor_stats')
        .update({ stat_value: (data.stat_value ?? 0) + 1, updated_at: new Date().toISOString() })
        .eq('stat_key', 'total_project_views');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-purple-700 border-t-purple-400 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm animate-pulse">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onAdminClick={() => setShowAdmin(true)} />

      <main>
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Skills skills={skills} />
        <Projects projects={projects} onProjectView={handleProjectView} />
        <MiniGames />
        <Education />
        <Achievements achievements={achievements} />
        <BibleVerses verses={verses} />
        <Contact />
      </main>

      <Footer />

      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}
