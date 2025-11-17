import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const TemplatesPage = () => {
  const { mode } = useContext(Context);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const templates = [
    {
      id: 1,
      name: "Modern Tech",
      category: "Technology",
      thumbnail: "/api/placeholder/400/250",
      description: "Clean, minimalist design perfect for tech blogs and startups",
      features: ["Dark mode support", "Code highlighting", "Responsive design"],
      color: "#667eea"
    },
    {
      id: 2,
      name: "Travel Explorer",
      category: "Travel",
      thumbnail: "/api/placeholder/400/250",
      description: "Adventure-focused template with stunning photo galleries",
      features: ["Image galleries", "Map integration", "Trip planning tools"],
      color: "#4ecdc4"
    },
    {
      id: 3,
      name: "Food & Recipe",
      category: "Food",
      thumbnail: "/api/placeholder/400/250",
      description: "Delicious design for food bloggers and recipe sharing",
      features: ["Recipe cards", "Ingredient lists", "Cooking timers"],
      color: "#ff6b6b"
    },
    {
      id: 4,
      name: "Business Pro",
      category: "Business",
      thumbnail: "/api/placeholder/400/250",
      description: "Professional template for business and corporate blogs",
      features: ["Analytics dashboard", "Lead generation", "Newsletter integration"],
      color: "#f093fb"
    },
    {
      id: 5,
      name: "Health & Wellness",
      category: "Health",
      thumbnail: "/api/placeholder/400/250",
      description: "Calming design for health and wellness content",
      features: ["Progress tracking", "Exercise guides", "Meditation timers"],
      color: "#45b7d1"
    },
    {
      id: 6,
      name: "Lifestyle Magazine",
      category: "Lifestyle",
      thumbnail: "/api/placeholder/400/250",
      description: "Trendy magazine-style layout for lifestyle content",
      features: ["Magazine layout", "Social media integration", "Fashion galleries"],
      color: "#764ba2"
    },
    {
      id: 7,
      name: "Sports Central",
      category: "Sports",
      thumbnail: "/api/placeholder/400/250",
      description: "Dynamic template for sports news and analysis",
      features: ["Live scores", "Team statistics", "Match schedules"],
      color: "#f9ca24"
    },
    {
      id: 8,
      name: "Education Hub",
      category: "Education",
      thumbnail: "/api/placeholder/400/250",
      description: "Educational template for courses and learning content",
      features: ["Course modules", "Progress tracking", "Interactive quizzes"],
      color: "#e056fd"
    }
  ];

  const categories = ['All', 'Technology', 'Travel', 'Food', 'Business', 'Health', 'Lifestyle', 'Sports', 'Education'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = (template) => {
    // Navigate to dashboard with template data for CreateBlog component
    navigate('/dashboard', { 
      state: { 
        template: template.id,
        templateData: template,
        createBlog: true
      } 
    });
  };

  return (
    <div className={`templates-page ${mode === "dark" ? "dark-bg" : "light-bg"}`}>
      {/* Hero Section */}
      <section className="templates-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Beautiful Templates</h1>
            <p>Choose from our collection of professionally designed templates to make your content stand out and engage your audience.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Templates</span>
              </div>
              <div className="stat">
                <span className="stat-number">9</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="templates-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-grid-section">
        <div className="container">
          <div className="templates-grid">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-thumbnail">
                  <div 
                    className="template-preview"
                    style={{ backgroundColor: template.color }}
                  >
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-text"></div>
                      <div className="preview-text short"></div>
                      <div className="preview-image"></div>
                    </div>
                  </div>
                  <div className="template-overlay">
                    <button 
                      className="btn-preview"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      Preview
                    </button>
                    <button 
                      className="btn-use"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="template-info">
                  <div className="template-header">
                    <h3>{template.name}</h3>
                    <span className="template-category">{template.category}</span>
                  </div>
                  <p>{template.description}</p>
                  <div className="template-features">
                    {template.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="template-modal">
          <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}></div>
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setSelectedTemplate(null)}
            >
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedTemplate.name}</h2>
              <span className="modal-category">{selectedTemplate.category}</span>
            </div>
            <div className="modal-preview">
              <div 
                className="large-preview"
                style={{ backgroundColor: selectedTemplate.color }}
              >
                <div className="preview-content large">
                  <div className="preview-header"></div>
                  <div className="preview-text"></div>
                  <div className="preview-text"></div>
                  <div className="preview-text short"></div>
                  <div className="preview-image large"></div>
                  <div className="preview-text"></div>
                </div>
              </div>
            </div>
            <div className="modal-info">
              <p>{selectedTemplate.description}</p>
              <div className="modal-features">
                <h4>Features:</h4>
                <ul>
                  {selectedTemplate.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button 
                className="btn-use-large"
                onClick={() => handleUseTemplate(selectedTemplate)}
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .templates-page {
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .templates-hero {
          padding: 8rem 0 4rem;
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          color: white;
          text-align: center;
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .hero-content p {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ecdc4;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Filter Section */
        .templates-filter {
          padding: 3rem 0;
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
          border-bottom: 1px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.8rem 2rem;
          border: 2px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          background: transparent;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .filter-tab:hover,
        .filter-tab.active {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          transform: translateY(-2px);
        }

        /* Templates Grid */
        .templates-grid-section {
          padding: 4rem 0;
          background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        .template-card {
          background: ${mode === 'dark' 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          };
          border-radius: 20px;
          overflow: hidden;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3)'
            : '0 15px 35px rgba(0, 0, 0, 0.1)'
          };
          transition: all 0.4s ease;
          position: relative;
        }

        .template-card:hover {
          transform: translateY(-10px);
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(78, 205, 196, 0.2)'
            : '0 25px 50px rgba(102, 126, 234, 0.15)'
          };
        }

        .template-thumbnail {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .template-preview {
          width: 100%;
          height: 100%;
          padding: 20px;
          position: relative;
        }

        .preview-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .preview-header {
          height: 12px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 6px;
          width: 60%;
        }

        .preview-text {
          height: 8px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 4px;
          width: 100%;
        }

        .preview-text.short {
          width: 70%;
        }

        .preview-image {
          height: 60px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          margin: 8px 0;
        }

        .template-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .template-card:hover .template-overlay {
          opacity: 1;
        }

        .btn-preview,
        .btn-use {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-preview {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-preview:hover {
          background: white;
          color: #333;
        }

        .btn-use {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
        }

        .btn-use:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(78, 205, 196, 0.4);
        }

        .template-info {
          padding: 2rem;
        }

        .template-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .template-info h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .template-category {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .template-info p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .template-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .feature-tag {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Modal Styles */
        .template-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
        }

        .modal-content {
          position: relative;
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          border-radius: 20px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
        }

        .modal-header {
          padding: 2rem;
          border-bottom: 1px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
        }

        .modal-header h2 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 0.5rem;
        }

        .modal-category {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .modal-preview {
          padding: 2rem;
        }

        .large-preview {
          height: 300px;
          border-radius: 15px;
          padding: 30px;
        }

        .preview-content.large {
          gap: 12px;
        }

        .preview-image.large {
          height: 100px;
          margin: 12px 0;
        }

        .modal-info {
          padding: 0 2rem 2rem;
        }

        .modal-info p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .modal-features h4 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
        }

        .modal-features ul {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          margin-bottom: 2rem;
        }

        .modal-features li {
          margin-bottom: 0.5rem;
        }

        .btn-use-large {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .btn-use-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(78, 205, 196, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-stats {
            flex-direction: column;
            gap: 2rem;
          }

          .filter-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 1rem;
          }

          .templates-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            width: 95%;
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplatesPage;