import React, { useState } from 'react';
import { Education } from '../types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAdd = () => {
    const newEducation: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    };
    onUpdate([...education, newEducation]);
    setEditingId(newEducation.id);
    setFormData(newEducation);
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData(edu);
  };

  const handleSave = () => {
    if (!formData.degree || !formData.institution || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedEducation = education.map(edu =>
      edu.id === editingId ? { ...edu, ...formData } : edu
    );
    onUpdate(updatedEducation);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      onUpdate(education.filter(edu => edu.id !== id));
    }
  };

  const handleChange = (field: keyof Education, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderForm = () => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Add/Edit Education</h3>
      
      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Degree *</label>
          <input
            type="text"
            className="form-input"
            value={formData.degree || ''}
            onChange={(e) => handleChange('degree', e.target.value)}
            placeholder="e.g., Bachelor of Science in Computer Science"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Institution *</label>
          <input
            type="text"
            className="form-input"
            value={formData.institution || ''}
            onChange={(e) => handleChange('institution', e.target.value)}
            placeholder="e.g., Stanford University"
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
          placeholder="e.g., Stanford, CA"
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
          <span className="form-label" style={{ margin: 0 }}>I am currently studying here</span>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">GPA</label>
        <input
          type="text"
          className="form-input"
          value={formData.gpa || ''}
          onChange={(e) => handleChange('gpa', e.target.value)}
          placeholder="e.g., 3.8/4.0"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Relevant coursework, honors, activities, or achievements..."
          rows={4}
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
        <h2 className="section-title">Education</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎓</div>
          <div className="empty-state-text">No education entries added yet</div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Add Your First Education
          </button>
        </div>
      ) : (
        education.map((edu) => (
          <div key={edu.id} className="item-card">
            <div className="item-header">
              <div>
                <div className="item-title">{edu.degree}</div>
                <div className="item-subtitle">{edu.institution}</div>
                <div className="item-date">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(edu)}
                  style={{ padding: '8px' }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(edu.id)}
                  style={{ padding: '8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {edu.description && (
              <div className="item-description">{edu.description}</div>
            )}
          </div>
        ))
      )}

      {editingId && renderForm()}
    </div>
  );
};

export default EducationForm; 