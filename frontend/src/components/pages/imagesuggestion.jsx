import React, { useState } from 'react';
import { Image, Sparkles, Search, Download, Copy, RefreshCw, Wand2, Palette, Camera, Zap, TrendingUp, Star, Heart, Eye, ArrowRight } from 'lucide-react';

export default function ImageSuggestionTool() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [contentDescription, setContentDescription] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [mood, setMood] = useState('professional');
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const contentTypes = [
    { id: 'blog', label: 'Blog Post', icon: '📝', color: '#667eea' },
    { id: 'social', label: 'Social Media', icon: '📱', color: '#f093fb' },
    { id: 'video', label: 'Video Thumbnail', icon: '🎬', color: '#4ecdc4' },
    { id: 'marketing', label: 'Marketing', icon: '📢', color: '#ff6b6b' }
  ];

  const moods = [
    { id: 'professional', label: 'Professional', emoji: '💼', color: '#3b82f6' },
    { id: 'creative', label: 'Creative', emoji: '🎨', color: '#8b5cf6' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: '#f59e0b' },
    { id: 'minimalist', label: 'Minimalist', emoji: '✨', color: '#10b981' },
    { id: 'bold', label: 'Bold & Vibrant', emoji: '🔥', color: '#ef4444' },
    { id: 'calm', label: 'Calm & Peaceful', emoji: '🌊', color: '#06b6d4' }
  ];

  const imageCategories = [
    'Business & Technology',
    'Nature & Landscape',
    'People & Lifestyle',
    'Abstract & Patterns',
    'Food & Culinary',
    'Travel & Adventure',
    'Health & Wellness',
    'Creative & Artistic'
  ];
