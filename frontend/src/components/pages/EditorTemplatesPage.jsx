import React, { useState, useContext } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';


const EditorTemplatesPage = () => {
  const navigate = useNavigate();

  const { mode } = useContext(Context);
  const [activeFeature, setActiveFeature] = useState('grammar');

  const editorFeatures = [
    {
      id: 'grammar',
      title: 'Grammar & Spell Check',
      description: 'Advanced AI-powered grammar checking with contextual suggestions',
      icon: '📝',
      demo: {
        before: 'This blog post are going to be amazing for reader\'s who want to learn.',
        after: 'This blog post is going to be amazing for readers who want to learn.',
        suggestions: ['Verb agreement correction', 'Apostrophe usage fix', 'Improved clarity']
      }
    },
    {
      id: 'tone',
      title: 'Tone Optimization',
      description: 'Adjust your writing tone to match your audience and purpose',
      icon: '🎯',
      demo: {
        before: 'Hey guys, this stuff is pretty cool I guess.',
        after: 'This innovative solution offers remarkable benefits for modern professionals.',
        suggestions: ['Professional tone', 'Confidence boost', 'Engagement improvement']
      }
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Real-time SEO suggestions to improve your content visibility',
      icon: '🚀',
      demo: {
        before: 'Tips for better writing',
        after: 'Essential Content Writing Tips: 10 Proven Strategies to Boost Engagement in 2024',
        suggestions: ['Keyword optimization', 'Title enhancement', 'Meta description']
      }
    },
    {
      id: 'readability',
      title: 'Readability Analysis',
      description: 'Analyze and improve content readability for better user engagement',
      icon: '📊',
      demo: {
        before: 'The implementation of sophisticated methodologies facilitates enhanced comprehension.',
        after: 'Using smart methods helps people understand better.',
        suggestions: ['Simplified language', 'Shorter sentences', 'Better flow']
      }
    }
  ];

  const writingTemplates = [
    {
      id: 1,
      title: 'How-To Guide',
      description: 'Step-by-step tutorial template',
      structure: ['Introduction', 'Prerequisites', 'Step-by-step process', 'Tips & tricks', 'Conclusion'],
      category: 'Educational',
      estimatedTime: '15-30 min'
    },
    {
      id: 2,
      title: 'Product Review',
      description: 'Comprehensive product evaluation',
      structure: ['Overview', 'Features & specifications', 'Pros & cons', 'User experience', 'Final verdict'],
      category: 'Review',
      estimatedTime: '20-40 min'
    },
    {
      id: 3,
      title: 'Personal Story',
      description: 'Engaging narrative template',
      structure: ['Hook opening', 'Background context', 'Main story', 'Lessons learned', 'Call to action'],
      category: 'Personal',
      estimatedTime: '25-45 min'
    },
    {
      id: 4,
      title: 'Industry Analysis',
      description: 'Professional market insights',
      structure: ['Market overview', 'Key trends', 'Analysis & data', 'Future predictions', 'Actionable insights'],
      category: 'Business',
      estimatedTime: '30-60 min'
    }
  ];

  const aiTools = [
    {
      name: 'Content Ideas Generator',
      description: 'Generate unlimited blog post ideas based on your niche',
      icon: '💡',
      action: 'Generate Ideas'
    },
    {
      name: 'Headline Creator',
      description: 'Create compelling headlines that drive clicks',
      icon: '🎪',
      action: 'Create Headlines'
    },
    {
      name: 'Content Expander',
      description: 'Expand short ideas into full paragraphs',
      icon: '📈',
      action: 'Expand Content'
    },
    {
      name: 'Image Suggestion',
      description: 'Get AI-powered image recommendations for your content',
      icon: '🖼️',
      action: 'Suggest Images'
    }
  ];

  const handleStartWriting = (template) => {
  if (template.title === 'Product Review') {
    navigate('/product-review');
  } else if (template.title === 'How-To Guide') {
    navigate('/guide');
  }else if (template.title === 'Personal Story') {  
    navigate('/personal-story');
  } else if (template.title === 'Industry Analysis') {
    navigate('/industry-analysis');
  }else {
    alert(`Starting with ${template.title} template! This would redirect to the create blog page with the template structure pre-loaded.`);
  }
};

const handleToolAction = (tool) => {
  if (tool.name === 'Content Ideas Generator') {
    navigate('/content-ideas');
  } else if (tool.name === 'Headline Creator') {
    navigate('/headline-creator');
  } else if (tool.name === 'Content Expander') {
    navigate('/content-expander');
  } else if(tool.name === 'Image Suggestion') {
    navigate('/image-suggestion');
  }
  else {
    alert(`Activating ${tool.name}! This would open the AI tool interface.`);
  }
};

  return (
    <div className={`editor-page ${mode === "dark" ? "dark-bg" : "light-bg"}`}>
      {/* Hero Section */}
      <section className="editor-hero">
        <div className="container">
          <div className="hero-content">
            <h1>AI-Powered Editor</h1>
            <p>Smart writing assistant that helps you craft perfect stories with grammar checks, tone suggestions, and SEO optimization.</p>
            <div className="hero-features">
              <div className="feature-highlight">
                <span className="feature-icon">🤖</span>
                <span>AI-Assisted Writing</span>
              </div>
              <div className="feature-highlight">
                <span className="feature-icon">⚡</span>
                <span>Real-time Suggestions</span>
              </div>
              <div className="feature-highlight">
                <span className="feature-icon">🎯</span>
                <span>SEO Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Demo */}
      <section className="features-demo">
        <div className="container">
          <h2>See AI Editor in Action</h2>
          <div className="demo-interface">
            <div className="demo-tabs">
              {editorFeatures.map((feature) => (
                <button
                  key={feature.id}
                  className={`demo-tab ${activeFeature === feature.id ? 'active' : ''}`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <span className="tab-icon">{feature.icon}</span>
                  {feature.title}
                </button>
              ))}
            </div>
            <div className="demo-content">
              {editorFeatures
                .filter(feature => feature.id === activeFeature)
                .map(feature => (
                  <div key={feature.id} className="demo-panel">
                    <div className="demo-description">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                    <div className="demo-comparison">
                      <div className="demo-before">
                        <h4>Before AI Enhancement</h4>
                        <div className="demo-text">
                          {feature.demo.before}
                        </div>
                      </div>
                      <div className="demo-arrow">→</div>
                      <div className="demo-after">
                        <h4>After AI Enhancement</h4>
                        <div className="demo-text enhanced">
                          {feature.demo.after}
                        </div>
                      </div>
                    </div>
                    <div className="demo-suggestions">
                      <h4>AI Suggestions Applied:</h4>
                      <ul>
                        {feature.demo.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Writing Templates */}
      <section className="writing-templates">
        <div className="container">
          <h2>Smart Writing Templates</h2>
          <p className="section-subtitle">Pre-built structures to help you write faster and more effectively</p>
          <div className="templates-grid">
            {writingTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <h3>{template.title}</h3>
                  <div className="template-meta">
                    <span className="category">{template.category}</span>
                    <span className="time">{template.estimatedTime}</span>
                  </div>
                </div>
                <p className="template-description">{template.description}</p>
                <div className="template-structure">
                  <h4>Structure:</h4>
                  <ol>
                    {template.structure.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                <button 
                  className="btn-start-writing"
                  onClick={() => handleStartWriting(template)}
                >
                  Start Writing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section className="ai-tools">
        <div className="container">
          <h2>AI Writing Tools</h2>
          <p className="section-subtitle">Powerful AI assistants to enhance your writing process</p>
          <div className="tools-grid">
            {aiTools.map((tool, index) => (
              <div key={index} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <button 
                  className="btn-tool-action"
                  onClick={() => handleToolAction(tool)}
                >
                  {tool.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Preview */}
      <section className="editor-preview">
        <div className="container">
          <h2>Advanced Editor Interface</h2>
          <div className="preview-container">
            <div className="editor-mockup">
              <div className="editor-toolbar">
                <div className="toolbar-section">
                  <button className="toolbar-btn active">Format</button>
                  <button className="toolbar-btn">AI Assist</button>
                  <button className="toolbar-btn">SEO</button>
                  <button className="toolbar-btn">Analytics</button>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-save">Save</button>
                  <button className="btn-publish">Publish</button>
                </div>
              </div>
              <div className="editor-content">
                <div className="editor-sidebar">
                  <div className="sidebar-section">
                    <h4>AI Suggestions</h4>
                    <div className="suggestion-item">
                      <span className="suggestion-type">Grammar</span>
                      <p>Consider changing "good" to "effective"</p>
                    </div>
                    <div className="suggestion-item">
                      <span className="suggestion-type">SEO</span>
                      <p>Add target keyword in first paragraph</p>
                    </div>
                    <div className="suggestion-item">
                      <span className="suggestion-type">Tone</span>
                      <p>Make opening more engaging</p>
                    </div>
                  </div>
                  <div className="sidebar-section">
                    <h4>Content Stats</h4>
                    <div className="stat-item">
                      <span>Words: 1,247</span>
                    </div>
                    <div className="stat-item">
                      <span>Reading time: 5 min</span>
                    </div>
                    <div className="stat-item">
                      <span>SEO Score: 85%</span>
                    </div>
                  </div>
                </div>
                <div className="editor-main">
                  <div className="editor-writing-area">
                    <h1 className="editor-title">Your Blog Title Here</h1>
                    <div className="editor-text">
                      <p>Start writing your amazing content here. The AI editor will provide real-time suggestions to improve your grammar, tone, and SEO optimization.</p>
                      <p className="highlight">This sentence has been enhanced by AI for better readability and engagement.</p>
                      <p>Continue writing and watch as the AI helps you create compelling content that resonates with your audience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="editor-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience AI-Powered Writing?</h2>
            <p>Join thousands of writers who have transformed their content creation process with our intelligent editor.</p>
            <div className="cta-buttons">
              <button className="btn-primary-large">
                Start Writing Now
              </button>
              <button className="btn-secondary-large">
                Watch Demo
              </button>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <span>✅</span>
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <span>✅</span>
                <span>Free 14-day trial</span>
              </div>
              <div className="cta-feature">
                <span>✅</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .editor-page {
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .editor-hero {
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
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .feature-highlight {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .feature-icon {
          font-size: 1.5rem;
        }

        /* Features Demo */
        .features-demo {
          padding: 6rem 0;
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
        }

        .features-demo h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 4rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .demo-interface {
          max-width: 1000px;
          margin: 0 auto;
        }

        .demo-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .demo-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: 2px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          background: transparent;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .demo-tab:hover,
        .demo-tab.active {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          transform: translateY(-2px);
        }

        .tab-icon {
          font-size: 1.2rem;
        }

        .demo-panel {
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          padding: 3rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3)'
            : '0 15px 35px rgba(0, 0, 0, 0.1)'
          };
        }

        .demo-description {
          text-align: center;
          margin-bottom: 3rem;
        }

        .demo-description h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .demo-description p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          font-size: 1.1rem;
        }

        .demo-comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .demo-before,
        .demo-after {
          text-align: center;
        }

        .demo-before h4,
        .demo-after h4 {
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .demo-text {
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
          padding: 2rem;
          border-radius: 15px;
          border: 2px solid ${mode === 'dark' ? '#e74c3c' : '#dc3545'};
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          line-height: 1.6;
        }

        .demo-text.enhanced {
          border-color: ${mode === 'dark' ? '#27ae60' : '#28a745'};
          background: ${mode === 'dark' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(40, 167, 69, 0.05)'};
        }

        .demo-arrow {
          font-size: 2rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          font-weight: bold;
        }

        .demo-suggestions {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .demo-suggestions h4 {
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          margin-bottom: 1rem;
        }

        .demo-suggestions ul {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          margin-left: 1rem;
        }

        .demo-suggestions li {
          margin-bottom: 0.5rem;
        }

        /* Writing Templates */
        .writing-templates {
          padding: 6rem 0;
          background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
        }

        .writing-templates h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          margin-bottom: 4rem;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .template-card {
          background: ${mode === 'dark' 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          };
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3)'
            : '0 15px 35px rgba(0, 0, 0, 0.1)'
          };
          transition: all 0.3s ease;
        }

        .template-card:hover {
          transform: translateY(-5px);
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(78, 205, 196, 0.2)'
            : '0 25px 50px rgba(102, 126, 234, 0.15)'
          };
        }

        .template-header {
          margin-bottom: 1.5rem;
        }

        .template-header h3 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .template-meta {
          display: flex;
          gap: 1rem;
        }

        .category,
        .time {
          padding: 0.3rem 1rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .category {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
        }

        .time {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .template-description {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .template-structure {
          margin-bottom: 2rem;
        }

        .template-structure h4 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .template-structure ol {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          margin-left: 1.5rem;
        }

        .template-structure li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .btn-start-writing {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .btn-start-writing:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(78, 205, 196, 0.4);
        }

        /* AI Tools */
        .ai-tools {
          padding: 6rem 0;
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
        }

        .ai-tools h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .tool-card {
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          padding: 3rem 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3)'
            : '0 15px 35px rgba(0, 0, 0, 0.1)'
          };
          transition: all 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(78, 205, 196, 0.2)'
            : '0 25px 50px rgba(102, 126, 234, 0.15)'
          };
        }

        .tool-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .tool-card h3 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .tool-card p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .btn-tool-action {
          background: transparent;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border: 2px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          padding: 0.8rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-tool-action:hover {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
        }

        /* Editor Preview */
        .editor-preview {
          padding: 6rem 0;
          background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
        }

        .editor-preview h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 4rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .preview-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .editor-mockup {
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          border-radius: 20px;
          overflow: hidden;
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(0, 0, 0, 0.4)'
            : '0 25px 50px rgba(0, 0, 0, 0.15)'
          };
        }

        .editor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
          border-bottom: 1px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
        }

        .toolbar-section {
          display: flex;
          gap: 1rem;
        }

        .toolbar-btn {
          padding: 0.5rem 1.5rem;
          border: 1px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          background: transparent;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toolbar-btn.active,
        .toolbar-btn:hover {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
        }

        .toolbar-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-save,
        .btn-publish {
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-save {
          background: ${mode === 'dark' ? '#95a5a6' : '#6c757d'};
          color: white;
        }

        .btn-publish {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
        }

        .btn-save:hover,
        .btn-publish:hover {
          transform: translateY(-1px);
        }

        .editor-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 500px;
        }

        .editor-sidebar {
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
          padding: 2rem;
          border-right: 1px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
        }

        .sidebar-section {
          margin-bottom: 2rem;
        }

        .sidebar-section h4 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
          font-size: 1rem;
          font-weight: 700;
        }

        .suggestion-item {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          border-left: 3px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .suggestion-type {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          padding: 0.2rem 0.8rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .suggestion-item p {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.4;
        }

        .stat-item {
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          padding: 0.8rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .stat-item span {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-size: 0.9rem;
          font-weight: 600;
        }

        .editor-main {
          padding: 2rem;
        }

        .editor-writing-area {
          max-width: 700px;
        }

        .editor-title {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          border: none;
          background: transparent;
          outline: none;
          opacity: 0.7;
        }

        .editor-text {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .editor-text p {
          margin-bottom: 1.5rem;
        }

        .highlight {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
          border-left: 3px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          padding: 1rem;
          border-radius: 5px;
        }

        /* CTA Section */
        .editor-cta {
          padding: 6rem 0;
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .cta-content > p {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .btn-primary-large,
        .btn-secondary-large {
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary-large {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
        }

        .btn-secondary-large {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-primary-large:hover,
        .btn-secondary-large:hover {
          transform: translateY(-3px);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .cta-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .cta-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          opacity: 0.9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-features {
            flex-direction: column;
            align-items: center;
          }

          .demo-tabs {
            flex-direction: column;
            align-items: center;
          }

          .demo-comparison {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .demo-arrow {
            display: none;
          }

          .editor-content {
            grid-template-columns: 1fr;
          }

          .editor-sidebar {
            border-right: none;
            border-bottom: 1px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-features {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorTemplatesPage;