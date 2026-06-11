import { useState } from 'react';
import { Folder, Eye, Tag, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
  onProjectView: () => void;
}

const projectImages: Record<string, string> = {
  'Student Management System': 'https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Inventory Management System': 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Personal Budget Tracker': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Library Management System': 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400',
};

export default function Projects({ projects, onProjectView }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    onProjectView();
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-purple-300 text-sm font-medium mb-4">
            <Folder className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            My <span className="purple-gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Systems built, bugs defeated, and coffee consumed. Here's proof that I actually do things.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => {
            const image = project.image_url ?? projectImages[project.title] ?? 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400';
            return (
              <div
                key={project.id}
                className="glass-card overflow-hidden card-hover group cursor-pointer"
                onClick={() => handleViewProject(project)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* View count */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-300">
                    <Eye className="w-3 h-3" />
                    {project.view_count}
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-purple-700/80 text-white text-xs font-semibold rounded-lg">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded font-mono"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-gray-500 text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2 border border-purple-700/40 text-purple-400 hover:bg-purple-700/20 rounded-lg text-sm font-medium transition-all duration-200 group-hover:border-purple-600/60">
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
