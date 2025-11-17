import React, { useState, useContext, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Copy, Download, Sparkles, TrendingUp, Maximize2, RefreshCw, MessageSquare, Zap } from 'lucide-react';
import { Context } from '../../main';

export default function ContentExpander() {
  const { mode } = useContext(Context);
  const [currentPage, setCurrentPage] = useState('landing');
  const [userInput, setUserInput] = useState('');
  const [expandStyle, setExpandStyle] = useState('detailed');
  const [chatHistory, setChatHistory] = useState([]);
  const [isExpanding, setIsExpanding] = useState(false);
  const chatEndRef = useRef(null);
  
  const isDark = mode === 'dark';

  const expandStyles = [
    { id: 'detailed', label: 'Detailed', icon: '📝', description: 'Add rich details and examples' },
    { id: 'professional', label: 'Professional', icon: '💼', description: 'Formal business tone' },
    { id: 'casual', label: 'Casual', icon: '😊', description: 'Friendly conversational style' },
    { id: 'persuasive', label: 'Persuasive', icon: '🎯', description: 'Compelling and convincing' },
    { id: 'educational', label: 'Educational', icon: '📚', description: 'Clear and informative' },
    { id: 'creative', label: 'Creative', icon: '🎨', description: 'Imaginative and engaging' }
  ];

  const expansionTemplates = {
    detailed: [
      (idea) => `${idea}\n\nThis concept represents a significant opportunity in today's landscape. When we examine this more closely, we can see multiple layers of complexity and potential. The fundamental principle at work here involves several interconnected factors that create a comprehensive framework for understanding.\n\nFirst, consider the immediate implications. ${idea.split(' ').slice(0, 3).join(' ')} directly impacts how we approach modern challenges. Through careful analysis, we can identify specific patterns that emerge, each offering valuable insights into the broader context.\n\nMoreover, the practical applications extend far beyond initial expectations. Real-world examples demonstrate that when properly implemented, these strategies yield measurable results. Industry leaders have consistently shown that attention to detail in this area correlates strongly with long-term success.\n\nIn conclusion, this approach provides a solid foundation for future development, offering both immediate value and sustained growth potential.`,
      
      (idea) => `Let me expand on this important point: ${idea}\n\nThe significance of this concept cannot be overstated in our current environment. Breaking this down into its core components reveals fascinating insights that merit deeper exploration.\n\nFrom a strategic perspective, this represents more than just a simple observation—it's a comprehensive framework for understanding complex dynamics. The interplay between various elements creates opportunities that savvy professionals can leverage to their advantage.\n\nConsider the evidence: numerous case studies across different sectors demonstrate consistent patterns. When organizations prioritize this approach, they experience tangible improvements in key performance indicators. The data supports a clear correlation between implementation quality and measurable outcomes.\n\nFurthermore, emerging trends suggest this will become increasingly relevant. Forward-thinking leaders are already positioning themselves to capitalize on these developments, recognizing that early adoption provides competitive advantages.\n\nUltimately, success in this area requires both strategic vision and tactical execution, making it essential for anyone serious about achieving sustainable results.`
    ],
    
    professional: [
      (idea) => `${idea}\n\nExecutive Summary:\nThis strategic initiative presents substantial value proposition for stakeholders across the organization. Our analysis indicates significant opportunities for optimization and enhanced performance metrics.\n\nKey Considerations:\nThe implementation framework requires careful coordination across departments, ensuring alignment with corporate objectives. Risk mitigation strategies must be integrated throughout the deployment phase to maintain operational continuity.\n\nStrategic Implications:\nMarket research demonstrates strong demand for solutions addressing these specific pain points. Our competitive positioning strengthens considerably through proactive engagement with these dynamics.\n\nRecommendations:\nWe propose a phased rollout approach, beginning with pilot programs in select divisions. This methodology allows for iterative refinement while minimizing disruption to core business functions.\n\nConclusion:\nThe projected ROI justifies immediate resource allocation to advance this initiative through the planning stages.`,
      
      (idea) => `Re: ${idea}\n\nDear Colleagues,\n\nI am writing to highlight a critical opportunity that warrants our immediate attention and strategic consideration.\n\nBackground:\nRecent developments in our industry have created conditions favorable for implementing innovative approaches. Our preliminary assessment indicates substantial potential for value creation and competitive differentiation.\n\nAnalysis:\nComprehensive evaluation of relevant data points suggests that organizations prioritizing this dimension consistently outperform industry benchmarks. The correlation between strategic focus and measurable outcomes presents compelling evidence for investment consideration.\n\nProposed Action Items:\n1. Conduct thorough stakeholder analysis\n2. Develop comprehensive implementation roadmap\n3. Establish key performance indicators\n4. Secure necessary resource commitments\n\nI look forward to discussing this matter in greater detail during our next strategic planning session.\n\nBest regards`
    ],
    
    casual: [
      (idea) => `So here's the thing about ${idea.toLowerCase()}...\n\nYou know what's really interesting? This whole concept is actually way more important than most people realize. Let me break it down for you in a way that actually makes sense.\n\nFirst off, think about it from a practical standpoint. We've all been in situations where this kind of thing comes up, right? And honestly, once you get the hang of it, everything just clicks into place. It's like one of those "aha!" moments where suddenly everything makes sense.\n\nWhat I love about this approach is how straightforward it is. No need to overcomplicate things—just focus on the basics and you're golden. Plus, when you actually try it out, you'll see pretty quickly what works and what doesn't. It's all about finding that sweet spot.\n\nAnd here's the cool part: this isn't just theory. Real people are using these ideas every day and getting awesome results. I mean, once you see it in action, you'll wonder why you didn't think of it sooner!\n\nSo yeah, definitely something worth exploring if you ask me. Trust me on this one—you won't regret giving it a shot!`,
      
      (idea) => `Let's talk about ${idea.toLowerCase()}—because honestly, this is pretty game-changing stuff.\n\nOkay, so picture this: you've got this challenge you're trying to tackle, right? And suddenly you realize there's actually a smart way to approach it that makes everything easier. That's basically what we're dealing with here.\n\nThe beauty of it is that it's not rocket science. Like, seriously, once someone explains it properly, you'll be kicking yourself for not figuring it out earlier. But that's just how it goes sometimes!\n\nWhat's really cool is seeing how versatile this is. Whether you're just starting out or you've been around the block a few times, there's something here for everyone. And the best part? You can adapt it to fit your own style—no one-size-fits-all nonsense.\n\nPeople are already jumping on board with this, and from what I'm hearing, they're loving the results. It's one of those things where once you try it, you can't imagine going back to the old way of doing things.\n\nBottom line? Definitely worth checking out. You might just find exactly what you've been looking for!`
    ],
    
    persuasive: [
      (idea) => `${idea}\n\nConsider this: what if you could transform your entire approach with one powerful insight? That's exactly what this opportunity represents.\n\nThe evidence is overwhelming. Industry leaders who have embraced this methodology report dramatic improvements—we're talking measurable, game-changing results that separate winners from everyone else. This isn't speculation; it's documented fact backed by extensive research and real-world success stories.\n\nThink about your current challenges. Now imagine having a proven framework that addresses those exact pain points. That's what's on the table right now. The question isn't whether this works—countless examples already prove that. The question is: can you afford to ignore it?\n\nTime is a critical factor here. Early adopters consistently achieve disproportionate advantages. While others hesitate, forward-thinking professionals are already implementing these strategies and reaping substantial rewards. Every day of delay represents missed opportunities and competitive ground lost to those who acted decisively.\n\nThe choice is clear: embrace this approach now and position yourself among the leaders, or watch from the sidelines as others capitalize on what you could have achieved.\n\nThe moment to act is now. Don't let this opportunity pass you by.`,
      
      (idea) => `Here's why ${idea.toLowerCase()} demands your immediate attention:\n\nImagine achieving results that exceed your most optimistic projections. Sounds too good to be true? It's not—and I can prove it.\n\nLet's be honest: in today's competitive landscape, good enough simply isn't good enough. You need every possible advantage to stay ahead. This isn't about incremental improvements; we're talking about fundamental transformation that delivers exponential returns.\n\nThe data doesn't lie. Organizations implementing this strategy consistently outperform their peers across every meaningful metric. Customer satisfaction? Up. Efficiency? Dramatically improved. Bottom line? Significantly enhanced. These aren't empty promises—they're documented outcomes from real implementations.\n\nBut here's what really matters: this window of opportunity won't stay open forever. Market dynamics are shifting rapidly, and those who move first secure lasting advantages. The pioneers are already establishing dominant positions while skeptics debate whether to act.\n\nYou've reached a decision point. One path leads to maintaining the status quo—safe, comfortable, and increasingly obsolete. The other path leads to growth, innovation, and competitive superiority.\n\nWhich future do you choose? The tools are here. The proof is undeniable. All that remains is your decision to act.`
    ],
    
    educational: [
      (idea) => `Understanding ${idea}: A Comprehensive Overview\n\nIntroduction:\nThis fundamental concept plays a crucial role in modern practice. To fully grasp its significance, we must examine both its theoretical foundations and practical applications.\n\nKey Concepts:\nAt its core, this principle involves the systematic coordination of multiple elements to achieve specific objectives. Think of it as a framework that guides decision-making and action planning.\n\nHow It Works:\nThe process begins with careful assessment of current conditions. Next, relevant factors are analyzed to identify opportunities and constraints. Finally, targeted strategies are developed and implemented based on these insights.\n\nPractical Examples:\n1. In business settings, this approach helps organizations streamline operations\n2. Individuals apply these principles to personal development goals\n3. Teams leverage this framework for collaborative projects\n\nCommon Misconceptions:\nMany people mistakenly believe this requires extensive resources or specialized expertise. In reality, the basics are accessible to anyone willing to learn and practice.\n\nBest Practices:\n- Start with clear objectives\n- Break complex goals into manageable steps\n- Monitor progress regularly\n- Adjust strategies based on results\n\nConclusion:\nMastering this concept opens doors to improved outcomes across various domains. With consistent application and ongoing learning, anyone can develop proficiency in this essential skill.`,
      
      (idea) => `Learning About ${idea}: Essential Knowledge\n\nWhat You Need to Know:\nThis topic represents an important area of study for anyone serious about achieving excellence in their field. Let's explore the key components that make this concept so valuable.\n\nFoundational Principles:\nThe underlying theory rests on well-established research and proven methodologies. Scientists and practitioners have developed robust frameworks through decades of study and real-world testing.\n\nStep-by-Step Guide:\n\nStep 1: Understand the Basics\nBegin by familiarizing yourself with core terminology and fundamental concepts. This foundation supports all advanced applications.\n\nStep 2: Study Examples\nExamine successful implementations across different contexts. Notice patterns and techniques that consistently produce positive results.\n\nStep 3: Practice Application\nStart applying these principles in low-risk scenarios. Build confidence through hands-on experience.\n\nStep 4: Analyze Results\nCarefully evaluate outcomes to identify what works well and what needs adjustment.\n\nImportant Considerations:\n• Context matters—adapt approaches to specific situations\n• Consistency yields better results than sporadic efforts\n• Learning is iterative—expect refinement over time\n\nResources for Further Learning:\nNumerous books, courses, and workshops explore this topic in greater depth. Consider seeking mentorship from experienced practitioners.\n\nFinal Thoughts:\nDeveloping competency in this area requires commitment but delivers substantial returns on that investment.`
    ],
    
    creative: [
      (idea) => `${idea}\n\nPicture this: a world transformed by a single powerful insight, rippling outward like stones cast into still water. That's the magic we're exploring here.\n\nImagine standing at the edge of possibility, where conventional wisdom meets revolutionary thinking. This isn't just another concept—it's a doorway to unexpected horizons. Like a master painter approaching a blank canvas, we have the opportunity to create something extraordinary.\n\nThe story unfolds like this: once upon a time, people accepted limitations as fixed boundaries. Then someone dared to ask "what if?" That simple question sparked a cascade of innovation, lighting fires in minds across the globe. Suddenly, impossible became improbable, and improbable became inevitable.\n\nThink of it as alchemy for the modern age—transforming base ideas into golden opportunities. Every element combines in unexpected ways, creating compounds more valuable than their individual parts. The chemistry of success isn't found in formulas, but in the artistry of application.\n\nAs we dance through these possibilities, patterns emerge like constellations in a night sky. Each star represents a unique perspective, yet together they tell a coherent story. The narrative weaves through challenges and triumphs, always moving toward brighter horizons.\n\nThis journey we're on? It's just beginning. And the destination promises wonders beyond our current imagination.`,
      
      (idea) => `Let me paint you a picture of ${idea.toLowerCase()}...\n\nClose your eyes and envision a garden where ideas bloom like rare orchids. Each petal represents a facet of understanding, unfolding in perfect timing. That's the landscape we're exploring together.\n\nThink of this concept as a symphony—multiple instruments playing in harmony, each contributing its unique voice to create something transcendent. The melody carries us forward while rhythm provides structure, and harmony adds depth that resonates in unexpected ways.\n\nConsider the metaphor of a river cutting through ancient stone. Patient. Persistent. Powerful. Over time, what seemed impossible yields to consistent effort. The water doesn't fight the rock—it flows, adapts, and ultimately transforms the landscape entirely.\n\nThis approach mirrors nature's wisdom: growth happens in seasons, not all at once. Spring brings fresh shoots of possibility. Summer nurtures with warmth and energy. Autumn harvests the fruits of patient cultivation. Winter allows for rest and reflection before the cycle begins anew.\n\nLike a master chef combining unexpected ingredients, we're creating something greater than the sum of its parts. A pinch of innovation here, a dash of tradition there, all blended with the secret sauce of genuine insight.\n\nThe canvas awaits your brushstrokes. The stage is set for your performance. The story yearns for your unique chapter. What will you create with these raw materials of possibility?`
    ]
  };

  const expandContent = (input, style) => {
    const templates = expansionTemplates[style];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    return randomTemplate(input);
  };

  const handleExpand = () => {
    if (!userInput.trim()) {
      alert('Please enter some content to expand!');
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      style: expandStyle
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsExpanding(true);
    const inputToExpand = userInput;
    setUserInput('');

    setTimeout(() => {
      const expanded = expandContent(inputToExpand, expandStyle);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: expanded,
        wordCount: expanded.split(/\s+/).length,
        originalLength: inputToExpand.split(/\s+/).length
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsExpanding(false);
    }, 2500);
  };

  const copyContent = (content) => {
    navigator.clipboard.writeText(content);
    alert('Content copied to clipboard!');
  };

  const downloadContent = () => {
    const aiMessages = chatHistory.filter(msg => msg.type === 'ai');
    let content = 'AI-EXPANDED CONTENT\n' +
                 '===================\n\n';
    
    aiMessages.forEach((msg, idx) => {
      content += `Expansion ${idx + 1}:\n`;
      content += `Word Count: ${msg.wordCount} words\n`;
      content += `Expansion Ratio: ${Math.round(msg.wordCount / msg.originalLength)}x\n\n`;
      content += msg.content;
      content += '\n\n' + '─'.repeat(50) + '\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expanded-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isExpanding]);

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
            animation: 'float 3s ease-in-out infinite'
          }}>
            📈
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            Content Expander
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '3rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6'
          }}>
            Expand short ideas into full paragraphs
          </p>
          
          <button
            onClick={() => setCurrentPage('expander')}
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
            Expand Content
          </button>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}} />
      
      {/* Header */}
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
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
            onClick={downloadContent}
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

      {/* Main Container */}
      <div style={{
        flex: 1,
        maxWidth: '1000px',
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
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
          background: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <Maximize2 size={28} color={isDark ? '#5eead4' : '#667eea'} />
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: isDark ? '#f1f5f9' : '#1f2937',
                margin: 0
              }}>
                AI Content Expander
              </h2>
              <p style={{
                fontSize: '0.875rem',
                color: isDark ? '#94a3b8' : '#6b7280',
                margin: '0.25rem 0 0 0'
              }}>
                Transform brief ideas into comprehensive content
              </p>
            </div>
          </div>

          {/* Style Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.5rem'
          }}>
            {expandStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setExpandStyle(style.id)}
                style={{
                  padding: '0.75rem',
                  border: expandStyle === style.id 
                    ? `2px solid ${isDark ? '#5eead4' : '#667eea'}`
                    : `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  background: expandStyle === style.id 
                    ? isDark ? 'rgba(94, 234, 212, 0.1)' : 'rgba(102, 126, 234, 0.1)'
                    : isDark ? '#1e293b' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (expandStyle !== style.id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.borderColor = isDark ? '#5eead4' : '#667eea';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandStyle !== style.id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = isDark ? '#334155' : '#e5e7eb';
                  }
                }}
              >
                <div style={{
                  fontSize: '1.25rem',
                  marginBottom: '0.25rem'
                }}>{style.icon}</div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: expandStyle === style.id 
                    ? isDark ? '#5eead4' : '#667eea'
                    : isDark ? '#e2e8f0' : '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {style.label}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: isDark ? '#94a3b8' : '#6b7280'
                }}>
                  {style.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
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
                Enter a short idea below and watch it expand!
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
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.75rem',
                      color: isDark ? '#94a3b8' : '#6b7280'
                    }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: isDark ? 'rgba(94, 234, 212, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                        borderRadius: '50px',
                        fontWeight: '600'
                      }}>
                        {expandStyles.find(s => s.id === message.style)?.label} Style
                      </span>
                    </div>
                    <div style={{
                      background: isDark ? '#5eead4' : '#667eea',
                      color: isDark ? '#0f172a' : 'white',
                      padding: '1rem 1.5rem',
                      borderRadius: '20px 20px 5px 20px',
                      maxWidth: '80%',
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
                      AI Expanded Content
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                        color: isDark ? '#94a3b8' : '#6b7280',
                        fontWeight: '500'
                      }}>
                        {message.wordCount} words ({Math.round(message.wordCount / message.originalLength)}x expansion)
                      </span>
                    </div>
                    <div style={{
                      background: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f9fafb',
                      border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                      borderRadius: '15px',
                      padding: '1.5rem',
                      position: 'relative'
                    }}>
                      <div style={{
                        color: isDark ? '#e2e8f0' : '#374151',
                        fontSize: '1rem',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {message.content}
                      </div>
                      <button
                        onClick={() => copyContent(message.content)}
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          padding: '0.5rem',
                          background: isDark ? 'rgba(94, 234, 212, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                          border: `1px solid ${isDark ? '#5eead4' : '#667eea'}`,
                          borderRadius: '8px',
                          color: isDark ? '#5eead4' : '#667eea',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = isDark ? '#5eead4' : '#667eea';
                          e.target.style.color = isDark ? '#0f172a' : 'white';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = isDark ? 'rgba(94, 234, 212, 0.1)' : 'rgba(102, 126, 234, 0.1)';
                          e.target.style.color = isDark ? '#5eead4' : '#667eea';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          
          {isExpanding && (
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
                  Expanding your content with AI magic...
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
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleExpand();
                }
              }}
              placeholder="Enter a short idea or sentence to expand... (e.g., 'AI is changing how we work')"
              rows={3}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '1rem 1.5rem',
                border: `2px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                borderRadius: '15px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: isDark ? '#1e293b' : 'white',
                color: isDark ? '#f1f5f9' : '#1f2937',
                resize: 'none',
                fontFamily: 'inherit'
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
              onClick={handleExpand}
              disabled={isExpanding || !userInput.trim()}
              style={{
                padding: '1rem 2.5rem',
                background: isExpanding || !userInput.trim() 
                  ? isDark ? '#475569' : '#9ca3af'
                  : isDark 
                    ? 'linear-gradient(135deg, #5eead4, #4ecdc4)'
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isExpanding || !userInput.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                if (!isExpanding && userInput.trim()) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <Zap size={20} />
              Expand
            </button>
          </div>
          <p style={{
            fontSize: '0.75rem',
            color: isDark ? '#64748b' : '#9ca3af',
            marginTop: '0.75rem',
            marginBottom: 0
          }}>
            💡 Tip: Press Shift+Enter for new line, Enter to expand
          </p>
        </div>
      </div>
    </div>
  );
}