import React, { useState, useContext } from 'react';
import { Context } from '../../main';

const GuidePage = () => {
  const { mode } = useContext(Context);
  const [currentStep, setCurrentStep] = useState(1);
  const [guideData, setGuideData] = useState({
    title: '',
    introduction: '',
    prerequisites: [],
    steps: [
      { id: 1, title: '', content: '', tips: [] }
    ],
    tipsAndTricks: '',
    conclusion: ''
  });
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newTip, setNewTip] = useState('');
  const [activeStepId, setActiveStepId] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleTitleChange = (e) => {
    setGuideData({ ...guideData, title: e.target.value });
  };

  const handleIntroductionChange = (e) => {
    setGuideData({ ...guideData, introduction: e.target.value });
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setGuideData({
        ...guideData,
        prerequisites: [...guideData.prerequisites, newPrerequisite.trim()]
      });
      setNewPrerequisite('');
    }
  };

  const removePrerequisite = (index) => {
    setGuideData({
      ...guideData,
      prerequisites: guideData.prerequisites.filter((_, i) => i !== index)
    });
  };

  const addStep = () => {
    const newId = Math.max(...guideData.steps.map(s => s.id), 0) + 1;
    setGuideData({
      ...guideData,
      steps: [...guideData.steps, { id: newId, title: '', content: '', tips: [] }]
    });
    setActiveStepId(newId);
  };

  const removeStep = (id) => {
    if (guideData.steps.length > 1) {
      setGuideData({
        ...guideData,
        steps: guideData.steps.filter(step => step.id !== id)
      });
      if (activeStepId === id) {
        setActiveStepId(guideData.steps[0].id);
      }
    }
  };

  const updateStep = (id, field, value) => {
    setGuideData({
      ...guideData,
      steps: guideData.steps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      )
    });
  };

  const addTipToStep = (stepId) => {
    if (newTip.trim()) {
      setGuideData({
        ...guideData,
        steps: guideData.steps.map(step =>
          step.id === stepId
            ? { ...step, tips: [...step.tips, newTip.trim()] }
            : step
        )
      });
      setNewTip('');
    }
  };

  const removeTipFromStep = (stepId, tipIndex) => {
    setGuideData({
      ...guideData,
      steps: guideData.steps.map(step =>
        step.id === stepId
          ? { ...step, tips: step.tips.filter((_, i) => i !== tipIndex) }
          : step
      )
    });
  };

  const handleTipsAndTricksChange = (e) => {
    setGuideData({ ...guideData, tipsAndTricks: e.target.value });
  };

  const handleConclusionChange = (e) => {
    setGuideData({ ...guideData, conclusion: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const handleSaveDraft = () => {
    alert('Guide saved as draft! In a real application, this would save to your database.');
    console.log('Draft saved:', guideData);
  };

  const handlePublish = () => {
    // Validation
    if (!guideData.title.trim()) {
      alert('Please add a title for your guide');
      return;
    }
    if (!guideData.introduction.trim()) {
      alert('Please add an introduction');
      return;
    }
    if (guideData.steps.some(step => !step.title.trim() || !step.content.trim())) {
      alert('Please fill in all step titles and content');
      return;
    }

    alert('Guide published successfully! In a real application, this would publish your guide.');
    console.log('Published guide:', guideData);
  };

  const activeStep = guideData.steps.find(step => step.id === activeStepId);

  const stepperItems = [
    { number: 1, label: 'Introduction' },
    { number: 2, label: 'Prerequisites' },
    { number: 3, label: 'Steps' },
    { number: 4, label: 'Tips & Tricks' },
    { number: 5, label: 'Conclusion' }
  ];

  return (
    <div className={`guide-page ${mode === 'dark' ? 'dark-bg' : 'light-bg'}`}>
      {/* Header */}
      <div className="guide-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1>📖 Create How-To Guide</h1>
              <p>Build comprehensive step-by-step tutorials with AI assistance</p>
            </div>
            <div className="header-actions">
              <button className="btn-preview" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? '✏️ Edit' : '👁️ Preview'}
              </button>
              <button className="btn-save" onClick={handleSaveDraft}>
                💾 Save Draft
              </button>
              <button className="btn-publish" onClick={handlePublish}>
                🚀 Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {!showPreview ? (
        <div className="guide-content">
          <div className="container">
            <div className="content-wrapper">
              {/* Progress Stepper */}
              <div className="progress-stepper">
                {stepperItems.map((item, index) => (
                  <div key={item.number} className="stepper-item-wrapper">
                    <div
                      className={`stepper-item ${currentStep === item.number ? 'active' : ''} ${
                        currentStep > item.number ? 'completed' : ''
                      }`}
                      onClick={() => goToStep(item.number)}
                    >
                      <div className="stepper-number">
                        {currentStep > item.number ? '✓' : item.number}
                      </div>
                      <div className="stepper-label">{item.label}</div>
                    </div>
                    {index < stepperItems.length - 1 && (
                      <div className={`stepper-line ${currentStep > item.number ? 'completed' : ''}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="editor-area">
                {/* Step 1: Introduction */}
                {currentStep === 1 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>📝 Introduction</h2>
                      <p>Start with a compelling title and introduction that explains what readers will learn</p>
                    </div>

                    <div className="form-group">
                      <label>Guide Title *</label>
                      <input
                        type="text"
                        placeholder="e.g., How to Create a Professional Portfolio Website in 2024"
                        value={guideData.title}
                        onChange={handleTitleChange}
                        className="input-field title-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Introduction *</label>
                      <textarea
                        placeholder="Introduce the topic and explain what readers will achieve by following this guide..."
                        value={guideData.introduction}
                        onChange={handleIntroductionChange}
                        className="textarea-field"
                        rows="8"
                      />
                      <div className="helper-text">
                        💡 Tip: Hook readers with the benefits they'll gain and any prerequisites they should know about
                      </div>
                    </div>

                    <div className="ai-suggestions">
                      <h4>🤖 AI Writing Suggestions</h4>
                      <div className="suggestion-box">
                        <p>• Start with a relatable problem or challenge</p>
                        <p>• Clearly state what readers will accomplish</p>
                        <p>• Mention the time commitment and difficulty level</p>
                        <p>• Include who this guide is for</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Prerequisites */}
                {currentStep === 2 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>📋 Prerequisites</h2>
                      <p>List what readers need before starting this guide</p>
                    </div>

                    <div className="form-group">
                      <label>Add Prerequisites</label>
                      <div className="input-with-button">
                        <input
                          type="text"
                          placeholder="e.g., Basic HTML/CSS knowledge, Text editor installed"
                          value={newPrerequisite}
                          onChange={(e) => setNewPrerequisite(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addPrerequisite()}
                          className="input-field"
                        />
                        <button onClick={addPrerequisite} className="btn-add">
                          + Add
                        </button>
                      </div>
                    </div>

                    <div className="prerequisites-list">
                      {guideData.prerequisites.length === 0 ? (
                        <div className="empty-state">
                          <p>No prerequisites added yet. Add items that readers need before starting.</p>
                        </div>
                      ) : (
                        guideData.prerequisites.map((prereq, index) => (
                          <div key={index} className="prerequisite-item">
                            <span className="prereq-icon">✓</span>
                            <span className="prereq-text">{prereq}</span>
                            <button
                              onClick={() => removePrerequisite(index)}
                              className="btn-remove"
                            >
                              ×
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="ai-suggestions">
                      <h4>🤖 Common Prerequisites</h4>
                      <div className="suggestion-chips">
                        <button className="chip" onClick={() => setNewPrerequisite('Basic programming knowledge')}>
                          Basic programming knowledge
                        </button>
                        <button className="chip" onClick={() => setNewPrerequisite('Computer with internet connection')}>
                          Computer with internet
                        </button>
                        <button className="chip" onClick={() => setNewPrerequisite('30-60 minutes of free time')}>
                          30-60 minutes time
                        </button>
                        <button className="chip" onClick={() => setNewPrerequisite('Willingness to learn')}>
                          Willingness to learn
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Steps */}
                {currentStep === 3 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>🎯 Step-by-Step Process</h2>
                      <p>Break down your guide into clear, actionable steps</p>
                    </div>

                    <div className="steps-manager">
                      <div className="steps-sidebar">
                        <h4>Steps List</h4>
                        <div className="steps-list">
                          {guideData.steps.map((step, index) => (
                            <div
                              key={step.id}
                              className={`step-item ${activeStepId === step.id ? 'active' : ''}`}
                              onClick={() => setActiveStepId(step.id)}
                            >
                              <div className="step-item-header">
                                <span className="step-number">Step {index + 1}</span>
                                {guideData.steps.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeStep(step.id);
                                    }}
                                    className="btn-remove-small"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                              <div className="step-item-title">
                                {step.title || 'Untitled Step'}
                              </div>
                            </div>
                          ))}
                        </div>
                        <button onClick={addStep} className="btn-add-step">
                          + Add New Step
                        </button>
                      </div>

                      <div className="steps-editor">
                        {activeStep && (
                          <>
                            <div className="form-group">
                              <label>Step Title *</label>
                              <input
                                type="text"
                                placeholder="e.g., Set up your development environment"
                                value={activeStep.title}
                                onChange={(e) => updateStep(activeStepId, 'title', e.target.value)}
                                className="input-field"
                              />
                            </div>

                            <div className="form-group">
                              <label>Step Content *</label>
                              <textarea
                                placeholder="Describe this step in detail. What should readers do? What should they see?"
                                value={activeStep.content}
                                onChange={(e) => updateStep(activeStepId, 'content', e.target.value)}
                                className="textarea-field"
                                rows="10"
                              />
                            </div>

                            <div className="form-group">
                              <label>Step Tips (Optional)</label>
                              <div className="input-with-button">
                                <input
                                  type="text"
                                  placeholder="Add helpful tips for this step..."
                                  value={newTip}
                                  onChange={(e) => setNewTip(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && addTipToStep(activeStepId)}
                                  className="input-field"
                                />
                                <button onClick={() => addTipToStep(activeStepId)} className="btn-add">
                                  + Add Tip
                                </button>
                              </div>
                              {activeStep.tips.length > 0 && (
                                <div className="tips-list">
                                  {activeStep.tips.map((tip, index) => (
                                    <div key={index} className="tip-item">
                                      <span className="tip-icon">💡</span>
                                      <span className="tip-text">{tip}</span>
                                      <button
                                        onClick={() => removeTipFromStep(activeStepId, index)}
                                        className="btn-remove"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Tips & Tricks */}
                {currentStep === 4 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>💡 Tips & Tricks</h2>
                      <p>Share additional insights and best practices</p>
                    </div>

                    <div className="form-group">
                      <label>General Tips & Tricks</label>
                      <textarea
                        placeholder="Share general tips, common mistakes to avoid, best practices, or expert advice..."
                        value={guideData.tipsAndTricks}
                        onChange={handleTipsAndTricksChange}
                        className="textarea-field"
                        rows="10"
                      />
                      <div className="helper-text">
                        💡 This section helps readers avoid common pitfalls and optimize their results
                      </div>
                    </div>

                    <div className="ai-suggestions">
                      <h4>🤖 What to Include</h4>
                      <div className="suggestion-box">
                        <p>• Common mistakes and how to avoid them</p>
                        <p>• Time-saving shortcuts</p>
                        <p>• Advanced techniques for better results</p>
                        <p>• Troubleshooting common issues</p>
                        <p>• Resources for further learning</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Conclusion */}
                {currentStep === 5 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>🎉 Conclusion</h2>
                      <p>Wrap up your guide and inspire action</p>
                    </div>

                    <div className="form-group">
                      <label>Conclusion *</label>
                      <textarea
                        placeholder="Summarize what readers have learned and encourage them to take the next step..."
                        value={guideData.conclusion}
                        onChange={handleConclusionChange}
                        className="textarea-field"
                        rows="8"
                      />
                      <div className="helper-text">
                        💡 End with a clear call-to-action or next steps for readers
                      </div>
                    </div>

                    <div className="ai-suggestions">
                      <h4>🤖 Conclusion Elements</h4>
                      <div className="suggestion-box">
                        <p>• Recap key takeaways</p>
                        <p>• Celebrate what they've accomplished</p>
                        <p>• Suggest next steps or related guides</p>
                        <p>• Encourage sharing or feedback</p>
                        <p>• Provide support resources</p>
                      </div>
                    </div>

                    <div className="completion-checklist">
                      <h4>✅ Pre-Publish Checklist</h4>
                      <div className="checklist">
                        <label className="checkbox-item">
                          <input type="checkbox" checked={guideData.title.trim() !== ''} readOnly />
                          <span>Title is clear and descriptive</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" checked={guideData.introduction.trim() !== ''} readOnly />
                          <span>Introduction explains the value</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" checked={guideData.prerequisites.length > 0} readOnly />
                          <span>Prerequisites are listed</span>
                        </label>
                        <label className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={guideData.steps.every(s => s.title && s.content)}
                            readOnly
                          />
                          <span>All steps have titles and content</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" checked={guideData.conclusion.trim() !== ''} readOnly />
                          <span>Conclusion wraps up effectively</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="step-navigation">
                  {currentStep > 1 && (
                    <button onClick={previousStep} className="btn-nav btn-prev">
                      ← Previous
                    </button>
                  )}
                  {currentStep < 5 && (
                    <button onClick={nextStep} className="btn-nav btn-next">
                      Next →
                    </button>
                  )}
                  {currentStep === 5 && (
                    <button onClick={handlePublish} className="btn-nav btn-publish-final">
                      🚀 Publish Guide
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="preview-mode">
          <div className="container">
            <div className="preview-content">
              <div className="preview-article">
                <h1 className="preview-title">{guideData.title || 'Your Guide Title'}</h1>

                <div className="preview-section">
                  <h2>Introduction</h2>
                  <p>{guideData.introduction || 'Your introduction will appear here...'}</p>
                </div>

                {guideData.prerequisites.length > 0 && (
                  <div className="preview-section">
                    <h2>Prerequisites</h2>
                    <ul className="preview-list">
                      {guideData.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="preview-section">
                  <h2>Step-by-Step Process</h2>
                  {guideData.steps.map((step, index) => (
                    <div key={step.id} className="preview-step">
                      <h3>
                        Step {index + 1}: {step.title || 'Untitled Step'}
                      </h3>
                      <p>{step.content || 'Step content will appear here...'}</p>
                      {step.tips.length > 0 && (
                        <div className="preview-tips">
                          <strong>💡 Tips:</strong>
                          <ul>
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {guideData.tipsAndTricks && (
                  <div className="preview-section">
                    <h2>Tips & Tricks</h2>
                    <p>{guideData.tipsAndTricks}</p>
                  </div>
                )}

                {guideData.conclusion && (
                  <div className="preview-section">
                    <h2>Conclusion</h2>
                    <p>{guideData.conclusion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .guide-page {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .guide-header {
          background: ${mode === 'dark'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          color: white;
          padding: 2rem 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .header-left h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .header-left p {
          opacity: 0.9;
          font-size: 1rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-preview,
        .btn-save,
        .btn-publish {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 25px;
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
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
        }

        .btn-publish {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
        }

        .btn-preview:hover,
        .btn-save:hover,
        .btn-publish:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Main Content */
        .guide-content {
          padding: 3rem 0;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Progress Stepper */
        .progress-stepper {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          padding: 2rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'};
        }

        .stepper-item-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .stepper-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .stepper-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          background: ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          color: ${mode === 'dark' ? '#7f8c8d' : '#6c757d'};
        }

        .stepper-item.active .stepper-number {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          transform: scale(1.1);
        }

        .stepper-item.completed .stepper-number {
          background: ${mode === 'dark' ? '#27ae60' : '#28a745'};
          color: white;
        }

        .stepper-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          text-align: center;
        }

        .stepper-item.active .stepper-label {
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .stepper-line {
          flex: 1;
          height: 3px;
          background: ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          margin: 0 1rem;
          margin-top: -2rem;
        }

        .stepper-line.completed {
          background: ${mode === 'dark' ? '#27ae60' : '#28a745'};
        }

        /* Editor Area */
        .editor-area {
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          padding: 3rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'};
        }

        .step-content {
          margin-bottom: 2rem;
        }

        .step-header {
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .step-header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .step-header p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          font-size: 1.1rem;
        }

        /* Form Elements */
        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          font-size: 1rem;
        }

        .input-field,
        .textarea-field {
          width: 100%;
          padding: 1rem;
          border: 2px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .title-input {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .input-field:focus,
        .textarea-field:focus {
          outline: none;
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          box-shadow: 0 0 0 3px ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
        }

        .textarea-field {
          resize: vertical;
          font-family: inherit;
          line-height: 1.6;
        }

        .helper-text {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: ${mode === 'dark' ? '#95a5a6' : '#6c757d'};
        }

        .input-with-button {
          display: flex;
          gap: 1rem;
        }

        .input-with-button .input-field {
          flex: 1;
        }

        .btn-add {
          padding: 1rem 2rem;
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-add:hover {
          background: ${mode === 'dark' ? '#45b8b0' : '#5568d3'};
          transform: translateY(-2px);
        }

        /* Prerequisites List */
        .prerequisites-list {
          margin-top: 1.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: ${mode === 'dark' ? 'rgba(52, 73, 94, 0.3)' : 'rgba(0, 0, 0, 0.02)'};
          border-radius: 12px;
          color: ${mode === 'dark' ? '#95a5a6' : '#6c757d'};
        }

        .prerequisite-item,
        .tip-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
          border-radius: 12px;
          margin-bottom: 0.8rem;
          border-left: 3px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .prereq-icon,
        .tip-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .prereq-text,
        .tip-text {
          flex: 1;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .btn-remove {
          background: transparent;
          border: none;
          color: ${mode === 'dark' ? '#e74c3c' : '#dc3545'};
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .btn-remove:hover {
          background: ${mode === 'dark' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(220, 53, 69, 0.1)'};
        }

        /* AI Suggestions */
        .ai-suggestions {
          margin-top: 2rem;
          padding: 1.5rem;
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.05)' : 'rgba(102, 126, 234, 0.03)'};
          border-radius: 12px;
          border: 1px solid ${mode === 'dark' ? 'rgba(78, 205, 196, 0.2)' : 'rgba(102, 126, 234, 0.2)'};
        }

        .ai-suggestions h4 {
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .suggestion-box {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .suggestion-box p {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .suggestion-chips {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .chip {
          padding: 0.6rem 1.2rem;
          background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
          border: 1px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .chip:hover {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          transform: translateY(-2px);
        }

        /* Steps Manager */
        .steps-manager {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .steps-sidebar {
          background: ${mode === 'dark' ? '#34495e' : '#f8f9fa'};
          padding: 1.5rem;
          border-radius: 12px;
          height: fit-content;
        }

        .steps-sidebar h4 {
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .steps-list {
          margin-bottom: 1rem;
        }

        .step-item {
          padding: 1rem;
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          border-radius: 10px;
          margin-bottom: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .step-item:hover {
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .step-item.active {
          border-color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
        }

        .step-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .step-number {
          font-size: 0.85rem;
          font-weight: 600;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .btn-remove-small {
          background: transparent;
          border: none;
          color: ${mode === 'dark' ? '#e74c3c' : '#dc3545'};
          font-size: 1.3rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .btn-remove-small:hover {
          background: ${mode === 'dark' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(220, 53, 69, 0.1)'};
        }

        .step-item-title {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          font-size: 0.9rem;
          font-weight: 500;
        }

        .btn-add-step {
          width: 100%;
          padding: 1rem;
          background: transparent;
          border: 2px dashed ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-add-step:hover {
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(102, 126, 234, 0.05)'};
        }

        .steps-editor {
          background: ${mode === 'dark' ? '#34495e' : '#f8f9fa'};
          padding: 2rem;
          border-radius: 12px;
        }

        .tips-list {
          margin-top: 1rem;
        }

        /* Completion Checklist */
        .completion-checklist {
          margin-top: 2rem;
          padding: 1.5rem;
          background: ${mode === 'dark' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(40, 167, 69, 0.05)'};
          border-radius: 12px;
          border: 1px solid ${mode === 'dark' ? 'rgba(39, 174, 96, 0.3)' : 'rgba(40, 167, 69, 0.2)'};
        }

        .completion-checklist h4 {
          color: ${mode === 'dark' ? '#27ae60' : '#28a745'};
          margin-bottom: 1rem;
        }

        .checklist {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .checkbox-item input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        /* Step Navigation */
        .step-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid ${mode === 'dark' ? '#34495e' : '#e9ecef'};
        }

        .btn-nav {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 25px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-prev {
          background: ${mode === 'dark' ? '#34495e' : '#e9ecef'};
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .btn-next {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          margin-left: auto;
        }

        .btn-publish-final {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          margin-left: auto;
        }

        .btn-nav:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Preview Mode */
        .preview-mode {
          padding: 3rem 0;
          background: ${mode === 'dark' ? '#1a1a2e' : '#f8f9fa'};
          min-height: calc(100vh - 200px);
        }

        .preview-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .preview-article {
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          padding: 4rem;
          border-radius: 20px;
          box-shadow: ${mode === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'};
        }

        .preview-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 3rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          line-height: 1.2;
        }

        .preview-section {
          margin-bottom: 3rem;
        }

        .preview-section h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .preview-section h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .preview-section p {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 1rem;
        }

        .preview-list {
          list-style: none;
          padding-left: 0;
        }

        .preview-list li {
          padding: 0.8rem 0;
          padding-left: 2rem;
          position: relative;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          line-height: 1.6;
        }

        .preview-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          font-weight: bold;
          font-size: 1.2rem;
        }

        .preview-step {
          padding: 2rem;
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.05)' : 'rgba(102, 126, 234, 0.03)'};
          border-radius: 12px;
          margin-bottom: 2rem;
          border-left: 4px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
        }

        .preview-tips {
          margin-top: 1.5rem;
          padding: 1rem;
          background: ${mode === 'dark' ? 'rgba(241, 196, 15, 0.1)' : 'rgba(255, 193, 7, 0.1)'};
          border-radius: 8px;
        }

        .preview-tips strong {
          color: ${mode === 'dark' ? '#f1c40f' : '#f39c12'};
        }

        .preview-tips ul {
          margin-top: 0.5rem;
          margin-left: 1.5rem;
        }

        .preview-tips li {
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
          margin-bottom: 0.3rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .steps-manager {
            grid-template-columns: 1fr;
          }

          .steps-sidebar {
            order: 2;
          }

          .steps-editor {
            order: 1;
          }

          .steps-list {
            display: flex;
            gap: 0.8rem;
            overflow-x: auto;
            padding-bottom: 1rem;
          }

          .step-item {
            min-width: 200px;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions button {
            flex: 1;
          }

          .progress-stepper {
            flex-direction: column;
            gap: 1rem;
          }

          .stepper-item-wrapper {
            width: 100%;
          }

          .stepper-line {
            display: none;
          }

          .editor-area {
            padding: 1.5rem;
          }

          .preview-article {
            padding: 2rem;
          }

          .preview-title {
            font-size: 2rem;
          }

          .input-with-button {
            flex-direction: column;
          }

          .btn-add {
            width: 100%;
          }

          .step-navigation {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-next,
          .btn-publish-final {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default GuidePage;