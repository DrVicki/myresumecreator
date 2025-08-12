import React from 'react';
import { PersonalInfo } from '../types';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onUpdate: (personalInfo: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, onUpdate }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...personalInfo, [field]: value });
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Personal Information</h2>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-input"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input
            type="tel"
            className="form-input"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location *</label>
        <input
          type="text"
          className="form-input"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, State/Province, Country"
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input
            type="url"
            className="form-input"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub</label>
          <input
            type="url"
            className="form-input"
            value={personalInfo.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Website</label>
        <input
          type="url"
          className="form-input"
          value={personalInfo.website}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary *</label>
        <textarea
          className="form-input form-textarea"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
          rows={6}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm; 