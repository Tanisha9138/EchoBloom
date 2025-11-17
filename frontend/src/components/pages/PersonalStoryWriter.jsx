import React, { useState, useContext } from 'react';
import { BookOpen, Clock, Sparkles, ArrowLeft, Save, Eye, FileText } from 'lucide-react';
import { Context } from '../../main';
import './PersonalStory.css';

export default function PersonalStoryApp() {
  const { mode } = useContext(Context);
  const [isWriting, setIsWriting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [storyData, setStoryData] = useState({
    hook: '',
    background: '',
    mainStory: '',
    lessons: '',
    callToAction: ''
  });

  const handleInputChange = (field, value) => {
    setStoryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartWriting = () => {
    setIsWriting(true);
  };

  const handleBack = () => {
    setIsWriting(false);
    setShowPreview(false);
  };

  const handleSaveDraft = () => {
    console.log('Story saved as draft:', storyData);
    alert('Your story has been saved as a draft!');
  };

  const handlePublish = () => {
    // Validation
    if (!storyData.hook.trim()) {
      alert('Please add a hook opening');
      return;
    }
    if (!storyData.background.trim()) {
      alert('Please add background context');
      return;
    }
    if (!storyData.mainStory.trim()) {
      alert('Please add your main story');
      return;
    }
    
    console.log('Story published:', storyData);
    alert('Your personal story has been published successfully!');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (isWriting) {
    return (
      <div className={`personal-story-page ${mode === 'dark' ? 'dark-bg' : 'light-bg'}`}>
        {/* Header Bar */}
        <div className="story-header">
          <div className="header-container">
            <button onClick={handleBack} className="btn-back">
              <ArrowLeft size={20} />
              Back to Overview
            </button>
            <div className="header-actions">
              <button className="btn-preview" onClick={togglePreview}>
                {showPreview ? <FileText size={18} /> : <Eye size={18} />}
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button className="btn-save-draft" onClick={handleSaveDraft}>
                <Save size={18} />
                Save Draft
              </button>
              <button className="btn-publish" onClick={handlePublish}>
                <Sparkles size={18} />
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="story-content">
          <div className="container">
            {!showPreview ? (
              <div className="editor-container">
                <div className="editor-header">
                  <h1>Write Your Personal Story</h1>
                  <p>Follow the structure below to craft an engaging narrative</p>
                </div>

                <div className="form-sections">
                  {/* Hook Opening */}
                  <div className="form-group">
                    <label className="section-label">
                      <Sparkles size={18} />
                      Hook Opening
                    </label>
                    <textarea
                      value={storyData.hook}
                      onChange={(e) => handleInputChange('hook', e.target.value)}
                      placeholder="Start with something captivating that grabs attention..."
                      className="textarea-field"
                      rows="4"
                    />
                  </div>

                  {/* Background Context */}
                  <div className="form-group">
                    <label className="section-label">
                      <BookOpen size={18} />
                      Background Context
                    </label>
                    <textarea
                      value={storyData.background}
                      onChange={(e) => handleInputChange('background', e.target.value)}
                      placeholder="Provide context and set the scene..."
                      className="textarea-field"
                      rows="4"
                    />
                  </div>

                  {/* Main Story */}
                  <div className="form-group">
                    <label className="section-label">
                      <BookOpen size={18} />
                      Main Story
                    </label>
                    <textarea
                      value={storyData.mainStory}
                      onChange={(e) => handleInputChange('mainStory', e.target.value)}
                      placeholder="Tell the heart of your story..."
                      className="textarea-field"
                      rows="6"
                    />
                  </div>

                  {/* Lessons Learned */}
                  <div className="form-group">
                    <label className="section-label">
                      <Sparkles size={18} />
                      Lessons Learned
                    </label>
                    <textarea
                      value={storyData.lessons}
                      onChange={(e) => handleInputChange('lessons', e.target.value)}
                      placeholder="What did you learn from this experience?"
                      className="textarea-field"
                      rows="4"
                    />
                  </div>

                  {/* Call to Action */}
                  <div className="form-group">
                    <label className="section-label">
                      <Sparkles size={18} />
                      Call to Action
                    </label>
                    <textarea
                      value={storyData.callToAction}
                      onChange={(e) => handleInputChange('callToAction', e.target.value)}
                      placeholder="End with a powerful message or call to action..."
                      className="textarea-field"
                      rows="4"
                    />
                  </div>

                  <button onClick={handlePublish} className="btn-save-story">
                    <Sparkles size={20} />
                    Publish Story
                  </button>
                </div>
              </div>
            ) : (
              /* Preview Mode */
              <div className="preview-container">
                <div className="preview-header">
                  <h1>Story Preview</h1>
                  <p>Review your personal story before publishing</p>
                </div>

                <div className="preview-content">
                  {storyData.hook && (
                    <div className="preview-section">
                      <h3>Hook Opening</h3>
                      <p>{storyData.hook}</p>
                    </div>
                  )}

                  {storyData.background && (
                    <div className="preview-section">
                      <h3>Background Context</h3>
                      <p>{storyData.background}</p>
                    </div>
                  )}

                  {storyData.mainStory && (
                    <div className="preview-section">
                      <h3>Main Story</h3>
                      <p>{storyData.mainStory}</p>
                    </div>
                  )}

                  {storyData.lessons && (
                    <div className="preview-section">
                      <h3>Lessons Learned</h3>
                      <p>{storyData.lessons}</p>
                    </div>
                  )}

                  {storyData.callToAction && (
                    <div className="preview-section">
                      <h3>Call to Action</h3>
                      <p>{storyData.callToAction}</p>
                    </div>
                  )}

                  {!storyData.hook && !storyData.background && !storyData.mainStory && (
                    <div className="empty-preview">
                      <BookOpen size={48} />
                      <p>Start writing to see your story preview</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`personal-story-page landing ${mode === 'dark' ? 'dark-bg' : 'light-bg'}`}>
      <div className="container-center">
        <div className="story-card">
          {/* Header */}
          <h1 className="card-title">Personal Story</h1>
          
          {/* Tags */}
          <div className="tags-container">
            <span className="tag-badge">Personal</span>
            <span className="time-badge">
              <Clock size={16} />
              25-45 min
            </span>
          </div>

          {/* Description */}
          <p className="card-description">Engaging narrative template</p>

          {/* Structure Section */}
          <div className="structure-section">
            <h2 className="structure-title">Structure:</h2>
            <ul className="structure-list">
              {[
                'Hook opening',
                'Background context',
                'Main story',
                'Lessons learned',
                'Call to action'
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Start Writing Button */}
          <button onClick={handleStartWriting} className="btn-start">
            Start Writing
          </button>
        </div>
      </div>
    </div>
  );
}