# Resume Creator

A modern, feature-rich resume builder application built with React and TypeScript. Create professional resumes with ease, featuring sections for experience, education, projects, and certifications.

## Features

### 📝 Comprehensive Resume Sections
- **Personal Information**: Name, contact details, professional summary, and social links
- **Work Experience**: Job titles, companies, dates, locations, and detailed descriptions
- **Education**: Degrees, institutions, dates, GPA, and relevant coursework
- **Projects**: Project names, descriptions, technologies, and links to live demos/GitHub
- **Certifications**: Certification names, issuers, dates, credential IDs, and verification URLs

### 🎨 Modern UI/UX
- Clean, professional design with gradient backgrounds
- Responsive layout that works on desktop and mobile
- Intuitive tab-based navigation
- Beautiful form components with validation
- Real-time preview of your resume

### 💾 Export Options
- **Print**: Direct printing from the browser
- **PDF Download**: High-quality PDF export with proper formatting
- Professional file naming with your name

### 🔧 Technical Features
- Built with React 18 and TypeScript
- Modern CSS with gradients and animations
- Form validation and error handling
- Responsive design for all screen sizes
- Clean, maintainable code structure

## Installation

1. **Clone the repository** (if you have the source code):
   ```bash
   git clone <repository-url>
   cd MyResumeCreator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Getting Started
1. Start with the **Personal Info** tab to enter your basic information
2. Add your **Experience** entries with job details and descriptions
3. Include your **Education** background and achievements
4. Showcase your **Projects** with technologies and links
5. Add any relevant **Certifications** with verification details
6. Preview your resume in the **Preview** tab
7. Export as PDF or print when ready

### Tips for Best Results
- **Professional Summary**: Write a compelling 2-3 sentence summary highlighting your key strengths
- **Experience Descriptions**: Use action verbs and quantify achievements when possible
- **Project Details**: Include technologies used and links to live demos or GitHub repositories
- **Certifications**: Add verification URLs when available for credibility

## Project Structure

```
src/
├── components/
│   ├── PersonalInfoForm.tsx    # Personal information form
│   ├── ExperienceForm.tsx      # Work experience management
│   ├── EducationForm.tsx       # Education entries
│   ├── ProjectForm.tsx         # Project portfolio
│   ├── CertificationForm.tsx   # Certifications
│   └── ResumePreview.tsx       # Resume preview and export
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
└── index.css                   # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Lucide React**: Beautiful icons
- **React-to-Print**: Print functionality
- **html2canvas**: HTML to canvas conversion
- **jsPDF**: PDF generation
- **CSS3**: Modern styling with gradients and animations

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the browser console for error messages
2. Ensure all dependencies are properly installed
3. Try clearing your browser cache
4. Create an issue in the repository

---

**Happy Resume Building!** 🚀 