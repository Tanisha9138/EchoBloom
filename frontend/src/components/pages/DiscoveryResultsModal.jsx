import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import "../../DiscoveryResultsModal.css";

const DiscoveryResultsModal = ({ isOpen, onClose, blogs, preferences, onReset }) => {
  const { mode } = useContext(Context);
  const [blogStats, setBlogStats] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  // Initialize blog stats when component mounts or blogs change
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const initialStats = {};
      blogs.forEach(blog => {
        if (blog._id) {
          initialStats[blog._id] = {
            likes: blog.likes || 0, // Use actual database values
            views: blog.views || 0,
            isLiked: false // This should come from user's like history
          };
        }
      });
      setBlogStats(initialStats);
    }
  }, [blogs]);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle like button click with API call
  const handleLike = async (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentStats = blogStats[blogId] || { likes: 0, views: 0, isLiked: false };
    const newLikedState = !currentStats.isLiked;
    
    // Optimistically update UI
    setBlogStats(prev => ({
      ...prev,
      [blogId]: {
        ...prev[blogId],
        likes: newLikedState 
          ? prev[blogId].likes + 1 
          : prev[blogId].likes - 1,
        isLiked: newLikedState
      }
    }));

    // Make API call to update database
    try {
      const response = await fetch(`/api/v1/blog/${blogId}/like`, {
        method: newLikedState ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        // Revert on error
        setBlogStats(prev => ({
          ...prev,
          [blogId]: {
            ...prev[blogId],
            likes: newLikedState 
              ? prev[blogId].likes - 1 
              : prev[blogId].likes + 1,
            isLiked: !newLikedState
          }
        }));
        console.error('Failed to update like');
      }
    } catch (error) {
      // Revert on error
      setBlogStats(prev => ({
        ...prev,
        [blogId]: {
          ...prev[blogId],
          likes: newLikedState 
            ? prev[blogId].likes - 1 
            : prev[blogId].likes + 1,
          isLiked: !newLikedState
        }
      }));
      console.error('Error updating like:', error);
    }
  };

  // Handle view increment with API call
  const handleViewIncrement = async (blogId) => {
    // Optimistically update UI
    setBlogStats(prev => ({
      ...prev,
      [blogId]: {
        ...prev[blogId],
        views: (prev[blogId]?.views || 0) + 1
      }
    }));

    // Make API call to update database
    try {
      await fetch(`/api/v1/blog/${blogId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // Handle image loading errors
  const handleImageError = (blogId, imageType) => {
    setImageErrors(prev => ({
      ...prev,
      [`${blogId}-${imageType}`]: true
    }));
  };

  // Get fallback image
  const getFallbackImage = (width = 400, height = 250) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f2f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3ENo Image%3C/text%3E%3C/svg%3E`;
  };

  // Get fallback avatar
  const getFallbackAvatar = (name = "User") => {
    const initial = name.charAt(0).toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle width='32' height='32' r='16' fill='%234A5568'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-family='Arial' font-size='14' fill='white'%3E${initial}%3C/text%3E%3C/svg%3E`;
  };

  // Clean and validate text content
  const cleanText = (text) => {
    if (!text || typeof text !== 'string') return '';
    // Remove non-printable characters and fix encoding issues
    return text.replace(/[^\x20-\x7E\u00A0-\u024F\u1E00-\u1EFF]/g, '').trim();
  };

  if (!isOpen) return null;

  const getMoodEmoji = (mood) => {
    const moodMap = {
      curious: "🤔",
      inspired: "💡", 
      relaxed: "😌",
      focused: "🎯"
    };
    return moodMap[mood] || "🤔";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Unknown Date";
    }
  };

  return (
    <div className={`discovery-modal-overlay ${mode === "dark" ? "dark-theme" : "light-theme"}`}>
      <div className="discovery-modal-container">
        {/* Modal Header */}
        <div className="discovery-modal-header">
          <div className="modal-header-content">
            <div className="modal-title-section">
              <h1 className="modal-title">
                <span className="title-icon">🎯</span>
                Your Perfect Reads
                <span className="results-badge">{blogs?.length || 0} found</span>
              </h1>
              
              {/* Preferences Summary */}
              {preferences && (
                <div className="preferences-summary">
                  <div className="preference-item">
                    <span className="pref-icon">{getMoodEmoji(preferences.mood)}</span>
                    <span className="pref-text">{preferences.mood} mood</span>
                  </div>
                  <div className="preference-divider">•</div>
                  <div className="preference-item">
                    <span className="pref-icon">⏱️</span>
                    <span className="pref-text">{preferences.readingTime} min read</span>
                  </div>
                  <div className="preference-divider">•</div>
                  <div className="preference-item">
                    <span className="pref-icon">🏷️</span>
                    <span className="pref-text">{preferences.topics?.join(", ") || "All topics"}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="try-different-btn" onClick={onReset}>
                <span className="btn-icon">🔄</span>
                Try Different
              </button>
              <button className="close-modal-btn" onClick={onClose}>
                <span className="btn-icon">✕</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="discovery-modal-content">
          {blogs && blogs.length > 0 ? (
            <>
              {/* Results Grid */}
              <div className="discovery-results-grid">
                {blogs.map((blog, index) => {
                  // Validate blog data
                  if (!blog || !blog._id) return null;

                  const stats = blogStats[blog._id] || { 
                    likes: blog.likes || 0, 
                    views: blog.views || 0, 
                    isLiked: false 
                  };

                  // Clean text content
                  const title = cleanText(blog.title) || "Untitled Blog Post";
                  const intro = cleanText(blog.intro) || cleanText(blog.paraOneDescription) || cleanText(blog.description) || "No description available...";
                  const authorName = cleanText(blog.authorName) || cleanText(blog.createdBy?.name) || "Unknown Author";
                  const category = cleanText(blog.category) || "General";
                  
                  return (
                    <article key={blog._id} className="discovery-blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="blog-card-image">
                        <img 
                          src={
                            imageErrors[`${blog._id}-main`] 
                              ? getFallbackImage() 
                              : blog.mainImage?.url || getFallbackImage()
                          }
                          alt={title}
                          loading="lazy"
                          onError={() => handleImageError(blog._id, 'main')}
                        />
                        
                        <img 
                          src={
                            imageErrors[`${blog._id}-avatar`]
                            ? getFallbackAvatar(authorName)
                            : blog.authorAvatar || getFallbackAvatar(authorName)
                          }
                          alt={authorName}
                          className="author-avatar"
                          onError={() => handleImageError(blog._id, 'avatar')}
                        />
                        <div className="blog-card-overlay">
                          <div className="blog-category">{category}</div>
                          <div className="reading-time">
                            <span className="time-icon">⏱️</span>
                            {Math.ceil(Math.max(intro.length, 1000) / 200)} min read
                          </div>
                        </div>
                      </div>
                      
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">
                          <Link 
                            to={`/blog/${blog._id}`} 
                            className="blog-link"
                            onClick={() => handleViewIncrement(blog._id)}
                          >
                            {title}
                          </Link>
                        </h3>
                        
                        <p className="blog-card-excerpt">
                          {intro.substring(0, 120)}
                          {intro.length > 120 && "..."}
                        </p>
                        
                        <div className="blog-card-meta">
                          <div className="author-info">
                            <img 
                              src={
                                imageErrors[`${blog._id}-avatar`]
                                  ? getFallbackAvatar(authorName)
                                  : blog.authorAvatar || getFallbackAvatar(authorName)
                              }
                              alt={authorName}
                              className="author-avatar"
                              onError={() => handleImageError(blog._id, 'avatar')}
                            />
                            <div className="author-details">
                              <span className="author-name">{authorName}</span>
                              <span className="publish-date">
                                {formatDate(blog.createdAt)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="blog-stats">
                            <span className="stat-item">
                              <span className="stat-icon">👁️</span>
                              {stats.views}
                            </span>
                            <button 
                              className={`stat-item like-btn ${stats.isLiked ? 'liked' : ''}`}
                              onClick={(e) => handleLike(blog._id, e)}
                              aria-label={stats.isLiked ? "Unlike" : "Like"}
                            >
                              <span className="stat-icon">
                                {stats.isLiked ? "❤️" : "🤍"}
                              </span>
                              {stats.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="blog-card-actions">
                        <Link 
                          to={`/blog/${blog._id}`} 
                          className="read-more-btn"
                          onClick={() => handleViewIncrement(blog._id)}
                        >
                          <span>Read Article</span>
                          <span className="btn-arrow">→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
              
              {/* Modal Footer */}
              <div className="discovery-modal-footer">
                <div className="footer-stats">
                  <span className="footer-stat">
                    <span className="stat-icon">🎯</span>
                    Personalized for you
                  </span>
                  <span className="footer-stat">
                    <span className="stat-icon">⚡</span>
                    Fresh recommendations
                  </span>
                  <span className="footer-stat">
                    <span className="stat-icon">🔄</span>
                    Updated daily
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="no-results-modal">
              <div className="no-results-illustration">
                <span className="no-results-icon">🔍</span>
                <div className="search-animation"></div>
              </div>
              <h3>No Perfect Matches Found</h3>
              <p>We couldn't find articles matching your current preferences. Try adjusting your mood, reading time, or topics to discover more content.</p>
              
              <div className="no-results-suggestions">
                <h4>Try these instead:</h4>
                <div className="suggestion-tags">
                  <span className="suggestion-tag">Expand topics</span>
                  <span className="suggestion-tag">Different mood</span>
                  <span className="suggestion-tag">Longer reading time</span>
                </div>
              </div>
              
              <button className="adjust-preferences-btn" onClick={onReset}>
                <span className="btn-icon">⚙️</span>
                Adjust My Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryResultsModal;

