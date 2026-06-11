import { X, ExternalLink, Github, CheckCircle, Tag, Eye } from 'lucide-react';
import { Project } from '../types';
import { supabase } from '../lib/supabase';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const projectImages: Record<string, string> = {
  'Student Management System': 'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Inventory Management System': 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Personal Budget Tracker': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Library Management System': 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const imageUrl = project.image_url ?? projectImages[project.title] ?? 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800';

  const incrementViews = async () => {
    await supabase
      .from('projects')
      .update({ view_count: project.view_count + 1 })
      .eq('id', project.id);
  };

  const handleViewCode = () => {
    incrementViews();
    if (project.live_url) window.open(project.live_url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-gray-950 border border-purple-900/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-900/20"
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category badge */}
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 bg-purple-700 text-white text-xs font-semibold rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">{project.title}</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Eye className="w-4 h-4" />
                {project.view_count} views
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
              <Tag className="w-4 h-4" />
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-purple-900/30 border border-purple-700/30 text-purple-300 text-sm rounded-lg font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
                <CheckCircle className="w-4 h-4" />
                Key Features
              </div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            {project.live_url && (
              <button onClick={handleViewCode} className="flex-1 flex items-center justify-center gap-2 btn-primary">
                <ExternalLink className="w-4 h-4" />
                View Live
              </button>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 btn-outline"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {!project.live_url && !project.github_url && (
              <div className="flex-1 text-center text-gray-500 text-sm py-3">
                Links coming soon — stay tuned!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
