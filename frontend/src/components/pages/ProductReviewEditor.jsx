import React, { useState, useContext } from 'react';
import { ArrowLeft, Save, Download, Eye, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const ProductReviewEditor = () => {
  const navigate = useNavigate();
  const { mode } = useContext(Context);
  const [activeSection, setActiveSection] = useState('overview');
  const [showPreview, setShowPreview] = useState(false);
  
  const [content, setContent] = useState({
    productName: '',
    overview: '',
    features: '',
    pros: '',
    cons: '',
    userExperience: '',
    verdict: ''
  });

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features & Specifications', icon: '⚙️' },
    { id: 'pros', label: 'Pros', icon: '✅' },
    { id: 'cons', label: 'Cons', icon: '❌' },
    { id: 'userExperience', label: 'User Experience', icon: '👤' },
    { id: 'verdict', label: 'Final Verdict', icon: '⭐' }
  ];

  const handleContentChange = (section, value) => {
    setContent(prev => ({ ...prev, [section]: value }));
  };

  const handleSave = () => {
    console.log('Saving review:', content);
    alert('Review saved successfully!');
  };

  const handleExport = () => {
    const reviewText = `
# ${content.productName || 'Product Review'}

## Overview
${content.overview}

## Features & Specifications
${content.features}

## Pros
${content.pros}

## Cons
${content.cons}

## User Experience
${content.userExperience}

## Final Verdict
${content.verdict}
    `;
    
    const blob = new Blob([reviewText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.productName || 'product'}-review.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSectionPrompt = (section) => {
    const prompts = {
      overview: "Provide a brief introduction to the product, its purpose, and who it's for.",
      features: "List key features, specifications, and technical details of the product.",
      pros: "Highlight the strengths and advantages of this product.",
      cons: "Discuss any drawbacks, limitations, or areas for improvement.",
      userExperience: "Describe the overall experience of using this product.",
      verdict: "Give your final recommendation and rating."
    };
    return prompts[section] || '';
  };

  return (
    <div className="product-review-page">
      {/* Header */}
      <header className="review-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => navigate('/templates')} className="btn-back">
                <ArrowLeft className="icon" />
                <span>Back to Templates</span>
              </button>
              <div className="header-divider"></div>
              <h1>📝 Product Review Editor</h1>
            </div>
            
            <div className="header-actions">
              <button onClick={() => setShowPreview(!showPreview)} className="btn-preview">
                <Eye className="icon" />
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button onClick={handleSave} className="btn-save">
                <Save className="icon" />
                Save
              </button>
              <button onClick={handleExport} className="btn-export">
                <Download className="icon" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="review-content">
        <div className="container">
          {/* Product Name Input */}
          <div className="product-name-section">
            <input
              type="text"
              placeholder="Enter Product Name..."
              value={content.productName}
              onChange={(e) => handleContentChange('productName', e.target.value)}
              className="product-name-input"
            />
          </div>

          {showPreview ? (
            // Preview Mode
            <div className="preview-mode">
              <article className="preview-article">
                <h1 className="preview-title">{content.productName || 'Product Review'}</h1>
                
                {sections.map(section => (
                  content[section.id] && (
                    <div key={section.id} className="preview-section">
                      <h2 className="preview-section-title">
                        <span className="section-icon">{section.icon}</span>
                        {section.label}
                      </h2>
                      <div className="preview-section-content">
                        {content[section.id]}
                      </div>
                    </div>
                  )
                ))}
              </article>
            </div>
          ) : (
            // Edit Mode
            <div className="editor-layout">
              {/* Sidebar Navigation */}
              <aside className="editor-sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Sections</h3>
                  <nav className="sections-nav">
                    {sections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`section-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                      >
                        <span className="section-icon">{section.icon}</span>
                        <span className="section-label">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Editor Area */}
              <main className="editor-main">
                <div className="editor-container">
                  {/* Section Header */}
                  <div className="section-header">
                    <div className="section-info">
                      <h2 className="section-title">
                        <span className="title-icon">{sections.find(s => s.id === activeSection)?.icon}</span>
                        {sections.find(s => s.id === activeSection)?.label}
                      </h2>
                      <p className="section-prompt">
                        {getSectionPrompt(activeSection)}
                      </p>
                    </div>
                    <button className="btn-ai-assist">
                      <Sparkles className="icon" />
                      AI Assist
                    </button>
                  </div>

                  {/* Text Editor */}
                  <div className="editor-area">
                    <textarea
                      value={content[activeSection]}
                      onChange={(e) => handleContentChange(activeSection, e.target.value)}
                      placeholder={`Write your ${sections.find(s => s.id === activeSection)?.label.toLowerCase()} here...`}
                      className="editor-textarea"
                    />
                    
                    {/* Character Count */}
                    <div className="editor-stats">
                      <span>{content[activeSection]?.length || 0} characters</span>
                      <span>{content[activeSection]?.split(/\s+/).filter(Boolean).length || 0} words</span>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="tips-card">
                  <div className="tips-content">
                    <FileText className="tips-icon" />
                    <div className="tips-text">
                      <h4 className="tips-title">Writing Tip</h4>
                      <p className="tips-description">
                        {activeSection === 'overview' && "Start with a hook that captures the product's main value proposition."}
                        {activeSection === 'features' && "Be specific with numbers and technical details where applicable."}
                        {activeSection === 'pros' && "Focus on standout features that differentiate this product."}
                        {activeSection === 'cons' && "Be honest but constructive with criticism."}
                        {activeSection === 'userExperience' && "Share real-world usage scenarios and impressions."}
                        {activeSection === 'verdict' && "Summarize your overall impression and who should buy this product."}
                      </p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-review-page {
          min-height: 100vh;
          background: ${mode === 'dark' 
            ? 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)'
          };
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Styles */
        .review-header {
          background: ${mode === 'dark'
            ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          };
          padding: 1.5rem 0;
          box-shadow: ${mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.4)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
          };
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .header-left h1 {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin: 0;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .btn-back:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(-3px);
        }

        .header-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 255, 255, 0.3);
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-preview,
        .btn-save,
        .btn-export {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .btn-preview {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-save {
          background: ${mode === 'dark' ? '#3498db' : '#ffffff'};
          color: ${mode === 'dark' ? 'white' : '#667eea'};
        }

        .btn-export {
          background: ${mode === 'dark' 
            ? 'linear-gradient(45deg, #1abc9c, #16a085)'
            : 'linear-gradient(45deg, #10b981, #059669)'
          };
          color: white;
        }

        .btn-preview:hover,
        .btn-save:hover,
        .btn-export:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .icon {
          width: 18px;
          height: 18px;
        }

        /* Main Content */
        .review-content {
          padding: 3rem 0;
          min-height: calc(100vh - 120px);
        }

        /* Product Name Section */
        .product-name-section {
          margin-bottom: 3rem;
        }

        .product-name-input {
          width: 100%;
          padding: 1.5rem 2rem;
          background: ${mode === 'dark' 
            ? 'rgba(44, 62, 80, 0.6)'
            : 'rgba(255, 255, 255, 0.9)'
          };
          border: 2px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          border-radius: 20px;
          font-size: 2rem;
          font-weight: 800;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .product-name-input::placeholder {
          color: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }

        .product-name-input:focus {
          outline: none;
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          box-shadow: 0 0 0 4px ${mode === 'dark' 
            ? 'rgba(78, 205, 196, 0.1)'
            : 'rgba(102, 126, 234, 0.1)'
          };
        }

        /* Preview Mode */
        .preview-mode {
          background: ${mode === 'dark' 
            ? 'rgba(44, 62, 80, 0.4)'
            : 'rgba(255, 255, 255, 0.9)'
          };
          backdrop-blur: 20px;
          border-radius: 24px;
          padding: 4rem;
          box-shadow: ${mode === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.4)'
            : '0 20px 60px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)'
          };
        }

        .preview-article {
          max-width: 900px;
          margin: 0 auto;
        }

        .preview-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 3rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          line-height: 1.2;
        }

        .preview-section {
          margin-bottom: 3rem;
        }

        .preview-section-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .preview-section-content {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-size: 1.1rem;
          line-height: 1.8;
          white-space: pre-wrap;
        }

        /* Editor Layout */
        .editor-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* Sidebar */
        .editor-sidebar {
          position: sticky;
          top: 140px;
        }

        .sidebar-content {
          background: ${mode === 'dark' 
            ? 'rgba(44, 62, 80, 0.6)'
            : 'rgba(255, 255, 255, 0.9)'
          };
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.08)'
          };
          border: 1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)'
          };
        }

        .sidebar-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          margin-bottom: 1.5rem;
        }

        .sections-nav {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .section-nav-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .section-nav-btn:hover {
          background: ${mode === 'dark' 
            ? 'rgba(78, 205, 196, 0.1)'
            : 'rgba(102, 126, 234, 0.05)'
          };
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .section-nav-btn.active {
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #4ecdc4 0%, #45b8b0 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          };
          border-color: transparent;
          color: white;
          box-shadow: ${mode === 'dark'
            ? '0 8px 20px rgba(78, 205, 196, 0.3)'
            : '0 8px 20px rgba(102, 126, 234, 0.3)'
          };
        }

        .section-icon {
          font-size: 1.5rem;
        }

        .section-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .section-nav-btn.active .section-label {
          color: white;
        }

        /* Editor Main */
        .editor-main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .editor-container {
          background: ${mode === 'dark' 
            ? 'rgba(44, 62, 80, 0.4)'
            : 'rgba(255, 255, 255, 0.9)'
          };
          backdrop-filter: blur(10px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: ${mode === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.4)'
            : '0 20px 60px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)'
          };
        }

        /* Section Header */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          background: ${mode === 'dark' 
            ? 'rgba(52, 73, 94, 0.6)'
            : 'rgba(248, 249, 250, 0.8)'
          };
          border-bottom: 1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)'
          };
          gap: 2rem;
        }

        .section-info {
          flex: 1;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .title-icon {
          font-size: 2rem;
        }

        .section-prompt {
          color: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .btn-ai-assist {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.5rem;
          background: ${mode === 'dark' 
            ? 'rgba(155, 89, 182, 0.2)'
            : 'rgba(155, 89, 182, 0.1)'
          };
          color: ${mode === 'dark' ? '#bb86fc' : '#9b59b6'};
          border: 1px solid ${mode === 'dark' 
            ? 'rgba(187, 134, 252, 0.3)'
            : 'rgba(155, 89, 182, 0.3)'
          };
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-ai-assist:hover {
          background: ${mode === 'dark' 
            ? 'rgba(155, 89, 182, 0.3)'
            : 'rgba(155, 89, 182, 0.2)'
          };
          transform: translateY(-2px);
        }

        /* Editor Area */
        .editor-area {
          padding: 2rem;
        }

        .editor-textarea {
          width: 100%;
          min-height: 500px;
          padding: 1.5rem;
          background: ${mode === 'dark' 
            ? 'rgba(26, 26, 46, 0.6)'
            : 'rgba(255, 255, 255, 0.5)'
          };
          border: 2px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)'
          };
          border-radius: 16px;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.95rem;
          line-height: 1.8;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .editor-textarea::placeholder {
          color: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }

        .editor-textarea:focus {
          outline: none;
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          box-shadow: 0 0 0 4px ${mode === 'dark' 
            ? 'rgba(78, 205, 196, 0.1)'
            : 'rgba(102, 126, 234, 0.1)'
          };
        }

        .editor-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid ${mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)'
          };
          color: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* Tips Card */
        .tips-card {
          background: ${mode === 'dark' 
            ? 'rgba(52, 152, 219, 0.1)'
            : 'rgba(59, 130, 246, 0.05)'
          };
          backdrop-filter: blur(10px);
          border: 1px solid ${mode === 'dark' 
            ? 'rgba(52, 152, 219, 0.3)'
            : 'rgba(59, 130, 246, 0.2)'
          };
          border-radius: 16px;
          padding: 1.5rem;
        }

        .tips-content {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
        }

        .tips-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: ${mode === 'dark' ? '#3498db' : '#3b82f6'};
          margin-top: 2px;
        }

        .tips-text {
          flex: 1;
        }

        .tips-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: ${mode === 'dark' ? '#3498db' : '#3b82f6'};
          margin-bottom: 0.5rem;
        }

        .tips-description {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .editor-layout {
            grid-template-columns: 1fr;
          }

          .editor-sidebar {
            position: static;
          }

          .sections-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .section-nav-btn {
            min-width: 180px;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: stretch;
          }

          .header-left {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .header-divider {
            display: none;
          }

          .header-actions {
            flex-direction: column;
          }

          .btn-preview,
          .btn-save,
          .btn-export {
            width: 100%;
            justify-content: center;
          }

          .product-name-input {
            font-size: 1.5rem;
            padding: 1rem 1.5rem;
          }

          .preview-mode {
            padding: 2rem;
          }

          .preview-title {
            font-size: 2rem;
          }

          .preview-section-title {
            font-size: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-ai-assist {
            width: 100%;
            justify-content: center;
          }

          .editor-area {
            padding: 1.5rem;
          }

          .editor-textarea {
            min-height: 400px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductReviewEditor;