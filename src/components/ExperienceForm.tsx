import React, { useState } from 'react';
import { Experience } from '../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ExperienceFormProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAdd = () => {
    const newExperience: Experience = {
      id: generateId(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate([...experience, newExperience]);
    setEditingId(newExperience.id);
    setFormData(newExperience);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData(exp);
  };

  const handleSave = () => {
    if (!formData.title || !formData.company || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedExperience = experience.map(exp =>
      exp.id === editingId ? { ...exp, ...formData } : exp
    );
    onUpdate(updatedExperience);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      onUpdate(experience.filter(exp => exp.id !== id));
    }
  };

  const handleChange = (field: keyof Experience, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderForm = () => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Add/Edit Experience</h3>
      
      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input
            type="text"
            className="form-input"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company *</label>
          <input
            type="text"
            className="form-input"
            value={formData.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="e.g., Google Inc."
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-input"
          value={formData.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., San Francisco, CA"
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Start Date *</label>
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
          <span className="form-label" style={{ margin: 0 }}>I currently work here</span>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          className="form-input form-textarea"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your responsibilities, achievements, and key contributions..."
          rows={6}
        />
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
        <h2 className="section-title">Work Experience</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💼</div>
          <div className="empty-state-text">No work experience added yet</div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Add Your First Experience
          </button>
        </div>
      ) : (
        experience.map((exp) => (
          <div key={exp.id} className="item-card">
            <div className="item-header">
              <div>
                <div className="item-title">{exp.title}</div>
                <div className="item-subtitle">{exp.company}</div>
                <div className="item-date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  {exp.location && ` • ${exp.location}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(exp)}
                  style={{ padding: '8px' }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(exp.id)}
                  style={{ padding: '8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="item-description">{exp.description}</div>
          </div>
        ))
      )}

      {editingId && renderForm()}
    </div>
  );
};

export default ExperienceForm; 