import { useState, useEffect } from 'react';
import {
  X, Shield, LayoutDashboard, Folder, Code2, Trophy, BookOpen,
  MessageSquare, User, Plus, Pencil, Trash2, Save, Eye, EyeOff,
  CheckCircle, XCircle, BarChart3, Users, Mail
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Project, Skill, Achievement, BibleVerse, Message, VisitorStat, PersonalInfo } from '../../types';

interface AdminPanelProps {
  onClose: () => void;
}

const ADMIN_PASSWORD = 'admin@lera2024';

type Tab = 'dashboard' | 'projects' | 'skills' | 'achievements' | 'verses' | 'messages' | 'personal';

// ─── Helper Input ─────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  // Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<VisitorStat[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  // Forms
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
  const [editingVerse, setEditingVerse] = useState<Partial<BibleVerse> | null>(null);
  const [editingPersonal, setEditingPersonal] = useState<Partial<PersonalInfo> | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Try again.');
    }
  };

  const loadAll = async () => {
    const [pRes, sRes, aRes, vRes, mRes, stRes, piRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('skills').select('*').order('category'),
      supabase.from('achievements').select('*').order('year', { ascending: false }),
      supabase.from('bible_verses').select('*').order('created_at'),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('visitor_stats').select('*'),
      supabase.from('personal_info').select('*').maybeSingle(),
    ]);
    if (pRes.data) setProjects(pRes.data);
    if (sRes.data) setSkills(sRes.data);
    if (aRes.data) setAchievements(aRes.data);
    if (vRes.data) setVerses(vRes.data);
    if (mRes.data) setMessages(mRes.data);
    if (stRes.data) setStats(stRes.data);
    if (piRes.data) setPersonalInfo(piRes.data);
  };

  useEffect(() => {
    if (authed) loadAll();
  }, [authed]);

  const showSave = (msg = 'Saved!') => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(''), 2500);
  };

  // ─── Projects CRUD ──────────────────────────────────────────────────────────
  const saveProject = async () => {
    if (!editingProject) return;
    setSaving(true);
    const payload = {
      title: editingProject.title ?? '',
      description: editingProject.description ?? '',
      technologies: editingProject.technologies ?? [],
      features: editingProject.features ?? [],
      image_url: editingProject.image_url ?? null,
      live_url: editingProject.live_url ?? null,
      github_url: editingProject.github_url ?? null,
      category: editingProject.category ?? 'Web Application',
    };
    if (editingProject.id) {
      await supabase.from('projects').update(payload).eq('id', editingProject.id);
    } else {
      await supabase.from('projects').insert(payload);
    }
    await loadAll();
    setEditingProject(null);
    setSaving(false);
    showSave();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    await loadAll();
    showSave('Deleted!');
  };

  // ─── Skills CRUD ────────────────────────────────────────────────────────────
  const saveSkill = async () => {
    if (!editingSkill) return;
    setSaving(true);
    const payload = {
      name: editingSkill.name ?? '',
      category: editingSkill.category ?? 'General',
      level: editingSkill.level ?? 50,
      funny_description: editingSkill.funny_description ?? '',
      icon: editingSkill.icon ?? null,
    };
    if (editingSkill.id) {
      await supabase.from('skills').update(payload).eq('id', editingSkill.id);
    } else {
      await supabase.from('skills').insert(payload);
    }
    await loadAll();
    setEditingSkill(null);
    setSaving(false);
    showSave();
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await supabase.from('skills').delete().eq('id', id);
    await loadAll();
    showSave('Deleted!');
  };

  // ─── Achievements CRUD ──────────────────────────────────────────────────────
  const saveAchievement = async () => {
    if (!editingAchievement) return;
    setSaving(true);
    const payload = {
      title: editingAchievement.title ?? '',
      description: editingAchievement.description ?? '',
      year: editingAchievement.year ?? new Date().getFullYear().toString(),
      icon: editingAchievement.icon ?? 'award',
    };
    if (editingAchievement.id) {
      await supabase.from('achievements').update(payload).eq('id', editingAchievement.id);
    } else {
      await supabase.from('achievements').insert(payload);
    }
    await loadAll();
    setEditingAchievement(null);
    setSaving(false);
    showSave();
  };

  const deleteAchievement = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    await supabase.from('achievements').delete().eq('id', id);
    await loadAll();
    showSave('Deleted!');
  };

  // ─── Bible Verses CRUD ──────────────────────────────────────────────────────
  const saveVerse = async () => {
    if (!editingVerse) return;
    setSaving(true);
    const payload = {
      verse_text: editingVerse.verse_text ?? '',
      reference: editingVerse.reference ?? '',
      is_featured: editingVerse.is_featured ?? false,
    };
    if (editingVerse.id) {
      await supabase.from('bible_verses').update(payload).eq('id', editingVerse.id);
    } else {
      await supabase.from('bible_verses').insert(payload);
    }
    await loadAll();
    setEditingVerse(null);
    setSaving(false);
    showSave();
  };

  const deleteVerse = async (id: string) => {
    if (!confirm('Delete this verse?')) return;
    await supabase.from('bible_verses').delete().eq('id', id);
    await loadAll();
    showSave('Deleted!');
  };

  // ─── Personal Info ───────────────────────────────────────────────────────────
  const savePersonal = async () => {
    if (!editingPersonal) return;
    setSaving(true);
    if (personalInfo?.id) {
      await supabase.from('personal_info').update({ ...editingPersonal, updated_at: new Date().toISOString() }).eq('id', personalInfo.id);
    } else {
      await supabase.from('personal_info').insert(editingPersonal);
    }
    await loadAll();
    setEditingPersonal(null);
    setSaving(false);
    showSave();
  };

  // ─── Mark message read ───────────────────────────────────────────────────────
  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from('messages').update({ is_read: !current }).eq('id', id);
    await loadAll();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('messages').delete().eq('id', id);
    await loadAll();
  };

  // ─── Login Screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
        <div className="bg-gray-950 border border-purple-900/40 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-purple-900/20">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white font-black text-2xl">Admin Access</h2>
            <p className="text-gray-500 text-sm mt-1">Enter password to continue</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="Admin password"
                className={`${inputCls} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {loginError && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> {loginError}
              </p>
            )}
            <button onClick={login} className="w-full btn-primary py-2.5">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Folder className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'verses', label: 'Bible Verses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, badge: messages.filter(m => !m.is_read).length },
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Admin Panel</h1>
            <p className="text-gray-500 text-xs">Lera Garcia Portfolio</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <div className="flex items-center gap-1.5 text-green-400 text-sm bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
              <CheckCircle className="w-3.5 h-3.5" /> {saveMsg}
            </div>
          )}
          <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 border-r border-white/10 py-4 overflow-y-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors relative ${
                tab === t.id
                  ? 'text-white bg-purple-900/30 border-r-2 border-purple-500'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.icon}
              {t.label}
              {'badge' in t && t.badge > 0 && (
                <span className="ml-auto bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <h2 className="text-white font-bold text-xl mb-6">Portfolio Statistics</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Projects', value: projects.length, icon: <Folder className="w-5 h-5" />, color: 'text-purple-400' },
                  { label: 'Total Skills', value: skills.length, icon: <Code2 className="w-5 h-5" />, color: 'text-blue-400' },
                  { label: 'Achievements', value: achievements.length, icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-400' },
                  { label: 'Messages', value: messages.length, icon: <Mail className="w-5 h-5" />, color: 'text-green-400' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-5">
                    <div className={`flex items-center gap-3 mb-3 ${s.color}`}>
                      {s.icon}
                      <span className="text-gray-400 text-sm">{s.label}</span>
                    </div>
                    <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    Site Statistics
                  </div>
                  {stats.map(s => (
                    <div key={s.id} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-500 text-sm capitalize">{s.stat_key.replace(/_/g, ' ')}</span>
                      <span className="text-purple-400 font-bold text-sm">{s.stat_value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Users className="w-4 h-4 text-purple-400" />
                    Recent Messages
                  </div>
                  {messages.slice(0, 4).map(m => (
                    <div key={m.id} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.is_read ? 'bg-gray-700' : 'bg-purple-500'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">{m.name}</div>
                        <div className="text-gray-600 text-xs truncate">{m.subject}</div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-gray-600 text-sm">No messages yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── PROJECTS ── */}
          {tab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Projects ({projects.length})</h2>
                <button
                  onClick={() => setEditingProject({ title: '', description: '', technologies: [], features: [], category: 'Web Application' })}
                  className="flex items-center gap-2 btn-primary py-2 px-4 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              {editingProject && (
                <div className="glass-card p-5 mb-6 border-purple-700/30">
                  <h3 className="text-white font-semibold mb-4">{editingProject.id ? 'Edit' : 'New'} Project</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Title">
                      <input className={inputCls} value={editingProject.title ?? ''} onChange={e => setEditingProject(p => ({ ...p, title: e.target.value }))} placeholder="Project title" />
                    </Field>
                    <Field label="Category">
                      <input className={inputCls} value={editingProject.category ?? ''} onChange={e => setEditingProject(p => ({ ...p, category: e.target.value }))} placeholder="Web Application" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description">
                        <textarea className={`${inputCls} resize-none`} rows={3} value={editingProject.description ?? ''} onChange={e => setEditingProject(p => ({ ...p, description: e.target.value }))} placeholder="Project description" />
                      </Field>
                    </div>
                    <Field label="Technologies (comma separated)">
                      <input className={inputCls} value={(editingProject.technologies ?? []).join(', ')} onChange={e => setEditingProject(p => ({ ...p, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} placeholder="PHP, MySQL, HTML" />
                    </Field>
                    <Field label="Features (one per line)">
                      <textarea className={`${inputCls} resize-none`} rows={3} value={(editingProject.features ?? []).join('\n')} onChange={e => setEditingProject(p => ({ ...p, features: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))} placeholder="Feature 1&#10;Feature 2" />
                    </Field>
                    <Field label="Image URL (optional)">
                      <input className={inputCls} value={editingProject.image_url ?? ''} onChange={e => setEditingProject(p => ({ ...p, image_url: e.target.value || null }))} placeholder="https://..." />
                    </Field>
                    <Field label="Live URL (optional)">
                      <input className={inputCls} value={editingProject.live_url ?? ''} onChange={e => setEditingProject(p => ({ ...p, live_url: e.target.value || null }))} placeholder="https://..." />
                    </Field>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveProject} disabled={saving} className="flex items-center gap-2 btn-primary py-2 px-4 text-sm disabled:opacity-50">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditingProject(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {projects.map(p => (
                  <div key={p.id} className="glass-card p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm">{p.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5 flex gap-3">
                        <span>{p.category}</span>
                        <span>{p.technologies.length} techs</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.view_count} views</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProject(p)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:bg-purple-900/20 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProject(p.id)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SKILLS ── */}
          {tab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Skills ({skills.length})</h2>
                <button
                  onClick={() => setEditingSkill({ name: '', category: 'Frontend', level: 50, funny_description: '' })}
                  className="flex items-center gap-2 btn-primary py-2 px-4 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              {editingSkill && (
                <div className="glass-card p-5 mb-6 border-purple-700/30">
                  <h3 className="text-white font-semibold mb-4">{editingSkill.id ? 'Edit' : 'New'} Skill</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Skill Name">
                      <input className={inputCls} value={editingSkill.name ?? ''} onChange={e => setEditingSkill(s => ({ ...s, name: e.target.value }))} placeholder="JavaScript" />
                    </Field>
                    <Field label="Category">
                      <select className={inputCls} value={editingSkill.category ?? ''} onChange={e => setEditingSkill(s => ({ ...s, category: e.target.value }))}>
                        {['Frontend', 'Backend', 'Tools', 'Design', 'IT Fundamentals', 'General'].map(c => (
                          <option key={c} value={c} style={{ background: '#0a0a0a' }}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={`Proficiency: ${editingSkill.level ?? 50}%`}>
                      <input type="range" min={0} max={100} value={editingSkill.level ?? 50} onChange={e => setEditingSkill(s => ({ ...s, level: parseInt(e.target.value) }))} className="w-full accent-purple-500" />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Funny Description">
                        <textarea className={`${inputCls} resize-none`} rows={2} value={editingSkill.funny_description ?? ''} onChange={e => setEditingSkill(s => ({ ...s, funny_description: e.target.value }))} placeholder="A humorous description of this skill..." />
                      </Field>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveSkill} disabled={saving} className="flex items-center gap-2 btn-primary py-2 px-4 text-sm disabled:opacity-50">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditingSkill(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {skills.map(s => (
                  <div key={s.id} className="glass-card p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">{s.name}</span>
                        <span className="px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded">{s.category}</span>
                        <span className="text-purple-400 text-xs font-mono">{s.level}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingSkill(s)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:bg-purple-900/20 rounded transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteSkill(s.id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {tab === 'achievements' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Achievements ({achievements.length})</h2>
                <button
                  onClick={() => setEditingAchievement({ title: '', description: '', year: new Date().getFullYear().toString(), icon: 'award' })}
                  className="flex items-center gap-2 btn-primary py-2 px-4 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Achievement
                </button>
              </div>

              {editingAchievement && (
                <div className="glass-card p-5 mb-6 border-purple-700/30">
                  <h3 className="text-white font-semibold mb-4">{editingAchievement.id ? 'Edit' : 'New'} Achievement</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Title">
                      <input className={inputCls} value={editingAchievement.title ?? ''} onChange={e => setEditingAchievement(a => ({ ...a, title: e.target.value }))} placeholder="Achievement title" />
                    </Field>
                    <Field label="Year">
                      <input className={inputCls} value={editingAchievement.year ?? ''} onChange={e => setEditingAchievement(a => ({ ...a, year: e.target.value }))} placeholder="2024" />
                    </Field>
                    <Field label="Icon (lucide name)">
                      <select className={inputCls} value={editingAchievement.icon ?? 'award'} onChange={e => setEditingAchievement(a => ({ ...a, icon: e.target.value }))}>
                        {['award', 'star', 'shield', 'zap', 'check-circle', 'trophy', 'medal'].map(ic => (
                          <option key={ic} value={ic} style={{ background: '#0a0a0a' }}>{ic}</option>
                        ))}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Description">
                        <textarea className={`${inputCls} resize-none`} rows={3} value={editingAchievement.description ?? ''} onChange={e => setEditingAchievement(a => ({ ...a, description: e.target.value }))} placeholder="Achievement description" />
                      </Field>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveAchievement} disabled={saving} className="flex items-center gap-2 btn-primary py-2 px-4 text-sm disabled:opacity-50">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditingAchievement(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {achievements.map(a => (
                  <div key={a.id} className="glass-card p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">{a.title}</span>
                        <span className="text-gray-500 text-xs font-mono">{a.year}</span>
                      </div>
                      <p className="text-gray-600 text-xs mt-0.5 truncate">{a.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingAchievement(a)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:bg-purple-900/20 rounded transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteAchievement(a.id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BIBLE VERSES ── */}
          {tab === 'verses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Bible Verses ({verses.length})</h2>
                <button
                  onClick={() => setEditingVerse({ verse_text: '', reference: '', is_featured: false })}
                  className="flex items-center gap-2 btn-primary py-2 px-4 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Verse
                </button>
              </div>

              {editingVerse && (
                <div className="glass-card p-5 mb-6 border-purple-700/30">
                  <h3 className="text-white font-semibold mb-4">{editingVerse.id ? 'Edit' : 'New'} Verse</h3>
                  <div className="space-y-4">
                    <Field label="Reference (e.g., John 3:16)">
                      <input className={inputCls} value={editingVerse.reference ?? ''} onChange={e => setEditingVerse(v => ({ ...v, reference: e.target.value }))} placeholder="Jeremiah 29:11" />
                    </Field>
                    <Field label="Verse Text">
                      <textarea className={`${inputCls} resize-none`} rows={4} value={editingVerse.verse_text ?? ''} onChange={e => setEditingVerse(v => ({ ...v, verse_text: e.target.value }))} placeholder="Full verse text..." />
                    </Field>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editingVerse.is_featured ?? false} onChange={e => setEditingVerse(v => ({ ...v, is_featured: e.target.checked }))} className="w-4 h-4 accent-purple-500" />
                      <span className="text-gray-300 text-sm">Featured verse</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveVerse} disabled={saving} className="flex items-center gap-2 btn-primary py-2 px-4 text-sm disabled:opacity-50">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditingVerse(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {verses.map(v => (
                  <div key={v.id} className="glass-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-purple-400 font-semibold text-sm">{v.reference}</span>
                          {v.is_featured && <span className="px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded">Featured</span>}
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{v.verse_text}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => setEditingVerse(v)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:bg-purple-900/20 rounded transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteVerse(v.id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MESSAGES ── */}
          {tab === 'messages' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">
                  Messages ({messages.length})
                  {messages.filter(m => !m.is_read).length > 0 && (
                    <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      {messages.filter(m => !m.is_read).length} unread
                    </span>
                  )}
                </h2>
              </div>

              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className={`glass-card p-4 ${!m.is_read ? 'border-purple-700/40' : ''}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {!m.is_read && <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />}
                        <span className="text-white font-semibold text-sm">{m.name}</span>
                        <span className="text-gray-500 text-xs">{m.email}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-600 text-xs">{new Date(m.created_at).toLocaleDateString()}</span>
                        <button onClick={() => toggleRead(m.id, m.is_read)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-purple-400 rounded transition-colors" title={m.is_read ? 'Mark unread' : 'Mark read'}>
                          {m.is_read ? <Eye className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => deleteMessage(m.id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-purple-300 text-xs font-medium mb-1">{m.subject}</div>
                    <p className="text-gray-400 text-xs leading-relaxed">{m.message}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-12 text-gray-600">No messages yet.</div>
                )}
              </div>
            </div>
          )}

          {/* ── PERSONAL INFO ── */}
          {tab === 'personal' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Personal Information</h2>
                {!editingPersonal && (
                  <button
                    onClick={() => setEditingPersonal({ ...personalInfo })}
                    className="flex items-center gap-2 btn-primary py-2 px-4 text-sm"
                  >
                    <Pencil className="w-4 h-4" /> Edit Info
                  </button>
                )}
              </div>

              {editingPersonal ? (
                <div className="glass-card p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name">
                      <input className={inputCls} value={editingPersonal.full_name ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, full_name: e.target.value }))} />
                    </Field>
                    <Field label="Tagline">
                      <input className={inputCls} value={editingPersonal.tagline ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, tagline: e.target.value }))} />
                    </Field>
                    <Field label="Email">
                      <input type="email" className={inputCls} value={editingPersonal.email ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, email: e.target.value }))} />
                    </Field>
                    <Field label="Phone (optional)">
                      <input className={inputCls} value={editingPersonal.phone ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, phone: e.target.value || null }))} />
                    </Field>
                    <Field label="Location">
                      <input className={inputCls} value={editingPersonal.location ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, location: e.target.value }))} />
                    </Field>
                    <Field label="Profile Image URL">
                      <input className={inputCls} value={editingPersonal.profile_image_url ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, profile_image_url: e.target.value || null }))} placeholder="/268357fe-b849-415c-bc08-ba6544a96741.jpeg" />
                    </Field>
                    <Field label="Resume URL (optional)">
                      <input className={inputCls} value={editingPersonal.resume_url ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, resume_url: e.target.value || null }))} placeholder="https://..." />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Bio">
                        <textarea className={`${inputCls} resize-none`} rows={5} value={editingPersonal.bio ?? ''} onChange={e => setEditingPersonal(p => ({ ...p, bio: e.target.value }))} />
                      </Field>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={savePersonal} disabled={saving} className="flex items-center gap-2 btn-primary py-2 px-4 text-sm disabled:opacity-50">
                      <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setEditingPersonal(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                  </div>
                </div>
              ) : personalInfo ? (
                <div className="glass-card p-6 space-y-4">
                  {Object.entries({
                    'Full Name': personalInfo.full_name,
                    'Tagline': personalInfo.tagline,
                    'Email': personalInfo.email,
                    'Phone': personalInfo.phone ?? 'Not set',
                    'Location': personalInfo.location,
                    'Resume URL': personalInfo.resume_url ?? 'Not set',
                    'Profile Image': personalInfo.profile_image_url ?? 'Not set',
                  }).map(([key, value]) => (
                    <div key={key} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-500 text-sm w-32 flex-shrink-0">{key}</span>
                      <span className="text-white text-sm break-all">{value}</span>
                    </div>
                  ))}
                  <div className="py-2">
                    <div className="text-gray-500 text-sm mb-1">Bio</div>
                    <p className="text-white text-sm leading-relaxed">{personalInfo.bio}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No personal info configured.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
