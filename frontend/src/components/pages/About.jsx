import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: "✍️",
      title: "AI-Powered Editor",
      description: "Smart writing assistant that helps you craft perfect stories with grammar checks, tone suggestions, and SEO optimization."
    },
    {
      icon: "🎨",
      title: "Beautiful Templates",
      description: "Choose from 50+ professionally designed templates to make your content stand out and engage your audience."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Track your performance with detailed insights on views, engagement, and audience demographics."
    },
    {
      icon: "🌐",
      title: "Global Reach",
      description: "Multi-language support and built-in SEO tools help your content reach readers worldwide."
    },
    {
      icon: "💬",
      title: "Interactive Comments",
      description: "Engage with your audience through threaded comments, reactions, and real-time discussions."
    },
    {
      icon: "🔒",
      title: "Privacy Control",
      description: "Complete control over your content visibility with premium membership options and private blogs."
    }
  ];

  const values = [
    {
      icon: "🌱",
      title: "Innovation",
      description: "Cutting-edge technology meets creative storytelling to deliver exceptional user experiences."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building bridges between diverse perspectives and fostering meaningful connections worldwide."
    },
    {
      icon: "✨",
      title: "Quality",
      description: "Premium tools and features that help creators produce their best work every time."
    },
    {
      icon: "🎯",
      title: "Growth",
      description: "Empowering creators to grow their audience and monetize their passion through our platform."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      content: "EchoBloom transformed my blogging experience! The AI editor is incredible and my engagement has increased by 300%.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Tech Writer",
      content: "The analytics dashboard gives me insights I never had before. I can see exactly what resonates with my audience.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emma Rodriguez",
      role: "Lifestyle Influencer",
      content: "Beautiful templates and seamless publishing. EchoBloom made it so easy to create professional-looking content.",
      rating: 5,
      avatar: "👩‍🎨"
    },
    {
      name: "David Kim",
      role: "Business Coach",
      content: "The community features are amazing. I've connected with fellow creators and grown my network significantly.",
      rating: 5,
      avatar: "👨‍🎓"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Creators", icon: "👥" },
    { number: "2M+", label: "Stories Published", icon: "📝" },
    { number: "120+", label: "Countries", icon: "🌍" },
    { number: "99.9%", label: "Uptime", icon: "⚡" }
  ];

  return (
    <article className={`${mode === "dark" ? "dark-bg" : "light-bg"} about-page`}>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y,
          background: mode === 'dark' ? 'rgba(78, 205, 196, 0.3)' : 'rgba(102, 126, 234, 0.3)'
        }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="animated-bg">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`bg-shape shape-${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="container">
          <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Welcome to
              <span className="gradient-text"> EchoBloom</span>
              <br />Where Stories Come Alive
            </h1>
            <p className="hero-subtitle">
              The next-generation blogging platform designed for modern creators. 
              Powerful tools, stunning design, and a thriving community—all in one place.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <span>🚀</span>
                Start Creating
              </button>
              <button className="btn-demo">
                <span>▶️</span>
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features for Modern Creators</h2>
            <p className="section-subtitle">Everything you need to create, publish, and grow your audience</p>
            <div className="section-line"></div>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button className="feature-btn">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <div className="section-header">
                <h2>Our Mission</h2>
                <div className="section-line"></div>
              </div>
              <h3>Empowering Every Voice to Make an Impact</h3>
              <p>
                EchoBloom is built on the belief that everyone has a story worth telling. 
                We've created a platform that combines cutting-edge technology with intuitive design, 
                making it easier than ever for creators to share their ideas, connect with their audience, 
                and build thriving communities around their content.
              </p>
              <p>
                Whether you're a seasoned blogger, an aspiring writer, or a business looking to share your expertise, 
                EchoBloom provides the tools and features you need to succeed in the digital landscape.
              </p>
            </div>
            <div className="values-grid">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className={`value-card ${activeSection === index ? 'active' : ''}`}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Community Says</h2>
            <p className="section-subtitle">Join thousands of creators who've found their home at EchoBloom</p>
            <div className="section-line"></div>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-main">
              <div className="testimonial-card active">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonials[currentTestimonial].name}</h4>
                    <p>{testimonials[currentTestimonial].role}</p>
                    <div className="rating">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote>"{testimonials[currentTestimonial].content}"</blockquote>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="container">
          <div className="demo-content">
            <div className="demo-text">
              <h2>See EchoBloom in Action</h2>
              <p>
                Discover how easy it is to create stunning content with our intuitive editor, 
                customize your blog with beautiful themes, and engage with your growing community.
              </p>
              <ul className="demo-features">
                <li>✅ Drag & drop content editor</li>
                <li>✅ Real-time collaboration</li>
                <li>✅ Advanced SEO optimization</li>
                <li>✅ Built-in analytics dashboard</li>
                <li>✅ Mobile-responsive designs</li>
              </ul>
              <button className="btn-demo-large">
                <span>🎬</span>
                Watch Full Demo
              </button>
            </div>
            <div className="demo-video">
              <div className="video-placeholder">
                <div className="play-button">
                  <span>▶️</span>
                </div>
                <div className="video-overlay">
                  <h4>Platform Demo</h4>
                  <p>3:45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet the Creators Behind EchoBloom</h2>
            <p className="section-subtitle">A passionate team dedicated to revolutionizing digital storytelling</p>
            <div className="section-line"></div>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-bg">👩‍💼</div>
              </div>
              <h4>Alex Chen</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">Former product designer at tech giants, passionate about creating tools that empower creators.</p>
              <div className="social-links">
                <span>🐦</span><span>💼</span><span>🌐</span>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-bg">👨‍💻</div>
              </div>
              <h4>Jordan Smith</h4>
              <p className="member-role">Lead Developer</p>
              <p className="member-bio">Full-stack engineer with expertise in scalable platforms and user experience optimization.</p>
              <div className="social-links">
                <span>💻</span><span>📧</span><span>🔗</span>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-bg">👩‍🎨</div>
              </div>
              <h4>Maya Patel</h4>
              <p className="member-role">Head of Community</p>
              <p className="member-bio">Community building expert focused on creating inclusive spaces for creators to thrive.</p>
              <div className="social-links">
                <span>📱</span><span>💬</span><span>🎯</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="floating-icons">
            <span className="float-icon icon-1">✨</span>
            <span className="float-icon icon-2">🚀</span>
            <span className="float-icon icon-3">💡</span>
            <span className="float-icon icon-4">🎨</span>
            <span className="float-icon icon-5">📝</span>
          </div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join the EchoBloom community today and transform the way you create and share content. 
               Your audience is waiting to hear your unique voice.</p>
            <div className="cta-buttons">
              <button className="btn-primary-large">
                <span>🎯</span>
                Get Started Free
              </button>
              <button className="btn-secondary-large">
                <span>📞</span>
                Schedule Demo
              </button>
            </div>
            <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.1s ease;
          backdrop-filter: blur(2px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: ${mode === 'dark' 
            ? 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'radial-gradient(ellipse at center, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .animated-bg {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }

        .bg-shape {
          position: absolute;
          background: ${mode === 'dark' ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255, 255, 255, 0.4)'};
          border-radius: 50%;
          animation: morphing 8s ease-in-out infinite;
        }

        .shape-1 { width: 100px; height: 100px; top: 10%; left: 10%; animation-delay: 0s; }
        .shape-2 { width: 150px; height: 80px; top: 20%; left: 80%; animation-delay: 1s; border-radius: 40px; }
        .shape-3 { width: 80px; height: 120px; top: 70%; left: 15%; animation-delay: 2s; border-radius: 30px; }
        .shape-4 { width: 200px; height: 100px; top: 60%; left: 70%; animation-delay: 3s; border-radius: 50px; }
        .shape-5 { width: 60px; height: 60px; top: 40%; left: 50%; animation-delay: 4s; }

        @keyframes morphing {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); border-radius: 50%; }
          25% { transform: translateY(-30px) scale(1.1) rotate(90deg); border-radius: 30% 70% 70% 30%; }
          50% { transform: translateY(-20px) scale(0.9) rotate(180deg); border-radius: 40% 60% 60% 40%; }
          75% { transform: translateY(-40px) scale(1.05) rotate(270deg); border-radius: 60% 40% 40% 60%; }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1.2s ease-out;
        }

        .hero-content.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          margin-bottom: 2rem;
          line-height: 1.1;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        .gradient-text {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #e056fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 300% 300%;
          animation: gradient-animation 4s ease infinite;
        }

        @keyframes gradient-animation {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-demo {
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(78, 205, 196, 0.4);
        }

        .btn-demo {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-demo:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem 1rem;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ecdc4;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Section Styling */
        section:not(.hero-section) {
          padding: 6rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .section-line {
          width: 100px;
          height: 4px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          margin: 0 auto;
          border-radius: 2px;
          position: relative;
        }

        .section-line::after {
          content: '';
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(78, 205, 196, 0.3), transparent);
          left: -50%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Features Section */
        .features-section {
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 50%, #34495e 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #e9ecef 100%)'
          };
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        .feature-card {
          padding: 3rem 2.5rem;
          background: ${mode === 'dark' 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          };
          border-radius: 20px;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          };
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .feature-card:hover::before {
          left: 100%;
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(78, 205, 196, 0.2)'
            : '0 25px 50px rgba(102, 126, 234, 0.15)'
          };
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          font-weight: 700;
        }

        .feature-card p {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .feature-btn {
          background: none;
          border: 2px solid ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .feature-btn:hover {
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          color: white;
          transform: translateX(5px);
        }

        /* Mission Section */
        .mission-section {
          background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .mission-text h3 {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          font-weight: 700;
        }

        .mission-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: ${mode === 'dark' ? '#ecf0f1' : '#5a6c7d'};
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .value-card {
          padding: 2rem 1.5rem;
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
          };
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .value-card:hover,
        .value-card.active {
          border-color: #4ecdc4;
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(78, 205, 196, 0.2);
        }

        .value-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .value-card h4 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          font-weight: 600;
        }

        .value-card p {
          font-size: 0.9rem;
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.5;
        }

        /* Testimonials Section */
        .testimonials-section {
          background: ${mode === 'dark' 
            ? 'radial-gradient(ellipse at center, #16213e 0%, #1a1a2e 50%, #0f3460 100%)'
            : 'radial-gradient(ellipse at center, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          color: white;
        }

        .testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-main {
          margin-bottom: 3rem;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          padding: 3rem;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.5s ease;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .testimonial-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-right: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }

        .testimonial-info h4 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .testimonial-info p {
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .rating {
          display: flex;
          gap: 0.2rem;
        }

        .testimonial-card blockquote {
          font-size: 1.3rem;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          position: relative;
        }

        .testimonial-card blockquote::before,
        .testimonial-card blockquote::after {
          content: '"';
          font-size: 4rem;
          color: #4ecdc4;
          position: absolute;
          opacity: 0.3;
        }

        .testimonial-card blockquote::before {
          top: -20px;
          left: -20px;
        }

        .testimonial-card blockquote::after {
          bottom: -40px;
          right: 0px;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #4ecdc4;
          transform: scale(1.3);
        }

        .dot:hover {
          background: rgba(78, 205, 196, 0.7);
        }

        /* Demo Section */
        .demo-section {
          background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
        }

        .demo-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .demo-text h2 {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          font-weight: 800;
        }

        .demo-text p {
          font-size: 1.2rem;
          line-height: 1.7;
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          margin-bottom: 2rem;
        }

        .demo-features {
          list-style: none;
          padding: 0;
          margin-bottom: 3rem;
        }

        .demo-features li {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: ${mode === 'dark' ? '#ecf0f1' : '#2c3e50'};
        }

        .btn-demo-large {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1.5rem 3rem;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-demo-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(78, 205, 196, 0.4);
        }

        .demo-video {
          position: relative;
        }

        .video-placeholder {
          aspect-ratio: 16/9;
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          };
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-placeholder:hover {
          transform: scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }

        .play-button {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all 0.3s ease;
          animation: pulse-play 2s infinite;
        }

        @keyframes pulse-play {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .video-overlay {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
        }

        .video-overlay h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .video-overlay p {
          opacity: 0.8;
        }

        /* Team Section */
        .team-section {
          background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .team-member {
          text-align: center;
          padding: 3rem 2rem;
          background: ${mode === 'dark' 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          };
          border-radius: 25px;
          box-shadow: ${mode === 'dark' 
            ? '0 15px 35px rgba(0, 0, 0, 0.3)'
            : '0 15px 35px rgba(0, 0, 0, 0.1)'
          };
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .team-member::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .team-member:hover::before {
          left: 100%;
        }

        .team-member:hover {
          transform: translateY(-15px);
          box-shadow: ${mode === 'dark' 
            ? '0 25px 50px rgba(78, 205, 196, 0.2)'
            : '0 25px 50px rgba(102, 126, 234, 0.15)'
          };
        }

        .member-avatar {
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 4s ease-in-out infinite;
        }

        .avatar-bg {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: ${mode === 'dark' ? '#2c3e50' : '#ffffff'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }

        .team-member h4 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
          color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
          font-weight: 700;
        }

        .member-role {
          color: #4ecdc4;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .member-bio {
          color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .social-links span {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-links span:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(78, 205, 196, 0.3);
        }

        /* CTA Section */
        .cta-section {
          background: ${mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
        }

        .floating-icons {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .float-icon {
          position: absolute;
          font-size: 2rem;
          animation: floatIcons 8s ease-in-out infinite;
        }

        .icon-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .icon-2 { top: 60%; left: 85%; animation-delay: 1.6s; }
        .icon-3 { top: 80%; left: 15%; animation-delay: 3.2s; }
        .icon-4 { top: 30%; left: 80%; animation-delay: 4.8s; }
        .icon-5 { top: 70%; left: 50%; animation-delay: 6.4s; }

        @keyframes floatIcons {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-40px) rotate(270deg); }
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-content h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 2rem;
          font-weight: 900;
        }

        .cta-content > p {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .btn-primary-large, .btn-secondary-large {
          padding: 1.5rem 3rem;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary-large {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          box-shadow: 0 15px 35px rgba(78, 205, 196, 0.3);
        }

        .btn-primary-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(78, 205, 196, 0.4);
        }

        .btn-secondary-large {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .cta-note {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-top: 1rem;
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .mission-content,
          .demo-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn-primary-large, .btn-secondary-large {
            width: 250px;
            justify-content: center;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-demo {
            width: 200px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          section:not(.hero-section) {
            padding: 4rem 0;
          }

          .feature-card,
          .team-member {
            padding: 2rem 1.5rem;
          }

          .testimonial-card {
            padding: 2rem;
          }

          .stat-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </article>
  );
};

export default About;


// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import "./About.css";

// const About = () => {
//   const { mode } = useContext(Context);
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeSection, setActiveSection] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setActiveSection(prev => (prev + 1) % 4);
//     }, 4000);

//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
//     }, 5000);

//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       clearInterval(interval);
//       clearInterval(testimonialInterval);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const features = [
//     {
//       icon: "✍️",
//       title: "AI-Powered Editor",
//       description: "Smart writing assistant that helps you craft perfect stories with grammar checks, tone suggestions, and SEO optimization."
//     },
//     {
//       icon: "🎨",
//       title: "Beautiful Templates",
//       description: "Choose from 50+ professionally designed templates to make your content stand out and engage your audience."
//     },
//     {
//       icon: "📊",
//       title: "Advanced Analytics",
//       description: "Track your performance with detailed insights on views, engagement, and audience demographics."
//     },
//     {
//       icon: "🌐",
//       title: "Global Reach",
//       description: "Multi-language support and built-in SEO tools help your content reach readers worldwide."
//     },
//     {
//       icon: "💬",
//       title: "Interactive Comments",
//       description: "Engage with your audience through threaded comments, reactions, and real-time discussions."
//     },
//     {
//       icon: "🔒",
//       title: "Privacy Control",
//       description: "Complete control over your content visibility with premium membership options and private blogs."
//     }
//   ];

//   const values = [
//     {
//       icon: "🌱",
//       title: "Innovation",
//       description: "Cutting-edge technology meets creative storytelling to deliver exceptional user experiences."
//     },
//     {
//       icon: "🤝",
//       title: "Community",
//       description: "Building bridges between diverse perspectives and fostering meaningful connections worldwide."
//     },
//     {
//       icon: "✨",
//       title: "Quality",
//       description: "Premium tools and features that help creators produce their best work every time."
//     },
//     {
//       icon: "🎯",
//       title: "Growth",
//       description: "Empowering creators to grow their audience and monetize their passion through our platform."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Travel Blogger",
//       content: "EchoBloom transformed my blogging experience! The AI editor is incredible and my engagement has increased by 300%.",
//       rating: 5,
//       avatar: "👩‍💼"
//     },
//     {
//       name: "Mike Chen",
//       role: "Tech Writer",
//       content: "The analytics dashboard gives me insights I never had before. I can see exactly what resonates with my audience.",
//       rating: 5,
//       avatar: "👨‍💻"
//     },
//     {
//       name: "Emma Rodriguez",
//       role: "Lifestyle Influencer",
//       content: "Beautiful templates and seamless publishing. EchoBloom made it so easy to create professional-looking content.",
//       rating: 5,
//       avatar: "👩‍🎨"
//     },
//     {
//       name: "David Kim",
//       role: "Business Coach",
//       content: "The community features are amazing. I've connected with fellow creators and grown my network significantly.",
//       rating: 5,
//       avatar: "👨‍🎓"
//     }
//   ];

//   const stats = [
//     { number: "50K+", label: "Active Creators", icon: "👥" },
//     { number: "2M+", label: "Stories Published", icon: "📝" },
//     { number: "120+", label: "Countries", icon: "🌍" },
//     { number: "99.9%", label: "Uptime", icon: "⚡" }
//   ];

//   return (
//     <article className={`${mode === "dark" ? "dark-bg" : "light-bg"} about-page`}>
//       {/* Custom Cursor */}
//       <div 
//         className="custom-cursor" 
//         style={{ 
//           left: mousePosition.x, 
//           top: mousePosition.y,
//           background: mode === 'dark' ? 'rgba(78, 205, 196, 0.3)' : 'rgba(102, 126, 234, 0.3)'
//         }}
//       />

//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-background">
//           <div className="animated-bg">
//             {[...Array(20)].map((_, i) => (
//               <div key={i} className={`bg-shape shape-${i + 1}`} />
//             ))}
//           </div>
//           <div className="particles-container">
//             {[...Array(50)].map((_, i) => (
//               <div key={i} className={`particle particle-${i + 1}`} />
//             ))}
//           </div>
//           <div className="gradient-orbs">
//             <div className="orb orb-1" />
//             <div className="orb orb-2" />
//             <div className="orb orb-3" />
//           </div>
//         </div>
//         <div className="container">
//           <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
//             <h1 className="hero-title">
//               Welcome to
//               <span className="gradient-text"> EchoBloom</span>
//               <br />Where Stories Come Alive
//             </h1>
//             <p className="hero-subtitle">
//               The next-generation blogging platform designed for modern creators. 
//               Powerful tools, stunning design, and a thriving community—all in one place.
//             </p>
//             <div className="hero-buttons">
//               <button className="btn-primary">
//                 <span>🚀</span>
//                 Start Creating
//               </button>
//               <button className="btn-demo">
//                 <span>▶️</span>
//                 Watch Demo
//               </button>
//             </div>
//             <div className="hero-stats">
//               {stats.map((stat, index) => (
//                 <div key={index} className="stat-card">
//                   <div className="stat-icon">{stat.icon}</div>
//                   <div className="stat-number">{stat.number}</div>
//                   <div className="stat-label">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="features-background">
//           <div className="mesh-gradient" />
//           <div className="floating-elements">
//             {[...Array(15)].map((_, i) => (
//               <div key={i} className={`floating-element element-${i + 1}`} />
//             ))}
//           </div>
//         </div>
//         <div className="container">
//           <div className="section-header">
//             <h2>Powerful Features for Modern Creators</h2>
//             <p className="section-subtitle">Everything you need to create, publish, and grow your audience</p>
//             <div className="section-line"></div>
//           </div>
//           <div className="features-grid">
//             {features.map((feature, index) => (
//               <div key={index} className="feature-card">
//                 <div className="feature-icon">{feature.icon}</div>
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//                 <button className="feature-btn">Learn More →</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission & Values Section */}
//       <section className="mission-section">
//         <div className="mission-background">
//           <div className="geometric-pattern" />
//           <div className="wave-animation" />
//         </div>
//         <div className="container">
//           <div className="mission-content">
//             <div className="mission-text">
//               <div className="section-header">
//                 <h2>Our Mission</h2>
//                 <div className="section-line"></div>
//               </div>
//               <h3>Empowering Every Voice to Make an Impact</h3>
//               <p>
//                 EchoBloom is built on the belief that everyone has a story worth telling. 
//                 We've created a platform that combines cutting-edge technology with intuitive design, 
//                 making it easier than ever for creators to share their ideas, connect with their audience, 
//                 and build thriving communities around their content.
//               </p>
//               <p>
//                 Whether you're a seasoned blogger, an aspiring writer, or a business looking to share your expertise, 
//                 EchoBloom provides the tools and features you need to succeed in the digital landscape.
//               </p>
//             </div>
//             <div className="values-grid">
//               {values.map((value, index) => (
//                 <div 
//                   key={index} 
//                   className={`value-card ${activeSection === index ? 'active' : ''}`}
//                 >
//                   <div className="value-icon">{value.icon}</div>
//                   <h4>{value.title}</h4>
//                   <p>{value.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Community Testimonials */}
//       <section className="testimonials-section">
//         <div className="testimonials-background">
//           <div className="cosmic-bg">
//             <div className="star" style={{top: '10%', left: '20%', animationDelay: '0s'}} />
//             <div className="star" style={{top: '30%', left: '80%', animationDelay: '1s'}} />
//             <div className="star" style={{top: '60%', left: '15%', animationDelay: '2s'}} />
//             <div className="star" style={{top: '80%', left: '70%', animationDelay: '3s'}} />
//             <div className="star" style={{top: '20%', left: '50%', animationDelay: '4s'}} />
//           </div>
//           <div className="aurora-effect" />
//         </div>
//         <div className="container">
//           <div className="section-header">
//             <h2>What Our Community Says</h2>
//             <p className="section-subtitle">Join thousands of creators who've found their home at EchoBloom</p>
//             <div className="section-line"></div>
//           </div>
//           <div className="testimonials-container">
//             <div className="testimonial-main">
//               <div className="testimonial-card active">
//                 <div className="testimonial-header">
//                   <div className="testimonial-avatar">
//                     {testimonials[currentTestimonial].avatar}
//                   </div>
//                   <div className="testimonial-info">
//                     <h4>{testimonials[currentTestimonial].name}</h4>
//                     <p>{testimonials[currentTestimonial].role}</p>
//                     <div className="rating">
//                       {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                         <span key={i}>⭐</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <blockquote>"{testimonials[currentTestimonial].content}"</blockquote>
//               </div>
//             </div>
//             <div className="testimonial-dots">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`dot ${index === currentTestimonial ? 'active' : ''}`}
//                   onClick={() => setCurrentTestimonial(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Demo Section */}
//       <section className="demo-section">
//         <div className="demo-background">
//           <div className="hexagon-pattern" />
//           <div className="glow-effects">
//             <div className="glow glow-1" />
//             <div className="glow glow-2" />
//             <div className="glow glow-3" />
//           </div>
//         </div>
//         <div className="container">
//           <div className="demo-content">
//             <div className="demo-text">
//               <h2>See EchoBloom in Action</h2>
//               <p>
//                 Discover how easy it is to create stunning content with our intuitive editor, 
//                 customize your blog with beautiful themes, and engage with your growing community.
//               </p>
//               <ul className="demo-features">
//                 <li>✅ Drag & drop content editor</li>
//                 <li>✅ Real-time collaboration</li>
//                 <li>✅ Advanced SEO optimization</li>
//                 <li>✅ Built-in analytics dashboard</li>
//                 <li>✅ Mobile-responsive designs</li>
//               </ul>
//               <button className="btn-demo-large">
//                 <span>🎬</span>
//                 Watch Full Demo
//               </button>
//             </div>
//             <div className="demo-video">
//               <div className="video-placeholder">
//                 <div className="play-button">
//                   <span>▶️</span>
//                 </div>
//                 <div className="video-overlay">
//                   <h4>Platform Demo</h4>
//                   <p>3:45 minutes</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="team-section">
//         <div className="team-background">
//           <div className="circuit-pattern" />
//           <div className="energy-waves" />
//         </div>
//         <div className="container">
//           <div className="section-header">
//             <h2>Meet the Creators Behind EchoBloom</h2>
//             <p className="section-subtitle">A passionate team dedicated to revolutionizing digital storytelling</p>
//             <div className="section-line"></div>
//           </div>
//           <div className="team-grid">
//             <div className="team-member">
//               <div className="member-avatar">
//                 <div className="avatar-bg">👩‍💼</div>
//               </div>
//               <h4>Alex Chen</h4>
//               <p className="member-role">Founder & CEO</p>
//               <p className="member-bio">Former product designer at tech giants, passionate about creating tools that empower creators.</p>
//               <div className="social-links">
//                 <span>🐦</span><span>💼</span><span>🌐</span>
//               </div>
//             </div>
//             <div className="team-member">
//               <div className="member-avatar">
//                 <div className="avatar-bg">👨‍💻</div>
//               </div>
//               <h4>Jordan Smith</h4>
//               <p className="member-role">Lead Developer</p>
//               <p className="member-bio">Full-stack engineer with expertise in scalable platforms and user experience optimization.</p>
//               <div className="social-links">
//                 <span>💻</span><span>📧</span><span>🔗</span>
//               </div>
//             </div>
//             <div className="team-member">
//               <div className="member-avatar">
//                 <div className="avatar-bg">👩‍🎨</div>
//               </div>
//               <h4>Maya Patel</h4>
//               <p className="member-role">Head of Community</p>
//               <p className="member-bio">Community building expert focused on creating inclusive spaces for creators to thrive.</p>
//               <div className="social-links">
//                 <span>📱</span><span>💬</span><span>🎯</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="cta-background">
//           <div className="liquid-animation" />
//           <div className="floating-icons">
//             <span className="float-icon icon-1">✨</span>
//             <span className="float-icon icon-2">🚀</span>
//             <span className="float-icon icon-3">💡</span>
//             <span className="float-icon icon-4">🎨</span>
//             <span className="float-icon icon-5">📝</span>
//           </div>
//         </div>
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready to Start Your Journey?</h2>
//             <p>Join the EchoBloom community today and transform the way you create and share content. 
//                Your audience is waiting to hear your unique voice.</p>
//             <div className="cta-buttons">
//               <button className="btn-primary-large">
//                 <span>🎯</span>
//                 Get Started Free
//               </button>
//               <button className="btn-secondary-large">
//                 <span>📞</span>
//                 Schedule Demo
//               </button>
//             </div>
//             <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
//           </div>
//         </div>
//       </section>
//     </article>
//   );
// };

// export default About;

