import React, { useRef } from 'react';
import { ResumeData } from '../types';
import { Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const hasData = () => {
    return (
      resumeData.personalInfo.firstName ||
      resumeData.personalInfo.lastName ||
      resumeData.personalInfo.email ||
      resumeData.experience.length > 0 ||
      resumeData.education.length > 0 ||
      resumeData.projects.length > 0 ||
      resumeData.certifications.length > 0
    );
  };

  if (!hasData()) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📄</div>
        <div className="empty-state-text">No resume data to preview</div>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Please fill in your information in the other tabs to see a preview here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Resume Preview</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            Print
          </button>
          <button className="btn btn-primary" onClick={handleDownloadPDF}>
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="resume-preview" ref={resumeRef}>
        {/* Header */}
        <div className="resume-header">
          <h1 className="resume-name">
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          <div className="resume-contact">
            {resumeData.personalInfo.email && (
              <div>{resumeData.personalInfo.email}</div>
            )}
            {resumeData.personalInfo.phone && (
              <div>{resumeData.personalInfo.phone}</div>
            )}
            {resumeData.personalInfo.location && (
              <div>{resumeData.personalInfo.location}</div>
            )}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
              {resumeData.personalInfo.linkedin && (
                <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {resumeData.personalInfo.github && (
                <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {resumeData.personalInfo.website && (
                <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="resume-section">
            <h2 className="resume-section-title">Professional Summary</h2>
            <p style={{ lineHeight: '1.6', color: '#495057' }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Professional Experience</h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <div className="resume-item-title">{exp.title}</div>
                    <div className="resume-item-company">{exp.company}</div>
                  </div>
                  <div className="resume-item-date">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.location && (
                  <div className="resume-item-company">{exp.location}</div>
                )}
                <div className="resume-item-description">{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <div className="resume-item-title">{edu.degree}</div>
                    <div className="resume-item-company">{edu.institution}</div>
                  </div>
                  <div className="resume-item-date">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.location && (
                  <div className="resume-item-company">{edu.location}</div>
                )}
                {edu.gpa && (
                  <div className="resume-item-company">GPA: {edu.gpa}</div>
                )}
                {edu.description && (
                  <div className="resume-item-description">{edu.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <div className="resume-item-title">{project.name}</div>
                    <div className="resume-item-company">{project.technologies}</div>
                  </div>
                  <div className="resume-item-date">
                    {project.startDate && project.endDate && (
                      `${formatDate(project.startDate)} - ${project.current ? 'Present' : formatDate(project.endDate)}`
                    )}
                  </div>
                </div>
                <div className="resume-item-description">{project.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Certifications</h2>
            {resumeData.certifications.map((cert) => (
              <div key={cert.id} className="resume-item">
                <div className="resume-item-header">
                  <div>
                    <div className="resume-item-title">{cert.name}</div>
                    <div className="resume-item-company">{cert.issuer}</div>
                  </div>
                  <div className="resume-item-date">
                    Issued: {formatDate(cert.issueDate)}
                    {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                  </div>
                </div>
                {cert.credentialId && (
                  <div className="resume-item-company">Credential ID: {cert.credentialId}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview; 