import React, { useState } from 'react';
import { Certification } from '../types';
import { Plus, Edit, Trash2, Save, X, ExternalLink } from 'lucide-react';

interface CertificationFormProps {
  certifications: Certification[];
  onUpdate: (certifications: Certification[]) => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({ certifications, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Certification>>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAdd = () => {
    const newCertification: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    onUpdate([...certifications, newCertification]);
    setEditingId(newCertification.id);
    setFormData(newCertification);
  };

  const handleEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setFormData(cert);
  };

  const handleSave = () => {
    if (!formData.name || !formData.issuer || !formData.issueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedCertifications = certifications.map(cert =>
      cert.id === editingId ? { ...cert, ...formData } : cert
    );
    onUpdate(updatedCertifications);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      onUpdate(certifications.filter(cert => cert.id !== id));
    }
  };

  const handleChange = (field: keyof Certification, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderForm = () => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Add/Edit Certification</h3>
      
      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Certification Name *</label>
          <input
            type="text"
            className="form-input"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., AWS Certified Solutions Architect"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Issuing Organization *</label>
          <input
            type="text"
            className="form-input"
            value={formData.issuer || ''}
            onChange={(e) => handleChange('issuer', e.target.value)}
            placeholder="e.g., Amazon Web Services"
          />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Issue Date *</label>
          <input
            type="month"
            className="form-input"
            value={formData.issueDate || ''}
            onChange={(e) => handleChange('issueDate', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Expiry Date</label>
          <input
            type="month"
            className="form-input"
            value={formData.expiryDate || ''}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Credential ID</label>
        <input
          type="text"
          className="form-input"
          value={formData.credentialId || ''}
          onChange={(e) => handleChange('credentialId', e.target.value)}
          placeholder="e.g., AWS-123456789"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Verification URL</label>
        <input
          type="url"
          className="form-input"
          value={formData.url || ''}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://verify.certification-url.com"
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
        <h2 className="section-title">Certifications</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <div className="empty-state-text">No certifications added yet</div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={16} />
            Add Your First Certification
          </button>
        </div>
      ) : (
        certifications.map((cert) => (
          <div key={cert.id} className="item-card">
            <div className="item-header">
              <div>
                <div className="item-title">{cert.name}</div>
                <div className="item-subtitle">{cert.issuer}</div>
                <div className="item-date">
                  Issued: {cert.issueDate}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '8px' }}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(cert)}
                  style={{ padding: '8px' }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(cert.id)}
                  style={{ padding: '8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {editingId && renderForm()}
    </div>
  );
};

export default CertificationForm; 