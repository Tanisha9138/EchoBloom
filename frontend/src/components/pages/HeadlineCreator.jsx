import React, { useState, useContext, useRef, useEffect } from 'react';
import { Lightbulb, ArrowLeft, Sparkles, Copy, Download, Send, Wand2, RefreshCw, MessageSquare } from 'lucide-react';
import { Context } from '../../main';

export default function HeadlineCreator() {
  const { mode } = useContext(Context);
  const [currentPage, setCurrentPage] = useState('landing');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);
  
  const isDark = mode === 'dark';

  const headlineFormulas = [
    {
      pattern: (topic) => `The Ultimate Guide to ${topic}: Everything You Need to Know`,
      style: 'Ultimate Guide'
    },
    {
      pattern: (topic) => `${topic}: 7 Powerful Strategies That Actually Work`,
      style: 'Numbered List'
    },
    {
      pattern: (topic) => `How to Master ${topic} in Just 30 Days (Step-by-Step)`,
      style: 'Time-Based'
    },
    {
      pattern: (topic) => `${topic} Secrets the Pros Don't Want You to Know`,
      style: 'Curiosity Gap'
    },
    {
      pattern: (topic) => `Why ${topic} is the Future (And How to Get Started)`,
      style: 'Thought Leadership'
    },
    {
      pattern: (topic) => `The Surprising Truth About ${topic} That Will Change Everything`,
      style: 'Revelation'
    },
    {
      pattern: (topic) => `${topic} 101: From Beginner to Expert in Record Time`,
      style: 'Educational'
    },
    {
      pattern: (topic) => `Stop Struggling With ${topic} - Try This Instead`,
      style: 'Problem-Solution'
    },
    {
      pattern: (topic) => `${topic} Myths Debunked: What Science Really Says`,
      style: 'Myth-Busting'
    },
    {
      pattern: (topic) => `The Only ${topic} Checklist You'll Ever Need`,
      style: 'Resource'
    },
    {
      pattern: (topic) => `${topic} Hacks That Will Save You Hours Every Week`,
      style: 'Life Hack'
    },
    {
      pattern: (topic) => `Behind the Scenes: How Professionals Excel at ${topic}`,
      style: 'Insider'
    },
    {
      pattern: (topic) => `${topic} Made Simple: A No-Nonsense Approach`,
      style: 'Simplification'
    },
    {
      pattern: (topic) => `The Dark Side of ${topic} Nobody Talks About`,
      style: 'Controversial'
    },
    {
      pattern: (topic) => `${topic} Transformation: Before and After Results`,
      style: 'Case Study'
    },
    {
      pattern: (topic) => `10 Game-Changing ${topic} Tips from Industry Leaders`,
      style: 'Expert Advice'
    },
    {
      pattern: (topic) => `${topic} vs Traditional Methods: Which Wins?`,
      style: 'Comparison'
    },
    {
      pattern: (topic) => `Why Everyone is Talking About ${topic} Right Now`,
      style: 'Trending'
    },
    {
      pattern: (topic) => `${topic} for Busy People: Get Results in Minutes`,
      style: 'Efficiency'
    },
    {
      pattern: (topic) => `The Complete ${topic} Toolkit for 2025`,
      style: 'Comprehensive'
    }
  ];

  const generateHeadlines = (topic) => {
    const shuffled = [...headlineFormulas].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    return selected.map(formula => ({
      headline: formula.pattern(topic),
      style: formula.style
    }));
  };

  const handleGenerate = () => {
    if (!userInput.trim()) {
      alert('Please enter a topic first!');
      return;
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setUserInput('');

    // Simulate AI generating headlines
    setTimeout(() => {
      const headlines = generateHeadlines(userInput);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: headlines
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyHeadline = (headline) => {
    navigator.clipboard.writeText(headline);
    alert('Headline copied to clipboard!');
  };

  const downloadHeadlines = () => {
    const aiMessages = chatHistory.filter(msg => msg.type === 'ai');
    let content = 'AI-GENERATED HEADLINES\n' +
                 '======================\n\n';
    
    aiMessages.forEach((msg, idx) => {
      content += `Batch ${idx + 1}:\n\n`;
      msg.content.forEach((item, i) => {
        content += `${i + 1}. ${item.headline}\n   Style: ${item.style}\n\n`;
      });
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `headlines-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isGenerating]);

  if (currentPage === 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: isDark 
          ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
          : 'linear-gradient(135deg, #4a5f7f 0%, #556b8a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px',
          color: 'white'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '2rem',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            🎪
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            Headline Creator
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '3rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6'
          }}>
            Create compelling headlines that drive clicks
          </p>
          
          <button
            onClick={() => setCurrentPage('chat')}
            style={{
              padding: '1rem 3rem',
              background: 'transparent',
              border: '2px solid rgba(94, 234, 212, 0.5)',
              borderRadius: '50px',
              color: '#5eead4',
              fontSize: '1.125rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(94, 234, 212, 0.2)';
              e.target.style.borderColor = '#5eead4';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(94, 234, 212, 0.5)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Create Headlines
          </button>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}} />
      
      {/* Header */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setCurrentPage('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {chatHistory.length > 0 && (
          <button
            onClick={downloadHeadlines}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(16, 185, 129, 0.9)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#059669';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.9)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Download size={18} />
            Download All
          </button>
        )}
      </div>

      {/* Chat Container */}
      <div style={{
        flex: 1,
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
          background: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Wand2 size={28} color={isDark ? '#5eead4' : '#667eea'} />
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: isDark ? '#f1f5f9' : '#1f2937',
                margin: 0
              }}>
                AI Headline Generator
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: isDark ? '#94a3b8' : '#6b7280',
                margin: '0.25rem 0 0 0'
              }}>
                Enter your topic and get 5 unique headline suggestions
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {chatHistory.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '1rem',
              color: isDark ? '#64748b' : '#9ca3af'
            }}>
              <MessageSquare size={64} opacity={0.3} />
              <p style={{
                fontSize: '1.125rem',
                textAlign: 'center',
                margin: 0
              }}>
                Start by entering your topic below
              </p>
            </div>
          ) : (
            chatHistory.map((message) => (
              <div key={message.id} style={{
                animation: 'fadeIn 0.5s ease-out'
              }}>
                {message.type === 'user' ? (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                    <div style={{
                      background: isDark ? '#5eead4' : '#667eea',
                      color: isDark ? '#0f172a' : 'white',
                      padding: '1rem 1.5rem',
                      borderRadius: '20px 20px 5px 20px',
                      maxWidth: '70%',
                      fontWeight: '500'
                    }}>
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: isDark ? '#5eead4' : '#667eea',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      <Sparkles size={16} />
                      AI Generated Headlines
                    </div>
                    {message.content.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f9fafb',
                          border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                          borderRadius: '15px',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(5px)';
                          e.currentTarget.style.borderColor = isDark ? '#5eead4' : '#667eea';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.borderColor = isDark ? '#334155' : '#e5e7eb';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          gap: '1rem'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              color: isDark ? '#f1f5f9' : '#1f2937',
                              fontSize: '1rem',
                              fontWeight: '600',
                              marginBottom: '0.5rem',
                              lineHeight: '1.5'
                            }}>
                              {item.headline}
                            </div>
                            <span style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              background: isDark ? '#5eead420' : '#667eea20',
                              color: isDark ? '#5eead4' : '#667eea',
                              borderRadius: '50px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {item.style}
                            </span>
                          </div>
                          <button
                            onClick={() => copyHeadline(item.headline)}
                            style={{
                              padding: '0.5rem',
                              background: 'transparent',
                              border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: isDark ? '#5eead4' : '#667eea',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = isDark ? '#5eead4' : '#667eea';
                              e.target.style.color = isDark ? '#0f172a' : 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.color = isDark ? '#5eead4' : '#667eea';
                            }}
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
          
          {isGenerating && (
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <div style={{
                background: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f9fafb',
                border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                borderRadius: '15px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <RefreshCw size={20} color={isDark ? '#5eead4' : '#667eea'} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>
                  Generating amazing headlines...
                </span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '1.5rem',
          borderTop: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
          background: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(255,255,255,0.5)'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Enter your topic (e.g., Digital Marketing, AI, Fitness)..."
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                borderRadius: '50px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: isDark ? '#1e293b' : 'white',
                color: isDark ? '#f1f5f9' : '#1f2937'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = isDark ? '#5eead4' : '#667eea';
                e.target.style.boxShadow = `0 0 0 3px ${isDark ? '#5eead420' : '#667eea20'}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark ? '#334155' : '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !userInput.trim()}
              style={{
                padding: '1rem 2rem',
                background: isGenerating || !userInput.trim() 
                  ? isDark ? '#475569' : '#9ca3af'
                  : isDark 
                    ? 'linear-gradient(135deg, #5eead4, #4ecdc4)'
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isGenerating || !userInput.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isGenerating && userInput.trim()) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <Send size={20} />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}