const generateSuggestions = async () => {
    if (!contentDescription.trim()) {
      alert('Please describe your content first!');
      return;
    }

    setIsGenerating(true);
    
    try {
      // REPLACE WITH YOUR PEXELS API KEY
      const PEXELS_API_KEY = 'QK7W423SITdAygAPcLcLbkIoZYkKln1eVh1bIH8CLKdkaBJUcCrPtv0H';
      
      // Generate search query from content description and mood
      const searchQuery = contentDescription.split(' ').slice(0, 5).join(' ') + ' ' + mood;
      
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=8&orientation=${contentType === 'social' ? 'square' : 'landscape'}`,
        {
          headers: {
            'Authorization': PEXELS_API_KEY
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      
      console.log('Pexels API Response:', data); // Debug log
      console.log('First photo src:', data.photos[0]?.src); // Check image URLs
      
      // Transform Pexels data to our format
      const transformedSuggestions = data.photos.map((photo, index) => {
        console.log(`Photo ${index + 1} imageUrl:`, photo.src.medium); // Debug each image
        
        const extractColors = (photo) => {
          // Extract average color from Pexels (they provide avg_color)
          return [photo.avg_color || '#667eea', '#764ba2', '#f093fb'];
        };
        
        return {
          id: photo.id,
          title: photo.alt || `${mood.charAt(0).toUpperCase() + mood.slice(1)} Image ${index + 1}`,
          description: photo.alt || 'Professional stock photography',
          category: imageCategories[Math.floor(Math.random() * imageCategories.length)],
          keywords: photo.alt ? photo.alt.split(' ').filter(word => word.length > 2).slice(0, 5) : ['image', mood, contentType],
          matchScore: 95 - (index * 1),
          style: 'Photographic',
          orientation: photo.width > photo.height ? 'Landscape' : photo.width < photo.height ? 'Portrait' : 'Square',
          colors: extractColors(photo),
          trending: index < 3,
          downloads: `${(Math.random() * 3 + 1).toFixed(1)}M`,
          likes: `${Math.floor(Math.random() * 150 + 50)}K`,
          imageUrl: photo.src.large || photo.src.medium || photo.src.original,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
          pexelsUrl: photo.url
        };
      });
      
      setSuggestions(transformedSuggestions);
      setSelectedImages([]);
      
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Failed to fetch images. Please check your API key and try again.');
      
      // Fallback to mock data
      const mockSuggestions = [
        {
          id: 1,
          title: 'Dynamic Professional Workspace',
          description: 'Modern office setup with laptop and creative elements',
          category: 'Business & Technology',
          keywords: ['workspace', 'productivity', 'modern', 'professional'],
          matchScore: 95,
          style: 'Photographic',
          orientation: 'Landscape',
          colors: ['#667eea', '#764ba2', '#f093fb'],
          trending: true,
          downloads: '2.5M',
          likes: '125K'
        },
        {
          id: 2,
          title: 'Inspiring Team Collaboration',
          description: 'Diverse group working together on creative project',
          category: 'People & Lifestyle',
          keywords: ['teamwork', 'collaboration', 'diversity', 'innovation'],
          matchScore: 92,
          style: 'Photographic',
          orientation: 'Landscape',
          colors: ['#4ecdc4', '#44a6d0', '#2d8bba'],
          trending: false,
          downloads: '1.8M',
          likes: '98K'
        },
        {
          id: 3,
          title: 'Abstract Success Concept',
          description: 'Geometric shapes representing growth and achievement',
          category: 'Abstract & Patterns',
          keywords: ['abstract', 'success', 'growth', 'modern'],
          matchScore: 88,
          style: 'Illustration',
          orientation: 'Square',
          colors: ['#ff6b6b', '#ee5a52', '#ff8787'],
          trending: true,
          downloads: '3.2M',
          likes: '156K'
        },
        {
          id: 4,
          title: 'Digital Innovation Concept',
          description: 'Futuristic technology and data visualization',
          category: 'Business & Technology',
          keywords: ['technology', 'innovation', 'digital', 'future'],
          matchScore: 90,
          style: 'Digital Art',
          orientation: 'Landscape',
          colors: ['#667eea', '#4ecdc4', '#8b5cf6'],
          trending: true,
          downloads: '2.1M',
          likes: '112K'
        },
        {
          id: 5,
          title: 'Minimalist Product Display',
          description: 'Clean, simple composition with elegant lighting',
          category: 'Creative & Artistic',
          keywords: ['minimalist', 'clean', 'elegant', 'simple'],
          matchScore: 86,
          style: 'Photographic',
          orientation: 'Portrait',
          colors: ['#f0f0f0', '#e5e5e5', '#d0d0d0'],
          trending: false,
          downloads: '1.5M',
          likes: '87K'
        },
        {
          id: 6,
          title: 'Energetic Action Shot',
          description: 'Dynamic movement capturing energy and passion',
          category: 'People & Lifestyle',
          keywords: ['energy', 'action', 'dynamic', 'movement'],
          matchScore: 84,
          style: 'Photographic',
          orientation: 'Landscape',
          colors: ['#f59e0b', '#f97316', '#fb923c'],
          trending: false,
          downloads: '1.9M',
          likes: '95K'
        },
        {
          id: 7,
          title: 'Nature Meets Technology',
          description: 'Harmonious blend of natural and digital elements',
          category: 'Nature & Landscape',
          keywords: ['nature', 'technology', 'harmony', 'balance'],
          matchScore: 89,
          style: 'Composite',
          orientation: 'Landscape',
          colors: ['#10b981', '#059669', '#34d399'],
          trending: true,
          downloads: '2.8M',
          likes: '142K'
        },
        {
          id: 8,
          title: 'Bold Typography Design',
          description: 'Eye-catching text-based visual with vibrant colors',
          category: 'Creative & Artistic',
          keywords: ['typography', 'bold', 'colorful', 'graphic'],
          matchScore: 87,
          style: 'Graphic Design',
          orientation: 'Square',
          colors: ['#ef4444', '#f59e0b', '#8b5cf6'],
          trending: false,
          downloads: '2.3M',
          likes: '118K'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setSelectedImages([]);
    } finally {
      setIsGenerating(false);
    }
  };


  const copyKeywords = (keywords, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(keywords.join(', '));
    const button = event.currentTarget;
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span style="display: flex; align-items: center; gap: 0.25rem;">✓ Copied!</span>';
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  };

  const downloadSuggestions = () => {
    const imagesToDownload = selectedImages.length > 0 
      ? suggestions.filter(img => selectedImages.includes(img.id))
      : suggestions;

    const content = `IMAGE SUGGESTIONS FOR: ${contentDescription.toUpperCase()}\n` +
                   `Content Type: ${contentTypes.find(t => t.id === contentType)?.label}\n` +
                   `Mood: ${moods.find(m => m.id === mood)?.label}\n` +
                   `Generated on ${new Date().toLocaleDateString()}\n` +
                   `Total Suggestions: ${imagesToDownload.length}\n\n` +
                   `${'='.repeat(80)}\n\n` +
                   imagesToDownload.map((img, i) => 
                     `${i + 1}. ${img.title}\n` +
                     `   Match Score: ${img.matchScore}% | Style: ${img.style}\n` +
                     `   Category: ${img.category}\n` +
                     `   Description: ${img.description}\n` +
                     `   Keywords: ${img.keywords.join(', ')}\n` +
                     `   Search Terms: "${img.title.toLowerCase()}" OR "${img.keywords.join('" OR "')}"` +
                     `${img.trending ? ' | 🔥 TRENDING' : ''}\n` +
                     `   Stats: ${img.downloads} downloads | ${img.likes} likes\n\n` +
                     `${'-'.repeat(80)}\n\n`
                   ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-suggestions-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (currentPage === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 400 + 200}px`,
            height: `${Math.random() * 400 + 200}px`,
            background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(80px)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${10 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1}s`
          }} />
        ))}

        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Hero Icons */}
          <div style={{
            fontSize: '5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem'
          }}>
            <span style={{ animation: 'bounce 2s ease-in-out infinite' }}>🎨</span>
            <span style={{ animation: 'bounce 2s ease-in-out infinite 0.3s' }}>📸</span>
            <span style={{ animation: 'bounce 2s ease-in-out infinite 0.6s' }}>✨</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            textShadow: '0 4px 6px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            AI Image Suggestion
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: '1.7',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Get AI-powered image recommendations perfectly matched to your content
          </p>
          
          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {[
              { icon: '🎯', title: 'Smart Matching', desc: 'AI analyzes your content' },
              { icon: '⚡', title: 'Instant Results', desc: 'Get suggestions in seconds' },
              { icon: '🎨', title: 'Style Options', desc: 'Multiple moods & styles' },
              { icon: '🔍', title: 'Search Ready', desc: 'Keywords for stock sites' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                padding: '2rem 1.5rem',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                animation: `fadeInUp ${0.5 + i * 0.15}s ease-out`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>{feature.desc}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <button
            onClick={() => setCurrentPage('generator')}
            style={{
              padding: '1.5rem 3.5rem',
              background: 'white',
              border: 'none',
              borderRadius: '50px',
              color: '#667eea',
              fontSize: '1.3rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.08) translateY(-5px)';
              e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
            }}
          >
            <Wand2 size={28} />
            Start Creating
            <ArrowRight size={24} />
          </button>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            {['100% Free', 'No Sign Up', 'AI-Powered'].map((badge, i) => (
              <div key={i} style={{
                padding: '0.6rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50px',
                fontSize: '1rem',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                fontWeight: '600'
              }}>
                ✨ {badge}
              </div>
            ))}
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.1); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}} />

      {/* Back Button */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '2rem' }}>
        <button
          onClick={() => setCurrentPage('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.75rem',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Card */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '30px',
        padding: '3rem',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨✨📸</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem'
          }}>
            AI Image Suggestion Tool
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.15rem', fontWeight: '500' }}>
            Describe your content and get perfect image recommendations
          </p>
        </div>

        {/* Content Description */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            📝 Describe Your Content
          </label>
          <textarea
            value={contentDescription}
            onChange={(e) => setContentDescription(e.target.value)}
            placeholder="E.g., A blog post about productivity tips for remote workers, featuring time management strategies and work-life balance..."
            rows={4}
            style={{
              width: '100%',
              padding: '1.3rem',
              border: '2px solid #e5e7eb',
              borderRadius: '18px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Content Type */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🎯 Content Type
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {contentTypes.map((type) => {
              const isActive = contentType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  style={{
                    padding: '1.25rem',
                    border: isActive ? `2px solid ${type.color}` : '2px solid #e5e7eb',
                    borderRadius: '18px',
                    background: isActive ? `${type.color}15` : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: isActive ? `0 10px 30px ${type.color}30` : 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 15px 40px ${type.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isActive ? `0 10px 30px ${type.color}30` : 'none';
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{type.icon}</span>
                  <span style={{
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    color: isActive ? type.color : '#374151'
                  }}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood Selector */}
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🎨 Image Mood & Style
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {moods.map((m) => {
              const isActive = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  style={{
                    padding: '1rem',
                    border: isActive ? `2px solid ${m.color}` : '2px solid #e5e7eb',
                    borderRadius: '15px',
                    background: isActive ? `${m.color}15` : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${m.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '1.75rem' }}>{m.emoji}</span>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    color: isActive ? m.color : '#374151',
                    textAlign: 'center'
                  }}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSuggestions}
          disabled={isGenerating}
          style={{
            width: '100%',
            padding: '1.5rem',
            background: isGenerating 
              ? '#9ca3af'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '18px',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s ease',
            boxShadow: isGenerating ? 'none' : '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = isGenerating ? 'none' : '0 10px 30px rgba(102, 126, 234, 0.4)';
          }}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite' }} />
              Analyzing Content & Generating Suggestions...
            </>
          ) : (
            <>
              <Sparkles size={24} />
              Generate Image Suggestions
            </>
          )}
        </button>

        {/* Suggestions Grid */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '900',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Camera size={28} color="#667eea" />
                Image Suggestions ({suggestions.length})
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {selectedImages.length > 0 && (
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#667eea20',
                    color: '#667eea',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Star size={16} />
                    {selectedImages.length} selected
                  </span>
                )}
                <button
                  onClick={downloadSuggestions}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <Download size={18} />
                  {selectedImages.length > 0 ? `Download ${selectedImages.length}` : 'Download All'}
                </button>
              </div>
            </div>

            {/* Suggestions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {suggestions.map((img, index) => {
                const isSelected = selectedImages.includes(img.id);
                
                return (
                  <div
                    key={img.id}
                    onClick={() => toggleSelectImage(img.id)}
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, #667eea15 0%, #ffffff 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                      borderRadius: '20px',
                      border: isSelected 
                        ? '3px solid #667eea'
                        : '2px solid #e5e7eb',
                      padding: '1.75rem',
                      transition: 'all 0.3s ease',
                      animation: `slideIn ${0.3 + index * 0.05}s ease-out`,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: '#667eea',
                        borderRadius: '50%',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                      }}>
                        <Star size={16} fill="white" color="white" />
                      </div>
                    )}

                    {/* Trending Badge */}
                    {img.trending && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'white',
                        animation: 'pulse 2s ease-in-out infinite',
                        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                        zIndex: 2
                      }}>
                        🔥 TRENDING
                      </div>
                    )}

                    

                    {/* Match Score */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        flex: 1,
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${img.matchScore}%`,
                          height: '100%',
                          background: img.matchScore >= 90 
                            ? 'linear-gradient(90deg, #10b981, #059669)'
                            : img.matchScore >= 85
                              ? 'linear-gradient(90deg, #3b82f6, #2563eb)'
                              : 'linear-gradient(90deg, #f59e0b, #d97706)',
                          transition: 'width 1s ease'
                        }} />
                      </div>
                      <span style={{
                        fontWeight: '700',
                        fontSize: '1rem',
                        color: img.matchScore >= 90 ? '#10b981' : img.matchScore >= 85 ? '#3b82f6' : '#f59e0b'
                      }}>
                        {img.matchScore}%
                      </span>
                    </div>

                    {/* Content */}
                    <h4 style={{
                      color: '#1f2937',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4'
                    }}>
                      {img.title}
                    </h4>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.95rem',
                      marginBottom: '1.25rem',
                      lineHeight: '1.6'
                    }}>
                      {img.description}
                    </p>

                    {/* Metadata */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        padding: '0.4rem 0.9rem',
                        background: '#667eea20',
                        color: '#667eea',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {img.style}
                      </span>
                      <span style={{
                        padding: '0.4rem 0.9rem',
                        background: '#4ecdc420',
                        color: '#4ecdc4',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {img.orientation}
                      </span>
                      <span style={{
                        padding: '0.4rem 0.9rem',
                        background: '#f59e0b20',
                        color: '#f59e0b',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {img.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '1.25rem',
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Download size={14} />
                        {img.downloads}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Heart size={14} />
                        {img.likes}
                      </div>
                    </div>

                    {/* Keywords */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        🔍 Search Keywords
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '0.4rem',
                        flexWrap: 'wrap'
                      }}>
                        {img.keywords.map((keyword, i) => (
                          <span key={i} style={{
                            padding: '0.3rem 0.7rem',
                            background: '#f3f4f6',
                            color: '#4b5563',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Image Display */}
                    {img.imageUrl && (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '15px',
                        marginBottom: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#f3f4f6'
                      }}>
                        <img 
                          src={img.imageUrl} 
                          alt={img.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </div>
                    )}

                    {/* Color Palette */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        🎨 Color Palette
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {img.colors.map((color, i) => (
                          <div key={i} style={{
                            width: '40px',
                            height: '40px',
                            background: color,
                            borderRadius: '10px',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => copyKeywords(img.keywords, e)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        color: '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        e.target.style.background = '#667eea';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#6b7280';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <Copy size={16} />
                      Copy Keywords
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Stock Photo Sites */}
            <div style={{
              marginTop: '3rem',
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #667eea15, #764ba215)',
              borderRadius: '20px',
              border: '2px solid #667eea30'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Search size={24} color="#667eea" />
                Find These Images On
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {['Unsplash', 'Pexels', 'Pixabay', 'Freepik', 'Shutterstock', 'Adobe Stock'].map((site, i) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '15px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    {site}
                  </div>
                ))}
              </div>
              <p style={{
                marginTop: '1.5rem',
                color: '#6b7280',
                fontSize: '0.95rem',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                💡 <strong>Pro Tip:</strong> Copy the keywords above and paste them into any stock photo site's search bar to find similar images!
              </p>
            </div>

            {/* Regenerate CTA */}
            <div style={{
              marginTop: '2.5rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, #4ecdc420, #44a6d020)',
              borderRadius: '20px',
              border: '2px dashed #4ecdc4',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#374151',
                fontWeight: '600',
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                <Sparkles size={22} color="#4ecdc4" />
                Need different suggestions? Try adjusting your description or mood!
              </p>
              <button
                onClick={generateSuggestions}
                style={{
                  padding: '0.85rem 2rem',
                  background: 'linear-gradient(135deg, #4ecdc4, #44a6d0)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 25px rgba(78, 205, 196, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <RefreshCw size={18} />
                Generate New Suggestions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useState, useContext } from 'react';
// import { Image, Sparkles, Search, Download, Copy, RefreshCw, Wand2, Palette, Camera, Zap, TrendingUp, Star, Heart, Eye, ArrowRight } from 'lucide-react';
// import { Context } from '../../main';

// export default function ImageSuggestionTool() {
//   const { mode } = useContext(Context);
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [contentDescription, setContentDescription] = useState('');
//   const [contentType, setContentType] = useState('blog');
//   const [mood, setMood] = useState('professional');
//   const [suggestions, setSuggestions] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);

//   const isDark = mode === 'dark';

//   const contentTypes = [
//     { id: 'blog', label: 'Blog Post', icon: '📝', color: '#667eea' },
//     { id: 'social', label: 'Social Media', icon: '📱', color: '#f093fb' },
//     { id: 'video', label: 'Video Thumbnail', icon: '🎬', color: '#4ecdc4' },
//     { id: 'marketing', label: 'Marketing', icon: '📢', color: '#ff6b6b' }
//   ];

//   const moods = [
//     { id: 'professional', label: 'Professional', emoji: '💼', color: '#3b82f6' },
//     { id: 'creative', label: 'Creative', emoji: '🎨', color: '#8b5cf6' },
//     { id: 'energetic', label: 'Energetic', emoji: '⚡', color: '#f59e0b' },
//     { id: 'minimalist', label: 'Minimalist', emoji: '✨', color: '#10b981' },
//     { id: 'bold', label: 'Bold & Vibrant', emoji: '🔥', color: '#ef4444' },
//     { id: 'calm', label: 'Calm & Peaceful', emoji: '🌊', color: '#06b6d4' }
//   ];

//   const imageCategories = [
//     'Business & Technology',
//     'Nature & Landscape',
//     'People & Lifestyle',
//     'Abstract & Patterns',
//     'Food & Culinary',
//     'Travel & Adventure',
//     'Health & Wellness',
//     'Creative & Artistic'
//   ];

//   const toggleSelectImage = (imageId) => {
//     setSelectedImages(prev => 
//       prev.includes(imageId) 
//         ? prev.filter(id => id !== imageId)
//         : [...prev, imageId]
//     );
//   };

//   const generateSuggestions = async () => {
//     if (!contentDescription.trim()) {
//       alert('Please describe your content first!');
//       return;
//     }

//     setIsGenerating(true);
    
//     try {
//       const PEXELS_API_KEY = 'QK7W423SITdAygAPcLcLbkIoZYkKln1eVh1bIH8CLKdkaBJUcCrPtv0H';
//       const searchQuery = contentDescription.split(' ').slice(0, 5).join(' ') + ' ' + mood;
      
//       const response = await fetch(
//         `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=8&orientation=${contentType === 'social' ? 'square' : 'landscape'}`,
//         {
//           headers: {
//             'Authorization': PEXELS_API_KEY
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch images');
//       }
      
//       const data = await response.json();
      
//       const transformedSuggestions = data.photos.map((photo, index) => {
//         const extractColors = (photo) => {
//           return [photo.avg_color || '#667eea', '#764ba2', '#f093fb'];
//         };
        
//         return {
//           id: photo.id,
//           title: photo.alt || `${mood.charAt(0).toUpperCase() + mood.slice(1)} Image ${index + 1}`,
//           description: photo.alt || 'Professional stock photography',
//           category: imageCategories[Math.floor(Math.random() * imageCategories.length)],
//           keywords: photo.alt ? photo.alt.split(' ').filter(word => word.length > 2).slice(0, 5) : ['image', mood, contentType],
//           matchScore: 95 - (index * 1),
//           style: 'Photographic',
//           orientation: photo.width > photo.height ? 'Landscape' : photo.width < photo.height ? 'Portrait' : 'Square',
//           colors: extractColors(photo),
//           trending: index < 3,
//           downloads: `${(Math.random() * 3 + 1).toFixed(1)}M`,
//           likes: `${Math.floor(Math.random() * 150 + 50)}K`,
//           imageUrl: photo.src.large || photo.src.medium || photo.src.original,
//           photographer: photo.photographer,
//           photographerUrl: photo.photographer_url,
//           pexelsUrl: photo.url
//         };
//       });
      
//       setSuggestions(transformedSuggestions);
//       setSelectedImages([]);
      
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       alert('Failed to fetch images. Please check your API key and try again.');
      
//       const mockSuggestions = [
//         {
//           id: 1,
//           title: 'Dynamic Professional Workspace',
//           description: 'Modern office setup with laptop and creative elements',
//           category: 'Business & Technology',
//           keywords: ['workspace', 'productivity', 'modern', 'professional'],
//           matchScore: 95,
//           style: 'Photographic',
//           orientation: 'Landscape',
//           colors: ['#667eea', '#764ba2', '#f093fb'],
//           trending: true,
//           downloads: '2.5M',
//           likes: '125K'
//         },
//         {
//           id: 2,
//           title: 'Inspiring Team Collaboration',
//           description: 'Diverse group working together on creative project',
//           category: 'People & Lifestyle',
//           keywords: ['teamwork', 'collaboration', 'diversity', 'innovation'],
//           matchScore: 92,
//           style: 'Photographic',
//           orientation: 'Landscape',
//           colors: ['#4ecdc4', '#44a6d0', '#2d8bba'],
//           trending: false,
//           downloads: '1.8M',
//           likes: '98K'
//         },
//         {
//           id: 3,
//           title: 'Abstract Success Concept',
//           description: 'Geometric shapes representing growth and achievement',
//           category: 'Abstract & Patterns',
//           keywords: ['abstract', 'success', 'growth', 'modern'],
//           matchScore: 88,
//           style: 'Illustration',
//           orientation: 'Square',
//           colors: ['#ff6b6b', '#ee5a52', '#ff8787'],
//           trending: true,
//           downloads: '3.2M',
//           likes: '156K'
//         },
//         {
//           id: 4,
//           title: 'Digital Innovation Concept',
//           description: 'Futuristic technology and data visualization',
//           category: 'Business & Technology',
//           keywords: ['technology', 'innovation', 'digital', 'future'],
//           matchScore: 90,
//           style: 'Digital Art',
//           orientation: 'Landscape',
//           colors: ['#667eea', '#4ecdc4', '#8b5cf6'],
//           trending: true,
//           downloads: '2.1M',
//           likes: '112K'
//         },
//         {
//           id: 5,
//           title: 'Minimalist Product Display',
//           description: 'Clean, simple composition with elegant lighting',
//           category: 'Creative & Artistic',
//           keywords: ['minimalist', 'clean', 'elegant', 'simple'],
//           matchScore: 86,
//           style: 'Photographic',
//           orientation: 'Portrait',
//           colors: ['#f0f0f0', '#e5e5e5', '#d0d0d0'],
//           trending: false,
//           downloads: '1.5M',
//           likes: '87K'
//         },
//         {
//           id: 6,
//           title: 'Energetic Action Shot',
//           description: 'Dynamic movement capturing energy and passion',
//           category: 'People & Lifestyle',
//           keywords: ['energy', 'action', 'dynamic', 'movement'],
//           matchScore: 84,
//           style: 'Photographic',
//           orientation: 'Landscape',
//           colors: ['#f59e0b', '#f97316', '#fb923c'],
//           trending: false,
//           downloads: '1.9M',
//           likes: '95K'
//         },
//         {
//           id: 7,
//           title: 'Nature Meets Technology',
//           description: 'Harmonious blend of natural and digital elements',
//           category: 'Nature & Landscape',
//           keywords: ['nature', 'technology', 'harmony', 'balance'],
//           matchScore: 89,
//           style: 'Composite',
//           orientation: 'Landscape',
//           colors: ['#10b981', '#059669', '#34d399'],
//           trending: true,
//           downloads: '2.8M',
//           likes: '142K'
//         },
//         {
//           id: 8,
//           title: 'Bold Typography Design',
//           description: 'Eye-catching text-based visual with vibrant colors',
//           category: 'Creative & Artistic',
//           keywords: ['typography', 'bold', 'colorful', 'graphic'],
//           matchScore: 87,
//           style: 'Graphic Design',
//           orientation: 'Square',
//           colors: ['#ef4444', '#f59e0b', '#8b5cf6'],
//           trending: false,
//           downloads: '2.3M',
//           likes: '118K'
//         }
//       ];
      
//       setSuggestions(mockSuggestions);
//       setSelectedImages([]);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const copyKeywords = (keywords, event) => {
//     event.stopPropagation();
//     navigator.clipboard.writeText(keywords.join(', '));
//     const button = event.currentTarget;
//     const originalHTML = button.innerHTML;
//     button.innerHTML = '<span style="display: flex; align-items: center; gap: 0.25rem;">✓ Copied!</span>';
//     setTimeout(() => {
//       button.innerHTML = originalHTML;
//     }, 2000);
//   };

//   const downloadSuggestions = () => {
//     const imagesToDownload = selectedImages.length > 0 
//       ? suggestions.filter(img => selectedImages.includes(img.id))
//       : suggestions;

//     const content = `IMAGE SUGGESTIONS FOR: ${contentDescription.toUpperCase()}\n` +
//                    `Content Type: ${contentTypes.find(t => t.id === contentType)?.label}\n` +
//                    `Mood: ${moods.find(m => m.id === mood)?.label}\n` +
//                    `Generated on ${new Date().toLocaleDateString()}\n` +
//                    `Total Suggestions: ${imagesToDownload.length}\n\n` +
//                    `${'='.repeat(80)}\n\n` +
//                    imagesToDownload.map((img, i) => 
//                      `${i + 1}. ${img.title}\n` +
//                      `   Match Score: ${img.matchScore}% | ⏱️ Style: ${img.style}\n` +
//                      `   Category: ${img.category}\n` +
//                      `   Description: ${img.description}\n` +
//                      `   Keywords: ${img.keywords.join(', ')}\n` +
//                      `   Search Terms: "${img.title.toLowerCase()}" OR "${img.keywords.join('" OR "')}"` +
//                      `${img.trending ? ' | 🔥 TRENDING' : ''}\n` +
//                      `   Stats: ${img.downloads} downloads | ${img.likes} likes\n\n` +
//                      `${'-'.repeat(80)}\n\n`
//                    ).join('');
    
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `image-suggestions-${Date.now()}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   if (currentPage === 'landing') {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         background: isDark 
//           ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
//           : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem',
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         {/* Animated Background Elements */}
//         {[...Array(5)].map((_, i) => (
//           <div key={i} style={{
//             position: 'absolute',
//             width: `${Math.random() * 400 + 200}px`,
//             height: `${Math.random() * 400 + 200}px`,
//             background: isDark
//               ? `radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)`
//               : `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
//             borderRadius: '50%',
//             filter: 'blur(80px)',
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animation: `float ${10 + i * 2}s ease-in-out infinite`,
//             animationDelay: `${i * 1}s`
//           }} />
//         ))}

//         <div style={{
//           textAlign: 'center',
//           maxWidth: '800px',
//           color: 'white',
//           position: 'relative',
//           zIndex: 1
//         }}>
//           {/* Hero Icons */}
//           <div style={{
//             fontSize: '5rem',
//             marginBottom: '2rem',
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '1.5rem'
//           }}>
//             <span style={{ animation: 'bounce 2s ease-in-out infinite' }}>🎨</span>
//             <span style={{ animation: 'bounce 2s ease-in-out infinite 0.3s' }}>📸</span>
//             <span style={{ animation: 'bounce 2s ease-in-out infinite 0.6s' }}>✨</span>
//           </div>
          
//           <h1 style={{
//             fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
//             fontWeight: '900',
//             marginBottom: '1.5rem',
//             textShadow: '0 4px 6px rgba(0,0,0,0.3)',
//             lineHeight: '1.2',
//             background: isDark
//               ? 'linear-gradient(to right, #4ecdc4, #44a6d0)'
//               : 'linear-gradient(to right, #fff, #f0f0f0)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text'
//           }}>
//             AI Image Suggestion
//           </h1>
          
//           <p style={{
//             fontSize: '1.5rem',
//             marginBottom: '3rem',
//             color: 'rgba(255,255,255,0.95)',
//             lineHeight: '1.7',
//             textShadow: '0 2px 4px rgba(0,0,0,0.2)'
//           }}>
//             Get AI-powered image recommendations perfectly matched to your content
//           </p>
          
//           {/* Feature Cards */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//             gap: '1.5rem',
//             marginBottom: '3rem'
//           }}>
//             {[
//               { icon: '🎯', title: 'Smart Matching', desc: 'AI analyzes your content' },
//               { icon: '⚡', title: 'Instant Results', desc: 'Get suggestions in seconds' },
//               { icon: '🎨', title: 'Style Options', desc: 'Multiple moods & styles' },
//               { icon: '🔍', title: 'Search Ready', desc: 'Keywords for stock sites' }
//             ].map((feature, i) => (
//               <div key={i} style={{
//                 background: isDark 
//                   ? 'rgba(78, 205, 196, 0.1)'
//                   : 'rgba(255,255,255,0.15)',
//                 padding: '2rem 1.5rem',
//                 borderRadius: '20px',
//                 backdropFilter: 'blur(10px)',
//                 border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.2)'}`,
//                 animation: `fadeInUp ${0.5 + i * 0.15}s ease-out`,
//                 transition: 'all 0.3s ease',
//                 cursor: 'pointer'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
//                 e.currentTarget.style.background = isDark 
//                   ? 'rgba(78, 205, 196, 0.2)'
//                   : 'rgba(255,255,255,0.25)';
//                 e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                 e.currentTarget.style.background = isDark 
//                   ? 'rgba(78, 205, 196, 0.1)'
//                   : 'rgba(255,255,255,0.15)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}>
//                 <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
//                 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</div>
//                 <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>{feature.desc}</div>
//               </div>
//             ))}
//           </div>
          
//           {/* CTA Button */}
//           <button
//             onClick={() => setCurrentPage('generator')}
//             style={{
//               padding: '1.5rem 3.5rem',
//               background: 'white',
//               border: 'none',
//               borderRadius: '50px',
//               color: isDark ? '#1a1a2e' : '#667eea',
//               fontSize: '1.3rem',
//               fontWeight: '700',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '1rem'
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = 'scale(1.08) translateY(-5px)';
//               e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = 'scale(1) translateY(0)';
//               e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
//             }}
//           >
//             <Wand2 size={28} />
//             Start Creating
//             <ArrowRight size={24} />
//           </button>

//           {/* Trust Badges */}
//           <div style={{
//             display: 'flex',
//             gap: '1.5rem',
//             justifyContent: 'center',
//             marginTop: '3rem',
//             flexWrap: 'wrap'
//           }}>
//             {['100% Free', 'No Sign Up', 'AI-Powered'].map((badge, i) => (
//               <div key={i} style={{
//                 padding: '0.6rem 1.5rem',
//                 background: isDark 
//                   ? 'rgba(78, 205, 196, 0.15)'
//                   : 'rgba(255,255,255,0.2)',
//                 borderRadius: '50px',
//                 fontSize: '1rem',
//                 border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255,255,255,0.3)'}`,
//                 backdropFilter: 'blur(10px)',
//                 fontWeight: '600'
//               }}>
//                 ✨ {badge}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <style dangerouslySetInnerHTML={{__html: `
//           @keyframes float {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-20px); }
//           }
//           @keyframes bounce {
//             0%, 100% { transform: translateY(0) scale(1); }
//             50% { transform: translateY(-20px) scale(1.1); }
//           }
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}} />
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: isDark 
//         ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
//         : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
//       padding: '2rem'
//     }}>
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.05); }
//         }
//       `}} />

//       {/* Back Button */}
//       <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '2rem' }}>
//         <button
//           onClick={() => setCurrentPage('landing')}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             padding: '0.85rem 1.75rem',
//             background: isDark 
//               ? 'rgba(78, 205, 196, 0.15)'
//               : 'rgba(255,255,255,0.2)',
//             border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255,255,255,0.3)'}`,
//             borderRadius: '50px',
//             color: 'white',
//             fontSize: '1rem',
//             cursor: 'pointer',
//             backdropFilter: 'blur(10px)',
//             transition: 'all 0.3s ease',
//             fontWeight: '600'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = isDark 
//               ? 'rgba(78, 205, 196, 0.25)'
//               : 'rgba(255,255,255,0.3)';
//             e.target.style.transform = 'translateX(-5px)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = isDark 
//               ? 'rgba(78, 205, 196, 0.15)'
//               : 'rgba(255,255,255,0.2)';
//             e.target.style.transform = 'translateX(0)';
//           }}
//         >
//           ← Back to Home
//         </button>
//       </div>

//       {/* Main Card */}
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         background: isDark 
//           ? 'rgba(30, 41, 59, 0.95)'
//           : 'rgba(255, 255, 255, 0.98)',
//         borderRadius: '30px',
//         padding: '3rem',
//         boxShadow: isDark
//           ? '0 30px 80px rgba(0,0,0,0.5)'
//           : '0 30px 80px rgba(0,0,0,0.3)',
//         backdropFilter: 'blur(20px)',
//         border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255,255,255,0.5)'}`
//       }}>
//         {/* Header */}
//         <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
//           <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨✨📸</div>
//           <h2 style={{
//             fontSize: 'clamp(2rem, 4vw, 3rem)',
//             fontWeight: '900',
//             background: isDark
//               ? 'linear-gradient(135deg, #4ecdc4 0%, #44a6d0 100%)'
//               : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             marginBottom: '0.75rem'
//           }}>
//             AI Image Suggestion Tool
//           </h2>
//           <p style={{ color: isDark ? '#94a3b8' : '#6b7280', fontSize: '1.15rem', fontWeight: '500' }}>
//             Describe your content and get perfect image recommendations
//           </p>
//         </div>

//         {/* Content Description */}
//         <div style={{ marginBottom: '2rem' }}>
//           <label style={{
//             display: 'block',
//             fontSize: '0.95rem',
//             fontWeight: '700',
//             color: isDark ? '#e2e8f0' : '#374151',
//             marginBottom: '0.75rem',
//             textTransform: 'uppercase',
//             letterSpacing: '1px'
//           }}>
//             📝 Describe Your Content
//           </label>
//           <textarea
//             value={contentDescription}
//             onChange={(e) => setContentDescription(e.target.value)}
//             placeholder="E.g., A blog post about productivity tips for remote workers, featuring time management strategies and work-life balance..."
//             rows={4}
//             style={{
//               width: '100%',
//               padding: '1.3rem',
//               border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//               borderRadius: '18px',
//               fontSize: '1rem',
//               outline: 'none',
//               transition: 'all 0.3s ease',
//               boxSizing: 'border-box',
//               fontFamily: 'inherit',
//               resize: 'vertical',
//               background: isDark ? '#1e293b' : 'white',
//               color: isDark ? '#e2e8f0' : '#1f2937'
//             }}
//             onFocus={(e) => {
//               const activeColor = isDark ? '#4ecdc4' : '#667eea';
//               e.target.style.borderColor = activeColor;
//               e.target.style.boxShadow = `0 0 0 4px ${activeColor}20`;
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = isDark ? '#334155' : '#e5e7eb';
//               e.target.style.boxShadow = 'none';
//             }}
//           />
//         </div>

//         {/* Content Type */}
//         <div style={{ marginBottom: '2rem' }}>
//           <label style={{
//             display: 'block',
//             fontSize: '0.95rem',
//             fontWeight: '700',
//             color: isDark ? '#e2e8f0' : '#374151',
//             marginBottom: '1rem',
//             textTransform: 'uppercase',
//             letterSpacing: '1px'
//           }}>
//             🎯 Content Type
//           </label>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//             gap: '1rem'
//           }}>
//             {contentTypes.map((type) => {
//               const isActive = contentType === type.id;
//               return (
//                 <button
//                   key={type.id}
//                   onClick={() => setContentType(type.id)}
//                   style={{
//                     padding: '1.25rem',
//                     border: isActive ? `2px solid ${type.color}` : `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//                     borderRadius: '18px',
//                     background: isActive 
//                       ? isDark 
//                         ? `${type.color}20`
//                         : `${type.color}15`
//                       : isDark ? '#1e293b' : 'white',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     gap: '0.75rem',
//                     boxShadow: isActive ? `0 10px 30px ${type.color}30` : 'none'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-5px)';
//                     e.currentTarget.style.boxShadow = `0 15px 40px ${type.color}40`;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = isActive ? `0 10px 30px ${type.color}30` : 'none';
//                   }}
//                 >
//                   <span style={{ fontSize: '2rem' }}>{type.icon}</span>
//                   <span style={{
//                     fontWeight: '700',
//                     fontSize: '0.95rem',
//                     color: isActive ? type.color : isDark ? '#cbd5e1' : '#374151'
//                   }}>
//                     {type.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Mood Selector */}
//         <div style={{ marginBottom: '2.5rem' }}>
//           <label style={{
//             display: 'block',
//             fontSize: '0.95rem',
//             fontWeight: '700',
//             color: isDark ? '#e2e8f0' : '#374151',
//             marginBottom: '1rem',
//             textTransform: 'uppercase',
//             letterSpacing: '1px'
//           }}>
//             🎨 Image Mood & Style
//           </label>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
//             gap: '1rem'
//           }}>
//             {moods.map((m) => {
//               const isActive = mood === m.id;
//               return (
//                 <button
//                   key={m.id}
//                   onClick={() => setMood(m.id)}
//                   style={{
//                     padding: '1rem',
//                     border: isActive ? `2px solid ${m.color}` : `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//                     borderRadius: '15px',
//                     background: isActive 
//                       ? isDark 
//                         ? `${m.color}20`
//                         : `${m.color}15`
//                       : isDark ? '#1e293b' : 'white',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     gap: '0.5rem'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'scale(1.05)';
//                     e.currentTarget.style.boxShadow = `0 8px 20px ${m.color}30`;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'scale(1)';
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}
//                 >
//                   <span style={{ fontSize: '1.75rem' }}>{m.emoji}</span>
//                   <span style={{
//                     fontWeight: '600',
//                     fontSize: '0.85rem',
//                     color: isActive ? m.color : isDark ? '#cbd5e1' : '#374151',
//                     textAlign: 'center'
//                   }}>
//                     {m.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={generateSuggestions}
//           disabled={isGenerating}
//           style={{
//             width: '100%',
//             padding: '1.5rem',
//             background: isGenerating 
//               ? isDark ? '#475569' : '#9ca3af'
//               : isDark 
//                 ? 'linear-gradient(135deg, #4ecdc4 0%, #44a6d0 100%)'
//                 : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             border: 'none',
//             borderRadius: '18px',
//             color: 'white',
//             fontSize: '1.2rem',
//             fontWeight: '700',
//             cursor: isGenerating ? 'not-allowed' : 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '0.75rem',
//             transition: 'all 0.3s ease',
//             boxShadow: isGenerating 
//               ? 'none' 
//               : isDark
//                 ? '0 10px 30px rgba(78, 205, 196, 0.4)'
//                 : '0 10px 30px rgba(102, 126, 234, 0.4)'
//           }}
//           onMouseEnter={(e) => {
//             if (!isGenerating) {
//               e.target.style.transform = 'translateY(-3px)';
//               e.target.style.boxShadow = isDark
//                 ? '0 15px 40px rgba(78, 205, 196, 0.5)'
//                 : '0 15px 40px rgba(102, 126, 234, 0.5)';
//             }
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = isGenerating 
//               ? 'none' 
//               : isDark
//                 ? '0 10px 30px rgba(78, 205, 196, 0.4)'
//                 : '0 10px 30px rgba(102, 126, 234, 0.4)';
//           }}
//         >
//           {isGenerating ? (
//             <>
//               <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite' }} />
//               Analyzing Content & Generating Suggestions...
//             </>
//           ) : (
//             <>
//               <Sparkles size={24} />
//               Generate Image Suggestions
//             </>
//           )}
//         </button>

//         {/* Suggestions Grid */}
//         {suggestions.length > 0 && (
//           <div style={{ marginTop: '3.5rem' }}>
//             {/* Header */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '2rem',
//               flexWrap: 'wrap',
//               gap: '1rem'
//             }}>
//               <h3 style={{
//                 fontSize: '1.75rem',
//                 fontWeight: '900',
//                 color: isDark ? '#e2e8f0' : '#1f2937',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem'
//               }}>
//                 <Camera size={28} color={isDark ? '#4ecdc4' : '#667eea'} />
//                 Image Suggestions ({suggestions.length})
//               </h3>
//               <div style={{ display: 'flex', gap: '0.75rem' }}>
//                 {selectedImages.length > 0 && (
//                   <span style={{
//                     padding: '0.5rem 1rem',
//                     background: isDark ? '#4ecdc420' : '#667eea20',
//                     color: isDark ? '#4ecdc4' : '#667eea',
//                     borderRadius: '50px',
//                     fontSize: '0.9rem',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '0.5rem'
//                   }}>
//                     <Star size={16} />
//                     {selectedImages.length} selected
//                   </span>
//                 )}
//                 <button
//                   onClick={downloadSuggestions}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '0.5rem',
//                     padding: '0.75rem 1.5rem',
//                     background: 'linear-gradient(135deg, #10b981, #059669)',
//                     border: 'none',
//                     borderRadius: '50px',
//                     color: 'white',
//                     fontSize: '0.95rem',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = 'translateY(-3px)';
//                     e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = 'translateY(0)';
//                     e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
//                   }}
//                 >
//                   <Download size={18} />
//                   {selectedImages.length > 0 ? `Download ${selectedImages.length}` : 'Download All'}
//                 </button>
//               </div>
//             </div>

//             {/* Suggestions Grid */}
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
//               gap: '1.5rem'
//             }}>
//               {suggestions.map((img, index) => {
//                 const isSelected = selectedImages.includes(img.id);
                
//                 return (
//                   <div
//                     key={img.id}
//                     onClick={() => toggleSelectImage(img.id)}
//                     style={{
//                       background: isDark 
//                         ? isSelected 
//                           ? 'linear-gradient(135deg, #4ecdc415 0%, #1e293b 100%)'
//                           : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
//                         : isSelected 
//                           ? 'linear-gradient(135deg, #667eea15 0%, #ffffff 100%)'
//                           : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
//                       borderRadius: '20px',
//                       border: isSelected 
//                         ? `3px solid ${isDark ? '#4ecdc4' : '#667eea'}`
//                         : `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//                       padding: '1.75rem',
//                       transition: 'all 0.3s ease',
//                       animation: `slideIn ${0.3 + index * 0.05}s ease-out`,
//                       cursor: 'pointer',
//                       position: 'relative',
//                       overflow: 'hidden'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = 'translateY(-8px)';
//                       e.currentTarget.style.boxShadow = isDark
//                         ? '0 20px 40px rgba(0,0,0,0.4)'
//                         : '0 20px 40px rgba(102, 126, 234, 0.2)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = 'translateY(0)';
//                       e.currentTarget.style.boxShadow = 'none';
//                     }}
//                   >
//                     {/* Selection Indicator */}
//                     {isSelected && (
//                       <div style={{
//                         position: 'absolute',
//                         top: '1rem',
//                         right: '1rem',
//                         background: isDark ? '#4ecdc4' : '#667eea',
//                         borderRadius: '50%',
//                         padding: '0.5rem',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         zIndex: 2
//                       }}>
//                         <Star size={16} fill="white" color="white" />
//                       </div>
//                     )}

//                     {/* Trending Badge */}
//                     {img.trending && (
//                       <div style={{
//                         position: 'absolute',
//                         top: '1rem',
//                         left: '1rem',
//                         background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
//                         padding: '0.4rem 0.9rem',
//                         borderRadius: '50px',
//                         fontSize: '0.75rem',
//                         fontWeight: '700',
//                         color: 'white',
//                         animation: 'pulse 2s ease-in-out infinite',
//                         boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
//                         zIndex: 2
//                       }}>
//                         🔥 TRENDING
//                       </div>
//                     )}

//                     {/* Match Score */}
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '0.5rem',
//                       marginBottom: '1rem'
//                     }}>
//                       <div style={{
//                         flex: 1,
//                         height: '8px',
//                         background: isDark ? '#334155' : '#e5e7eb',
//                         borderRadius: '10px',
//                         overflow: 'hidden'
//                       }}>
//                         <div style={{
//                           width: `${img.matchScore}%`,
//                           height: '100%',
//                           background: img.matchScore >= 90 
//                             ? 'linear-gradient(90deg, #10b981, #059669)'
//                             : img.matchScore >= 85
//                               ? 'linear-gradient(90deg, #3b82f6, #2563eb)'
//                               : 'linear-gradient(90deg, #f59e0b, #d97706)',
//                           transition: 'width 1s ease'
//                         }} />
//                       </div>
//                       <span style={{
//                         fontWeight: '700',
//                         fontSize: '1rem',
//                         color: img.matchScore >= 90 ? '#10b981' : img.matchScore >= 85 ? '#3b82f6' : '#f59e0b'
//                       }}>
//                         {img.matchScore}%
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <h4 style={{
//                       color: isDark ? '#f1f5f9' : '#1f2937',
//                       fontSize: '1.2rem',
//                       fontWeight: '700',
//                       marginBottom: '0.75rem',
//                       lineHeight: '1.4'
//                     }}>
//                       {img.title}
//                     </h4>

//                     <p style={{
//                       color: isDark ? '#94a3b8' : '#6b7280',
//                       fontSize: '0.95rem',
//                       marginBottom: '1.25rem',
//                       lineHeight: '1.6'
//                     }}>
//                       {img.description}
//                     </p>

//                     {/* Metadata */}
//                     <div style={{
//                       display: 'flex',
//                       gap: '0.5rem',
//                       flexWrap: 'wrap',
//                       marginBottom: '1rem'
//                     }}>
//                       <span style={{
//                         padding: '0.4rem 0.9rem',
//                         background: isDark ? '#667eea20' : '#667eea20',
//                         color: '#667eea',
//                         borderRadius: '50px',
//                         fontSize: '0.75rem',
//                         fontWeight: '700'
//                       }}>
//                         {img.style}
//                       </span>
//                       <span style={{
//                         padding: '0.4rem 0.9rem',
//                         background: isDark ? '#4ecdc420' : '#4ecdc420',
//                         color: '#4ecdc4',
//                         borderRadius: '50px',
//                         fontSize: '0.75rem',
//                         fontWeight: '700'
//                       }}>
//                         {img.orientation}
//                       </span>
//                       <span style={{
//                         padding: '0.4rem 0.9rem',
//                         background: isDark ? '#f59e0b20' : '#f59e0b20',
//                         color: '#f59e0b',
//                         borderRadius: '50px',
//                         fontSize: '0.75rem',
//                         fontWeight: '700'
//                       }}>
//                         {img.category}
//                       </span>
//                     </div>

//                     {/* Stats */}
//                     <div style={{
//                       display: 'flex',
//                       gap: '1rem',
//                       marginBottom: '1.25rem',
//                       fontSize: '0.85rem',
//                       color: isDark ? '#94a3b8' : '#6b7280'
//                     }}>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
//                         <Download size={14} />
//                         {img.downloads}
//                       </div>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
//                         <Heart size={14} />
//                         {img.likes}
//                       </div>
//                     </div>

//                     {/* Keywords */}
//                     <div style={{ marginBottom: '1rem' }}>
//                       <div style={{
//                         fontSize: '0.8rem',
//                         fontWeight: '700',
//                         color: isDark ? '#e2e8f0' : '#374151',
//                         marginBottom: '0.5rem',
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.5px'
//                       }}>
//                         🔍 Search Keywords
//                       </div>
//                       <div style={{
//                         display: 'flex',
//                         gap: '0.4rem',
//                         flexWrap: 'wrap'
//                       }}>
//                         {img.keywords.map((keyword, i) => (
//                           <span key={i} style={{
//                             padding: '0.3rem 0.7rem',
//                             background: isDark ? '#334155' : '#f3f4f6',
//                             color: isDark ? '#cbd5e1' : '#4b5563',
//                             borderRadius: '8px',
//                             fontSize: '0.75rem',
//                             fontWeight: '500'
//                           }}>
//                             {keyword}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Image Display */}
//                     {img.imageUrl && (
//                       <div style={{
//                         width: '100%',
//                         height: '200px',
//                         borderRadius: '15px',
//                         marginBottom: '1.5rem',
//                         position: 'relative',
//                         overflow: 'hidden',
//                         background: isDark ? '#1e293b' : '#f3f4f6'
//                       }}>
//                         <img 
//                           src={img.imageUrl} 
//                           alt={img.title}
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             display: 'block'
//                           }}
//                         />
//                       </div>
//                     )}

//                     {/* Color Palette */}
//                     <div style={{ marginBottom: '1.25rem' }}>
//                       <div style={{
//                         fontSize: '0.8rem',
//                         fontWeight: '700',
//                         color: isDark ? '#e2e8f0' : '#374151',
//                         marginBottom: '0.5rem',
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.5px'
//                       }}>
//                         🎨 Color Palette
//                       </div>
//                       <div style={{ display: 'flex', gap: '0.5rem' }}>
//                         {img.colors.map((color, i) => (
//                           <div key={i} style={{
//                             width: '40px',
//                             height: '40px',
//                             background: color,
//                             borderRadius: '10px',
//                             border: '2px solid white',
//                             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                             cursor: 'pointer',
//                             transition: 'transform 0.2s',
//                             position: 'relative'
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = 'scale(1.2)';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = 'scale(1)';
//                           }}
//                           title={color}
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Action Button */}
//                     <button
//                       onClick={(e) => copyKeywords(img.keywords, e)}
//                       style={{
//                         width: '100%',
//                         padding: '0.75rem',
//                         background: 'transparent',
//                         border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//                         borderRadius: '12px',
//                         color: isDark ? '#cbd5e1' : '#6b7280',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s ease',
//                         fontSize: '0.9rem',
//                         fontWeight: '600',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: '0.5rem'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.stopPropagation();
//                         e.target.style.background = isDark ? '#4ecdc4' : '#667eea';
//                         e.target.style.color = 'white';
//                         e.target.style.borderColor = isDark ? '#4ecdc4' : '#667eea';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.stopPropagation();
//                         e.target.style.background = 'transparent';
//                         e.target.style.color = isDark ? '#cbd5e1' : '#6b7280';
//                         e.target.style.borderColor = isDark ? '#334155' : '#e5e7eb';
//                       }}
//                     >
//                       <Copy size={16} />
//                       Copy Keywords
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Stock Photo Sites */}
//             <div style={{
//               marginTop: '3rem',
//               padding: '2.5rem',
//               background: isDark 
//                 ? 'linear-gradient(135deg, #4ecdc415, #44a6d015)'
//                 : 'linear-gradient(135deg, #667eea15, #764ba215)',
//               borderRadius: '20px',
//               border: `2px solid ${isDark ? '#4ecdc430' : '#667eea30'}`
//             }}>
//               <h4 style={{
//                 fontSize: '1.3rem',
//                 fontWeight: '700',
//                 color: isDark ? '#e2e8f0' : '#1f2937',
//                 marginBottom: '1.5rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem'
//               }}>
//                 <Search size={24} color={isDark ? '#4ecdc4' : '#667eea'} />
//                 Find These Images On
//               </h4>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '1rem'
//               }}>
//                 {['Unsplash', 'Pexels', 'Pixabay', 'Freepik', 'Shutterstock', 'Adobe Stock'].map((site, i) => (
//                   <div key={i} style={{
//                     padding: '1rem',
//                     background: isDark ? '#1e293b' : 'white',
//                     borderRadius: '15px',
//                     textAlign: 'center',
//                     fontWeight: '600',
//                     color: isDark ? '#cbd5e1' : '#374151',
//                     border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
//                     transition: 'all 0.3s ease',
//                     cursor: 'pointer'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-5px)';
//                     e.currentTarget.style.borderColor = isDark ? '#4ecdc4' : '#667eea';
//                     e.currentTarget.style.boxShadow = isDark
//                       ? '0 10px 25px rgba(78, 205, 196, 0.2)'
//                       : '0 10px 25px rgba(102, 126, 234, 0.2)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.borderColor = isDark ? '#334155' : '#e5e7eb';
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}>
//                     {site}
//                   </div>
//                 ))}
//               </div>
//               <p style={{
//                 marginTop: '1.5rem',
//                 color: isDark ? '#94a3b8' : '#6b7280',
//                 fontSize: '0.95rem',
//                 textAlign: 'center',
//                 lineHeight: '1.6'
//               }}>
//                 💡 <strong>Pro Tip:</strong> Copy the keywords above and paste them into any stock photo site's search bar to find similar images!
//               </p>
//             </div>

//             {/* Regenerate CTA */}
//             <div style={{
//               marginTop: '2.5rem',
//               padding: '2rem',
//               background: isDark 
//                 ? 'linear-gradient(135deg, #4ecdc420, #44a6d020)'
//                 : 'linear-gradient(135deg, #4ecdc420, #44a6d020)',
//               borderRadius: '20px',
//               border: `2px dashed #4ecdc4`,
//               textAlign: 'center'
//             }}>
//               <p style={{
//                 color: isDark ? '#e2e8f0' : '#374151',
//                 fontWeight: '600',
//                 fontSize: '1.05rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '0.75rem',
//                 flexWrap: 'wrap',
//                 marginBottom: '1rem'
//               }}>
//                 <Sparkles size={22} color="#4ecdc4" />
//                 Need different suggestions? Try adjusting your description or mood!
//               </p>
//               <button
//                 onClick={generateSuggestions}
//                 style={{
//                   padding: '0.85rem 2rem',
//                   background: 'linear-gradient(135deg, #4ecdc4, #44a6d0)',
//                   border: 'none',
//                   borderRadius: '50px',
//                   color: 'white',
//                   fontSize: '0.95rem',
//                   fontWeight: '700',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '0.5rem'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'scale(1.05)';
//                   e.target.style.boxShadow = '0 10px 25px rgba(78, 205, 196, 0.3)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'scale(1)';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               >
//                 <RefreshCw size={18} />
//                 Generate New Suggestions
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }