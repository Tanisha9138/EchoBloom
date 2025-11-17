import React, { useState, useContext } from 'react';
import { Lightbulb, ArrowLeft, Sparkles, Copy, RefreshCw, Download, Zap, TrendingUp, Target, BookOpen, Video, Mic, Moon, Sun, Star, Users, Clock } from 'lucide-react';
import { Context } from '../../main';

export default function ContentIdeasGenerator() {
  const { mode } = useContext(Context);
  const [currentPage, setCurrentPage] = useState('landing');
  const [niche, setNiche] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [ideas, setIdeas] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdeas, setSelectedIdeas] = useState([]);

  const isDark = mode === 'dark';

  const contentTypes = [
    { id: 'blog', label: 'Blog Posts', icon: BookOpen, color: '#667eea' },
    { id: 'video', label: 'Video Scripts', icon: Video, color: '#f093fb' },
    { id: 'social', label: 'Social Media', icon: TrendingUp, color: '#4ecdc4' },
    { id: 'podcast', label: 'Podcast Episodes', icon: Mic, color: '#ff6b6b' }
  ];

  const ideaTemplates = {
    blog: [
      '${niche} Hacks That Will Save You Hours Every Week',
      'The Psychology Behind ${niche}: What Experts Won\'t Tell You',
      '${niche} Trends Dominating 2025 (And How to Leverage Them)',
      'From Zero to Hero: My ${niche} Journey in 90 Days',
      'The Dark Side of ${niche} Nobody Talks About',
      'AI is Revolutionizing ${niche} - Here\'s How',
      '${niche} Myths Debunked by Science',
      'Build Your ${niche} Empire: A Step-by-Step Blueprint',
      'The Future of ${niche}: 5 Bold Predictions for 2025',
      '${niche} Case Study: How [Company] Made $1M',
      'Beginner\'s Roadmap to Mastering ${niche}',
      '${niche} Tools That Professionals Swear By',
      'Common ${niche} Mistakes Costing You Money',
      'The Ultimate ${niche} Resource Guide for 2025',
      '${niche} on a Budget: Complete Strategy Guide',
      'Behind the Scenes: ${niche} Industry Secrets Revealed',
      '${niche} Productivity System That Changed My Life',
      'The ${niche} Playbook: Strategies from Top Performers',
      'Controversial Take: Why ${niche} Needs to Change',
      '${niche} Automation: The Complete Guide'
    ],
    video: [
      '${niche} Transformation: 30-Day Challenge Vlog',
      'React to ${niche} Fails (What Not to Do)',
      '${niche} Speed Run: Can I Master This in 24 Hours?',
      'Day in the Life of a ${niche} Professional',
      '${niche} vs Reality: Setting Expectations',
      'Testing Viral ${niche} Hacks from TikTok',
      'Behind the Scenes: How ${niche} Really Works',
      '${niche} Q&A: Your Questions Answered',
      'I Spent $1000 on ${niche} - Was It Worth It?',
      'Ranking ${niche} Techniques from Worst to Best',
      '${niche} Evolution: Then vs Now',
      'Trying ${niche} for the First Time',
      '${niche} Tier List: Ultimate Ranking',
      'The Truth About ${niche} (Exposed)',
      '${niche} Challenge: Impossible Edition'
    ],
    social: [
      '${niche} tip that changed my life 🔥',
      'POV: You just discovered ${niche} [Thread]',
      '${niche} in 60 seconds ⚡',
      'Hot take on ${niche} 👇',
      'The ${niche} mistake everyone makes',
      '${niche} glow-up challenge 💪',
      'Things I wish I knew about ${niche}',
      '${niche} starter pack meme',
      'Rating ${niche} trends: ⭐️⭐️⭐️⭐️⭐️',
      'This ${niche} hack is illegal 🚨',
      '${niche} red flags to avoid 🚩',
      'Green flags in ${niche} ✅',
      '${niche} that hits different 😤',
      'Normalize ${niche} discourse',
      '${niche} hot takes nobody asked for'
    ],
    podcast: [
      'The ${niche} Revolution: Conversations with Industry Leaders',
      'Unpopular Opinions About ${niche} (Hot Takes)',
      '${niche} Success Stories: From Failure to Fortune',
      'Breaking Down ${niche}: Expert Panel Discussion',
      'The Psychology of ${niche} with Dr. [Expert]',
      '${niche} Controversies: The Debate Episode',
      'Rising Stars in ${niche}: Interviews',
      '${niche} Rapid Fire: Quick Tips Episode',
      'Listener Questions: ${niche} AMA',
      'The ${niche} Industry Exposed: Tell-All Interview',
      'Mindset Shift: How ${niche} Changed My Perspective',
      '${niche} Trends: What\'s Next?',
      'Mistakes in ${niche}: Lessons Learned',
      '${niche} Deep Dive: Ultimate Analysis',
      'Wealth Through ${niche}: Financial Freedom Stories'
    ]
  };

  const generateIdeas = () => {
    if (!niche.trim()) {
      alert('Please enter your niche first!');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const templates = ideaTemplates[contentType];
      const shuffled = [...templates].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 12);
      const generatedIdeas = selected.map((template, i) => ({
        id: Date.now() + i,
        title: template.replace(/\$\{niche\}/g, niche),
        engagement: Math.floor(Math.random() * 35) + 65,
        difficulty: ['Easy', 'Medium', 'Advanced'][Math.floor(Math.random() * 3)],
        trending: Math.random() > 0.6,
        estimatedTime: ['5-10 min', '10-15 min', '15-20 min', '20-30 min'][Math.floor(Math.random() * 4)],
        category: contentType
      }));
      
      setIdeas(generatedIdeas);
      setSelectedIdeas([]);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleSelectIdea = (ideaId) => {
    setSelectedIdeas(prev => 
      prev.includes(ideaId) 
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    );
  };

  const copyIdea = (idea, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(idea.title);
    const button = event.currentTarget;
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span style="display: flex; align-items: center; gap: 0.25rem;">✓ Copied!</span>';
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  };

  const downloadIdeas = () => {
    const ideasToDownload = selectedIdeas.length > 0 
      ? ideas.filter(idea => selectedIdeas.includes(idea.id))
      : ideas;

    const content = `${contentType.toUpperCase()} CONTENT IDEAS FOR ${niche.toUpperCase()}\n` +
                   `Generated on ${new Date().toLocaleDateString()}\n` +
                   `Total Ideas: ${ideasToDownload.length}\n\n` +
                   ideasToDownload.map((idea, i) => 
                     `${i + 1}. ${idea.title}\n` +
                     `   📊 Engagement: ${idea.engagement}% | ⏱️ Time: ${idea.estimatedTime}\n` +
                     `   🎯 Difficulty: ${idea.difficulty}${idea.trending ? ' | 🔥 TRENDING' : ''}\n\n`
                   ).join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${niche}-${contentType}-ideas-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (currentPage === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Floating Content Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '3rem',
          opacity: 0.15,
          animation: 'floatBlog 8s ease-in-out infinite'
        }}>📝</div>
        <div style={{
          position: 'absolute',
          top: '70%',
          right: '10%',
          fontSize: '3.5rem',
          opacity: 0.15,
          animation: 'floatBlog 10s ease-in-out infinite',
          animationDelay: '1s'
        }}>✍️</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          fontSize: '3rem',
          opacity: 0.15,
          animation: 'floatBlog 9s ease-in-out infinite',
          animationDelay: '2s'
        }}>📚</div>
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          fontSize: '3rem',
          opacity: 0.15,
          animation: 'floatBlog 11s ease-in-out infinite',
          animationDelay: '0.5s'
        }}>💻</div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          fontSize: '2.5rem',
          opacity: 0.12,
          animation: 'floatBlog 7s ease-in-out infinite',
          animationDelay: '1.5s'
        }}>📱</div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '5%',
          fontSize: '3rem',
          opacity: 0.15,
          animation: 'floatBlog 12s ease-in-out infinite',
          animationDelay: '3s'
        }}>🎯</div>
        
        {/* Animated Gradient Blobs */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 300 + 200}px`,
            background: isDark 
              ? `radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)` 
              : `radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `morphBlob ${8 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`
          }} />
        ))}
        
        <div style={{
          textAlign: 'center',
          maxWidth: '700px',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Hero Icon */}
          <div style={{
            fontSize: '6rem',
            marginBottom: '2rem',
            animation: 'bounce 2s ease-in-out infinite',
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <span style={{ animation: 'float 3s ease-in-out infinite' }}>💡</span>
            <span style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>✨</span>
            <span style={{ animation: 'float 3s ease-in-out infinite 1s' }}>🚀</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            textShadow: '0 4px 6px rgba(0,0,0,0.3)',
            background: isDark
              ? 'linear-gradient(to right, #4ecdc4, #44a6d0)'
              : 'linear-gradient(to right, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2'
          }}>
            AI Content Ideas Generator
          </h1>
          
          <p style={{
            fontSize: '1.4rem',
            marginBottom: '3rem',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: '1.7',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Generate unlimited viral content ideas powered by AI.
            <br />Perfect for blogs, videos, social media & podcasts.
          </p>
          
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            {[
              { icon: '🎯', stat: '10K+', label: 'Ideas Generated' },
              { icon: '👥', stat: '50K+', label: 'Happy Users' },
              { icon: '⚡', stat: '100%', label: 'Free Forever' }
            ].map((item, i) => (
              <div key={i} style={{
                background: isDark 
                  ? 'rgba(78, 205, 196, 0.1)'
                  : 'rgba(255,255,255,0.15)',
                padding: '1.5rem',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.2)'}`,
                animation: `fadeInUp ${0.5 + i * 0.2}s ease-out, writeIn ${0.8 + i * 0.2}s ease-out`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.05) rotate(-2deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = isDark ? '#4ecdc4' : 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255,255,255,0.2)';
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.stat}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentPage('generator')}
              style={{
                padding: '1.3rem 3rem',
                background: 'white',
                border: 'none',
                borderRadius: '50px',
                color: isDark ? '#1a1a2e' : '#667eea',
                fontSize: '1.2rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-5px)';
                e.target.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                <Sparkles size={24} />
                Generate Ideas Now
              </span>
            </button>
          </div>

          {/* Feature Pills */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            {['AI-Powered', 'Instant Results', 'No Login Required'].map((feature, i) => (
              <div key={i} style={{
                padding: '0.5rem 1.5rem',
                background: isDark 
                  ? 'rgba(78, 205, 196, 0.15)'
                  : 'rgba(255,255,255,0.2)',
                borderRadius: '50px',
                fontSize: '0.9rem',
                border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255,255,255,0.3)'}`,
                backdropFilter: 'blur(10px)'
              }}>
                ✨ {feature}
              </div>
            ))}
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatBlog {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg) scale(1); 
            }
            25% { 
              transform: translate(20px, -20px) rotate(5deg) scale(1.1); 
            }
            50% { 
              transform: translate(-10px, 20px) rotate(-5deg) scale(0.9); 
            }
            75% { 
              transform: translate(-20px, -10px) rotate(3deg) scale(1.05); 
            }
          }
          @keyframes morphBlob {
            0%, 100% { 
              transform: translate(0, 0) scale(1) rotate(0deg);
              borderRadius: 50%;
            }
            33% { 
              transform: translate(30px, -30px) scale(1.2) rotate(120deg);
              borderRadius: 40% 60% 60% 40%;
            }
            66% { 
              transform: translate(-30px, 30px) scale(0.8) rotate(240deg);
              borderRadius: 60% 40% 40% 60%;
            }
          }
          @keyframes typeWriter {
            0%, 100% { 
              transform: translateY(0) rotate(0deg); 
            }
            10% { 
              transform: translateY(-5px) rotate(-3deg); 
            }
            20% { 
              transform: translateY(0) rotate(3deg); 
            }
            30% { 
              transform: translateY(-5px) rotate(0deg); 
            }
            40% { 
              transform: translateY(0) rotate(-2deg); 
            }
            50% { 
              transform: translateY(-8px) rotate(2deg) scale(1.1); 
            }
          }
          @keyframes sparkle {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              filter: brightness(1);
            }
            25% { 
              transform: scale(1.3) rotate(90deg);
              filter: brightness(1.5);
            }
            50% { 
              transform: scale(0.8) rotate(180deg);
              filter: brightness(1);
            }
            75% { 
              transform: scale(1.2) rotate(270deg);
              filter: brightness(1.3);
            }
          }
          @keyframes rocket {
            0%, 100% { 
              transform: translateY(0) rotate(-10deg); 
            }
            50% { 
              transform: translateY(-40px) rotate(10deg) scale(1.2); 
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes writeIn {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
      position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}} />
      
      {/* Floating Back Button */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setCurrentPage('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.75rem',
            background: isDark 
              ? 'rgba(78, 205, 196, 0.15)'
              : 'rgba(255,255,255,0.2)',
            border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255,255,255,0.3)'}`,
            borderRadius: '50px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = isDark 
              ? 'rgba(78, 205, 196, 0.25)'
              : 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateX(-5px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = isDark 
              ? 'rgba(78, 205, 196, 0.15)'
              : 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateX(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      {/* Main Content Card */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          background: isDark 
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.98)',
          borderRadius: '30px',
          padding: '3rem',
          boxShadow: isDark
            ? '0 30px 80px rgba(0,0,0,0.5)'
            : '0 30px 80px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255,255,255,0.5)'}`
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              fontSize: '4.5rem', 
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span style={{ animation: 'float 2s ease-in-out infinite' }}>🚀</span>
              <span style={{ animation: 'float 2s ease-in-out infinite 0.5s' }}>✨</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '900',
              background: isDark
                ? 'linear-gradient(135deg, #4ecdc4 0%, #44a6d0 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem'
            }}>
              AI Content Ideas Generator
            </h2>
            <p style={{ 
              color: isDark ? '#94a3b8' : '#6b7280', 
              fontSize: '1.15rem',
              fontWeight: '500'
            }}>
              Powered by advanced AI • Generate unique ideas instantly
            </p>
          </div>

          {/* Content Type Selector */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.95rem',
              fontWeight: '700',
              color: isDark ? '#e2e8f0' : '#374151',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🎯 Select Content Type
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {contentTypes.map((type) => {
                const Icon = type.icon;
                const isActive = contentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    style={{
                      padding: '1.25rem',
                      border: isActive 
                        ? `2px solid ${type.color}` 
                        : `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                      borderRadius: '18px',
                      background: isActive 
                        ? isDark 
                          ? `${type.color}20`
                          : `${type.color}15`
                        : isDark ? '#1e293b' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: isActive 
                        ? `0 10px 30px ${type.color}30`
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${type.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = isActive 
                        ? `0 10px 30px ${type.color}30`
                        : 'none';
                    }}
                  >
                    <Icon size={28} color={isActive ? type.color : isDark ? '#64748b' : '#9ca3af'} />
                    <span style={{
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      color: isActive ? type.color : isDark ? '#cbd5e1' : '#374151'
                    }}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Niche Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.95rem',
              fontWeight: '700',
              color: isDark ? '#e2e8f0' : '#374151',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              💼 Your Niche or Topic
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., AI Marketing, Fitness Coaching, Crypto Trading..."
              style={{
                width: '100%',
                padding: '1.3rem 1.5rem',
                border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                borderRadius: '18px',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                background: isDark ? '#1e293b' : 'white',
                color: isDark ? '#e2e8f0' : '#1f2937',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                const activeColor = contentTypes.find(t => t.id === contentType)?.color || '#667eea';
                e.target.style.borderColor = activeColor;
                e.target.style.boxShadow = `0 0 0 4px ${activeColor}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark ? '#334155' : '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateIdeas}
            disabled={isGenerating}
            style={{
              width: '100%',
              padding: '1.4rem',
              background: isGenerating 
                ? isDark ? '#475569' : '#9ca3af'
                : isDark 
                  ? 'linear-gradient(135deg, #4ecdc4 0%, #44a6d0 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '18px',
              color: 'white',
              fontSize: '1.15rem',
              fontWeight: '700',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              boxShadow: isGenerating 
                ? 'none'
                : isDark
                  ? '0 10px 30px rgba(78, 205, 196, 0.4)'
                  : '0 10px 30px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = isDark
                  ? '0 15px 40px rgba(78, 205, 196, 0.5)'
                  : '0 15px 40px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = isGenerating 
                ? 'none'
                : isDark
                  ? '0 10px 30px rgba(78, 205, 196, 0.4)'
                  : '0 10px 30px rgba(102, 126, 234, 0.4)';
            }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite' }} />
                Generating Amazing Ideas...
              </>
            ) : (
              <>
                <Zap size={24} />
                Generate {contentTypes.find(t => t.id === contentType)?.label} Ideas
              </>
            )}
          </button>

          {/* Ideas List */}
          {ideas.length > 0 && (
            <div style={{ marginTop: '3.5rem' }}>
              {/* Header with Actions */}
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
                  color: isDark ? '#e2e8f0' : '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Target size={28} color={contentTypes.find(t => t.id === contentType)?.color} />
                  Your Content Ideas ({ideas.length})
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {selectedIdeas.length > 0 && (
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: isDark ? '#4ecdc420' : '#667eea20',
                      color: isDark ? '#4ecdc4' : '#667eea',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Star size={16} />
                      {selectedIdeas.length} selected
                    </span>
                  )}
                  <button
                    onClick={downloadIdeas}
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
                    {selectedIdeas.length > 0 ? `Download ${selectedIdeas.length}` : 'Download All'}
                  </button>
                </div>
              </div>

              {/* Ideas Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.25rem'
              }}>
                {ideas.map((idea, index) => {
                  const isSelected = selectedIdeas.includes(idea.id);
                  const typeColor = contentTypes.find(t => t.id === contentType)?.color;
                  
                  return (
                    <div
                      key={idea.id}
                      onClick={() => toggleSelectIdea(idea.id)}
                      style={{
                        background: isDark 
                          ? isSelected 
                            ? `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}10 100%)`
                            : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                          : isSelected
                            ? `linear-gradient(135deg, ${typeColor}10 0%, #ffffff 100%)`
                            : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        borderRadius: '20px',
                        border: isSelected 
                          ? `3px solid ${typeColor}`
                          : `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                        padding: '1.75rem',
                        transition: 'all 0.3s ease',
                        animation: `slideIn ${0.3 + index * 0.05}s ease-out`,
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = isDark
                          ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${typeColor}50`
                          : `0 20px 40px ${typeColor}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: typeColor,
                          borderRadius: '50%',
                          padding: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Star size={16} fill="white" color="white" />
                        </div>
                      )}

                      {/* Trending Badge */}
                      {idea.trending && (
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
                          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)'
                        }}>
                          🔥 TRENDING
                        </div>
                      )}

                      {/* Content */}
                      <div style={{ marginTop: idea.trending ? '2.5rem' : '0' }}>
                        <h4 style={{
                          color: isDark ? '#f1f5f9' : '#1f2937',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          marginBottom: '1.25rem',
                          lineHeight: '1.5',
                          paddingRight: isSelected ? '2rem' : '0'
                        }}>
                          {idea.title}
                        </h4>

                        {/* Metrics */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            padding: '0.4rem 0.9rem',
                            background: isDark ? `${typeColor}20` : `${typeColor}15`,
                            color: typeColor,
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}>
                            📊 {idea.engagement}%
                          </span>
                          <span style={{
                            padding: '0.4rem 0.9rem',
                            background: idea.difficulty === 'Easy' 
                              ? '#10b98120' 
                              : idea.difficulty === 'Medium' 
                                ? '#f59e0b20' 
                                : '#ef444420',
                            color: idea.difficulty === 'Easy' 
                              ? '#10b981' 
                              : idea.difficulty === 'Medium' 
                                ? '#f59e0b' 
                                : '#ef4444',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700'
                          }}>
                            {idea.difficulty}
                          </span>
                          <span style={{
                            padding: '0.4rem 0.9rem',
                            background: isDark ? '#64748b20' : '#94a3b815',
                            color: isDark ? '#cbd5e1' : '#64748b',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}>
                            <Clock size={12} />
                            {idea.estimatedTime}
                          </span>
                        </div>

                        {/* Copy Button */}
                        <button
                          onClick={(e) => copyIdea(idea, e)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'transparent',
                            border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                            borderRadius: '12px',
                            color: isDark ? '#cbd5e1' : '#6b7280',
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
                            e.target.style.background = typeColor;
                            e.target.style.color = 'white';
                            e.target.style.borderColor = typeColor;
                            e.target.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation();
                            e.target.style.background = 'transparent';
                            e.target.style.color = isDark ? '#cbd5e1' : '#6b7280';
                            e.target.style.borderColor = isDark ? '#334155' : '#e5e7eb';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <Copy size={16} />
                          Copy Idea
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Regenerate CTA */}
              <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: isDark 
                  ? 'linear-gradient(135deg, #4ecdc420, #44a6d020)'
                  : 'linear-gradient(135deg, #667eea15, #764ba215)',
                borderRadius: '20px',
                border: `2px dashed ${contentTypes.find(t => t.id === contentType)?.color}`,
                textAlign: 'center'
              }}>
                <p style={{
                  color: isDark ? '#e2e8f0' : '#374151',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  <Sparkles size={22} color={contentTypes.find(t => t.id === contentType)?.color} />
                  Love these ideas? Generate more or try a different content type!
                </p>
                <button
                  onClick={generateIdeas}
                  style={{
                    marginTop: '1rem',
                    padding: '0.85rem 2rem',
                    background: isDark 
                      ? 'linear-gradient(135deg, #4ecdc4, #44a6d0)'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <RefreshCw size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                  Generate More Ideas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}