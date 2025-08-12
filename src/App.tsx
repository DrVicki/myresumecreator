import React, { useState } from 'react';
import { ResumeData, TabType } from './types';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import ProjectForm from './components/ProjectForm';
import CertificationForm from './components/CertificationForm';
import ResumePreview from './components/ResumePreview';
import { FileText, Briefcase, GraduationCap, FolderOpen, Award, User } from 'lucide-react';

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  projects: [],
  certifications: []
};

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'Personal Info', icon: <User size={20} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
  { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={20} /> },
  { id: 'preview', label: 'Preview', icon: <FileText size={20} /> }
];

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onUpdate={(personalInfo) => updateResumeData({ personalInfo })}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={resumeData.experience}
            onUpdate={(experience) => updateResumeData({ experience })}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onUpdate={(education) => updateResumeData({ education })}
          />
        );
      case 'projects':
        return (
          <ProjectForm
            projects={resumeData.projects}
            onUpdate={(projects) => updateResumeData({ projects })}
          />
        );
      case 'certifications':
        return (
          <CertificationForm
            certifications={resumeData.certifications}
            onUpdate={(certifications) => updateResumeData({ certifications })}
          />
        );
      case 'preview':
        return <ResumePreview resumeData={resumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '12px' }}>
          Resume Creator
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Build your professional resume with ease
        </p>
      </header>

      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App; 