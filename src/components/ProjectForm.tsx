import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';

interface ProjectFormProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projects, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAdd = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: '',
      startDate: '',
      endDate: '',
      current: false
    };
    onUpdate([...projects, newProject]);
    setEditingId(newProject.id);
    setFormData(newProject);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.technologies) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedProjects = projects.map(project =>
      project.id === editingId ? { ...project, ...formData } : project
    );
    onUpdate(updatedProjects);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onUpdate(projects.filter(project => project.id !== id));
    }
  };

  const handleChange = (field: keyof Project, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderForm = () => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Add/Edit Project</h3>
      
      <div className="form-group">
        <label className="form-label">Project Name *</label>
        <input
          type="text"
          className="form-input"
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., E-commerce Platform"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          className="form-input form-textarea"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what the project does, your role, and key features..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Technologies Used *</label>
        <input
          type="text"
          className="form-input"
          value={formData.technologies || ''}
          onChange={(e) => handleChange('technologies', e.target.value)}
          placeholder="e.g., React, Node.js, MongoDB, AWS"
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Live URL</label>
          <input
            type="url"
            className="form-input"
            value={formData.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="https://yourproject.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub Repository</label>
          <input
            type="url"
            className="form-input"
            value={formData.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/username/project"
          />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="month"
            className="form-input"
            value={formData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="month"
            className="form-input"
            value={formData.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.current}
          />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.current || false}
            onChange={(e) => handleChange('current', e.target.checked)}
          />
          <span className="form-label" style={{ margin: 0 }}>This is an ongoing project</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={handleCancel}>
          <X size={16} />
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} />
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💻</div>
          <div className="empty-state-text">No projects added yet</div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Add Your First Project
          </button>
        </div>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="item-card">
            <div className="item-header">
              <div>
                <div className="item-title">{project.name}</div>
                <div className="item-subtitle">{project.technologies}</div>
                <div className="item-date">
                  {project.startDate && project.endDate && (
                    `${project.startDate} - ${project.current ? 'Present' : project.endDate}`
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '8px' }}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '8px' }}
                  >
                    <Github size={14} />
                  </a>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(project)}
                  style={{ padding: '8px' }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(project.id)}
                  style={{ padding: '8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="item-description">{project.description}</div>
          </div>
        ))
      )}

      {editingId && renderForm()}
    </div>
  );
};

export default ProjectForm; 