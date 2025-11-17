import React, { useState } from 'react';
import { FileText, TrendingUp, BarChart3, Lightbulb, ArrowLeft, Download, Save, Sparkles } from 'lucide-react';
import './IndustryAnalysis.css';

export default function IndustryAnalysisApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeSection, setActiveSection] = useState('industry');
  const [formData, setFormData] = useState({
    industry: '',
    marketOverview: '',
    keyTrends: '',
    analysisData: '',
    futurePredictions: '',
    actionableInsights: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    const content = `
INDUSTRY ANALYSIS REPORT
========================

Industry: ${formData.industry || 'Not specified'}

MARKET OVERVIEW
---------------
${formData.marketOverview || 'No content provided'}

KEY TRENDS
----------
${formData.keyTrends || 'No content provided'}

ANALYSIS & DATA
---------------
${formData.analysisData || 'No content provided'}

FUTURE PREDICTIONS
------------------
${formData.futurePredictions || 'No content provided'}

ACTIONABLE INSIGHTS
-------------------
${formData.actionableInsights || 'No content provided'}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `industry-analysis-${formData.industry || 'report'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sections = [
    { id: 'industry', label: 'Industry', icon: FileText, field: 'industry' },
    { id: 'overview', label: 'Market Overview', icon: FileText, field: 'marketOverview' },
    { id: 'trends', label: 'Key Trends', icon: TrendingUp, field: 'keyTrends' },
    { id: 'analysis', label: 'Analysis & Data', icon: BarChart3, field: 'analysisData' },
    { id: 'predictions', label: 'Future Predictions', icon: Lightbulb, field: 'futurePredictions' },
    { id: 'insights', label: 'Actionable Insights', icon: Lightbulb, field: 'actionableInsights' }
  ];

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const currentSection = sections.find(s => s.id === activeSection);

  if (currentPage === 'landing') {
    return (
      <div className="industry-landing">
        <div className="industry-landing-card">
          <h1 className="industry-landing-title">Industry Analysis</h1>
          
          <div className="industry-landing-badges">
            <span className="industry-badge industry-badge-primary">
              Business
            </span>
            <span className="industry-badge industry-badge-secondary">
              30-60 min
            </span>
          </div>

          <p className="industry-landing-subtitle">Professional market insights</p>

          <div className="industry-structure-section">
            <h2 className="industry-structure-title">Structure:</h2>
            
            <div className="industry-structure-list">
              <div className="industry-structure-item">
                <FileText className="industry-structure-icon" />
                <span>Market overview</span>
              </div>
              <div className="industry-structure-item">
                <TrendingUp className="industry-structure-icon" />
                <span>Key trends</span>
              </div>
              <div className="industry-structure-item">
                <BarChart3 className="industry-structure-icon" />
                <span>Analysis & data</span>
              </div>
              <div className="industry-structure-item">
                <Lightbulb className="industry-structure-icon" />
                <span>Future predictions</span>
              </div>
              <div className="industry-structure-item">
                <Lightbulb className="industry-structure-icon" />
                <span>Actionable insights</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('writing')}
            className="industry-start-btn"
          >
            Start Writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="industry-editor">
      {/* Header */}
      <div className="industry-header">
        <div className="industry-header-container">
          <div className="industry-header-left">
            <button
              onClick={() => setCurrentPage('landing')}
              className="industry-back-btn"
            >
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', color: '#cbd5e1' }} />
            </button>
            <div className="industry-header-title-wrap">
              <BarChart3 className="industry-header-icon" />
              <h1 className="industry-header-title">Industry Analysis Editor</h1>
            </div>
          </div>
          <div className="industry-header-actions">
            <button className="industry-save-btn">
              <Save style={{ width: '1rem', height: '1rem' }} />
              Save
            </button>
            <button onClick={handleDownload} className="industry-export-btn">
              <Download style={{ width: '1rem', height: '1rem' }} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="industry-content">
        <div className="industry-grid">
          {/* Sidebar */}
          <div className="industry-sidebar">
            <div className="industry-sidebar-card">
              <h3 className="industry-sidebar-header">SECTIONS</h3>
              <div className="industry-sidebar-sections">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const hasContent = formData[section.field]?.trim().length > 0;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`industry-section-btn ${isActive ? 'active' : ''}`}
                    >
                      <Icon className="industry-section-icon" />
                      <span className="industry-section-label">{section.label}</span>
                      {hasContent && (
                        <div className="industry-section-indicator" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Editor */}
          <div className="industry-main">
            <div className="industry-editor-card">
              {/* Section Header */}
              <div className="industry-editor-header">
                <div className="industry-editor-header-top">
                  <div className="industry-editor-title-wrap">
                    {currentSection && (
                      <>
                        <currentSection.icon className="industry-editor-title-icon" />
                        <h2 className="industry-editor-title">{currentSection.label}</h2>
                      </>
                    )}
                  </div>
                  <button className="industry-ai-btn">
                    <Sparkles style={{ width: '1rem', height: '1rem' }} />
                    AI Assist
                  </button>
                </div>
                <p className="industry-editor-description">
                  {activeSection === 'industry' && 'Enter the name of the industry you want to analyze'}
                  {activeSection === 'overview' && 'Provide a comprehensive overview of the current market landscape, size, and major players'}
                  {activeSection === 'trends' && 'Identify and describe the most significant trends shaping the industry'}
                  {activeSection === 'analysis' && 'Include relevant statistics, metrics, and data-driven insights'}
                  {activeSection === 'predictions' && 'Forecast potential developments and emerging opportunities'}
                  {activeSection === 'insights' && 'Provide strategic recommendations and practical next steps'}
                </p>
              </div>

              {/* Editor Area */}
              <div className="industry-editor-body">
                {activeSection === 'industry' ? (
                  <div className="industry-input-wrapper">
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      placeholder="e.g., E-commerce, Healthcare, Fintech, AI Technology..."
                      className="industry-input"
                    />
                  </div>
                ) : (
                  <>
                    <textarea
                      value={formData[currentSection.field]}
                      onChange={(e) => handleInputChange(currentSection.field, e.target.value)}
                      placeholder={`Write your ${currentSection.label.toLowerCase()} here...`}
                      rows={16}
                      className="industry-textarea"
                    />
                    <div className="industry-word-count">
                      <span className="industry-char-count">
                        {formData[currentSection.field]?.length || 0} characters
                      </span>
                      <span className="industry-words">
                        {getWordCount(formData[currentSection.field] || '')} words
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Progress Footer */}
              <div className="industry-progress-footer">
                <div className="industry-progress-info">
                  <span className="industry-progress-text">
                    Completed sections: {Object.values(formData).filter(v => v.trim()).length} / 6
                  </span>
                  <span className="industry-progress-percent">
                    {Math.round((Object.values(formData).filter(v => v.trim()).length / 6) * 100)}% Complete
                  </span>
                </div>
                <div className="industry-progress-bar">
                  <div
                    className="industry-progress-fill"
                    style={{ width: `${(Object.values(formData).filter(v => v.trim()).length / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}