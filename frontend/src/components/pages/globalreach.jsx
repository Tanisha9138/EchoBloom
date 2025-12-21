

// import React, { useState, useContext, useRef } from 'react';

// // Mock Context - replace with your actual Context import
// const Context = React.createContext({ mode: 'light' });

// const GlobalReach = () => {
//   const { mode } = useContext(Context);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [autoTranslate, setAutoTranslate] = useState(true);
//   const [inputText, setInputText] = useState('');
//   const [translatedText, setTranslatedText] = useState('');
//   const [isTranslating, setIsTranslating] = useState(false);
  
//   const translationSectionRef = useRef(null);

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸', speakers: '1.5B', status: 'active' },
//     { code: 'es', name: 'Spanish', flag: '🇪🇸', speakers: '559M', status: 'active' },
//     { code: 'zh', name: 'Chinese', flag: '🇨🇳', speakers: '1.3B', status: 'active' },
//     { code: 'hi', name: 'Hindi', flag: '🇮🇳', speakers: '602M', status: 'active' },
//     { code: 'ar', name: 'Arabic', flag: '🇸🇦', speakers: '274M', status: 'active' },
//     { code: 'fr', name: 'French', flag: '🇫🇷', speakers: '280M', status: 'active' },
//     { code: 'de', name: 'German', flag: '🇩🇪', speakers: '134M', status: 'available' },
//     { code: 'ja', name: 'Japanese', flag: '🇯🇵', speakers: '125M', status: 'available' },
//     { code: 'pt', name: 'Portuguese', flag: '🇵🇹', speakers: '257M', status: 'available' },
//     { code: 'ru', name: 'Russian', flag: '🇷🇺', speakers: '258M', status: 'available' },
//     { code: 'it', name: 'Italian', flag: '🇮🇹', speakers: '85M', status: 'available' },
//     { code: 'ko', name: 'Korean', flag: '🇰🇷', speakers: '81M', status: 'available' }
//   ];

//   const seoFeatures = [
//     {
//       icon: '🌍',
//       title: 'Multi-Regional SEO',
//       description: 'Optimize your content for different regions and search engines worldwide',
//       features: ['Country-specific URLs', 'Hreflang tags', 'Regional meta tags']
//     },
//     {
//       icon: '🔍',
//       title: 'International Keywords',
//       description: 'Target keywords in multiple languages to reach global audiences',
//       features: ['Keyword research tools', 'Search volume analytics', 'Competition analysis']
//     },
//     {
//       icon: '🚀',
//       title: 'Global CDN',
//       description: 'Fast content delivery to readers anywhere in the world',
//       features: ['Edge caching', 'Low latency', 'Auto-optimization']
//     },
//     {
//       icon: '📱',
//       title: 'Localized URLs',
//       description: 'Create SEO-friendly URLs for each language and region',
//       features: ['Custom URL structures', 'Language prefixes', 'Domain mapping']
//     }
//   ];

//   const stats = [
//     { label: 'Supported Languages', value: '50+', icon: '🌐' },
//     { label: 'Global Readers', value: '2.5M', icon: '👥' },
//     { label: 'Countries Reached', value: '180+', icon: '🗺️' },
//     { label: 'Translation Accuracy', value: '98%', icon: '✨' }
//   ];

//   const handleLanguageToggle = (code) => {
//     const language = languages.find(l => l.code === code);
    
//     // Check if language is available but not active
//     if (language.status === 'available') {
//       const enable = window.confirm(
//         `${language.name} is currently not active. Would you like to enable it for translation?`
//       );
      
//       if (!enable) return;
      
//       // Here you could make an API call to enable the language
//       // For now, we'll just show a message
//       alert(`${language.name} has been enabled! You can now use it for translations.`);
      
//       // Update the language status (in real app, this would come from backend)
//       language.status = 'active';
//     }
    
//     if (selectedLanguage !== code) {
//       setSelectedLanguage(code);
      
//       if (translationSectionRef.current) {
//         translationSectionRef.current.scrollIntoView({ 
//           behavior: 'smooth', 
//           block: 'center' 
//         });
        
//         translationSectionRef.current.classList.add('pulse-highlight');
//         setTimeout(() => {
//           translationSectionRef.current.classList.remove('pulse-highlight');
//         }, 1500);
//       }
//     }
//   };
  
//   const translateText = async () => {
//     if (!inputText.trim()) {
//       alert('Please enter text to translate');
//       return;
//     }

//     if (selectedLanguage === 'en') {
//       alert('Please select a target language other than English');
//       return;
//     }

//     // Check if the selected language is active
//     const selectedLang = languages.find(l => l.code === selectedLanguage);
//     if (selectedLang?.status !== 'active') {
//       alert('Please enable this language first by clicking on it in the language list above.');
//       return;
//     }

//     setIsTranslating(true);

//     try {
//       const targetLang = languages.find(l => l.code === selectedLanguage)?.name;
      
//       const response = await fetch('http://localhost:4000/api/v1/translate/translate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           text: inputText,
//           targetLanguage: targetLang
//         })
//       });

//       const data = await response.json();
      
//       if (data.success && data.translation) {
//         setTranslatedText(data.translation);
//       } else {
//         alert(data.message || 'Translation failed. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred during translation. Please check if your backend is running.');
//       console.error('Translation error:', error);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   return (
//     <div className={`global-reach-page ${mode === 'dark' ? 'dark-bg' : 'light-bg'}`}>
//       <section className="global-hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1>🌍 Go Global</h1>
//             <p>Reach readers worldwide with multi-language support and built-in SEO tools</p>
//             <div className="hero-badges">
//               <span className="badge">50+ Languages</span>
//               <span className="badge">AI Translation</span>
//               <span className="badge">SEO Optimized</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="stats-section">
//         <div className="container">
//           <div className="stats-grid">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-box">
//                 <div className="stat-icon">{stat.icon}</div>
//                 <div className="stat-value">{stat.value}</div>
//                 <div className="stat-label">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="language-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Supported Languages</h2>
//             <p>Click any language to try instant translation below</p>
//           </div>

//           <div className="auto-translate">
//             <div className="toggle-container">
//               <label className="toggle-label">
//                 <input
//                   type="checkbox"
//                   checked={autoTranslate}
//                   onChange={() => setAutoTranslate(!autoTranslate)}
//                 />
//                 <span className="toggle-slider"></span>
//               </label>
//               <div className="toggle-info">
//                 <h4>Auto-Translate New Posts</h4>
//                 <p>Automatically translate your content to all enabled languages</p>
//               </div>
//             </div>
//           </div>

//           <div className="languages-grid">
//             {languages.map((lang) => (
//               <div 
//                 key={lang.code}
//                 className={`language-card ${selectedLanguage === lang.code ? 'selected' : ''}`}
//                 onClick={() => handleLanguageToggle(lang.code)}
//               >
//                 <div className="lang-flag">{lang.flag}</div>
//                 <div className="lang-info">
//                   <h3>{lang.name}</h3>
//                   <p>{lang.speakers} speakers</p>
//                 </div>
//                 <div className={`lang-status ${lang.status}`}>
//                   {selectedLanguage === lang.code ? '✓ Selected' : lang.status === 'active' ? '✓ Active' : 'Available'}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="seo-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Built-in Global SEO Tools</h2>
//             <p>Everything you need to rank internationally</p>
//           </div>

//           <div className="seo-grid">
//             {seoFeatures.map((feature, index) => (
//               <div key={index} className="seo-card">
//                 <div className="seo-icon">{feature.icon}</div>
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//                 <ul className="seo-features-list">
//                   {feature.features.map((item, idx) => (
//                     <li key={idx}>✓ {item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="preview-section" ref={translationSectionRef}>
//         <div className="container">
//           <div className="section-header">
//             <h2>See Your Content in Any Language</h2>
//             <p>High-quality AI-powered translations that maintain your voice and style</p>
//           </div>

//           <div className="preview-container">
//             <div className="preview-card">
//               <div className="preview-header">
//                 <span className="preview-lang">🇺🇸 English (Original)</span>
//               </div>
//               <div className="preview-content">
//                 <textarea
//                   placeholder="Paste your text here..."
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   style={{
//                     width: '100%',
//                     minHeight: '150px',
//                     padding: '1rem',
//                     border: mode === 'dark' ? '1px solid #546e7a' : '1px solid #e0e0e0',
//                     borderRadius: '10px',
//                     background: mode === 'dark' ? '#2c3e50' : '#ffffff',
//                     color: mode === 'dark' ? '#ffffff' : '#2c3e50',
//                     fontSize: '1rem',
//                     fontFamily: 'inherit',
//                     resize: 'vertical'
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="arrow">→</div>

//             <div className="preview-card translated">
//               <div className="preview-header">
//                 <span className="preview-lang">
//                   {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name} (Translated)
//                 </span>
//                 {translatedText && <span className="accuracy-badge">98% accurate</span>}
//               </div>
//               <div className="preview-content">
//                 <textarea
//                   placeholder="Translation will appear here..."
//                   value={translatedText}
//                   readOnly
//                   style={{
//                     width: '100%',
//                     minHeight: '150px',
//                     padding: '1rem',
//                     border: '2px solid #4ecdc4',
//                     borderRadius: '10px',
//                     background: mode === 'dark' ? '#2c3e50' : '#ffffff',
//                     color: mode === 'dark' ? '#ffffff' : '#2c3e50',
//                     fontSize: '1rem',
//                     fontFamily: 'inherit',
//                     resize: 'vertical'
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//             <button 
//               onClick={translateText}
//               disabled={isTranslating || !inputText.trim()}
//               style={{
//                 padding: '1rem 3rem',
//                 background: isTranslating || !inputText.trim() ? '#95a5a6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '25px',
//                 fontSize: '1.1rem',
//                 fontWeight: '700',
//                 cursor: isTranslating || !inputText.trim() ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)'
//               }}
//             >
//               {isTranslating ? '🔄 Translating...' : '🚀 Translate Now'}
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready to Reach a Global Audience?</h2>
//             <p>Enable multi-language support and SEO tools for your blog today</p>
//             <div className="cta-buttons">
//               <button className="btn-primary">Enable Global Features</button>
//               <button className="btn-secondary">Learn More</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .global-reach-page {
//           min-height: 100vh;
//           scroll-behavior: smooth;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 20px;
//         }

//         .global-hero {
//           padding: 8rem 0 4rem;
//           background: ${mode === 'dark' 
//             ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
//             : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
//           };
//           color: white;
//           text-align: center;
//         }

//         .hero-content h1 {
//           font-size: clamp(2.5rem, 5vw, 4rem);
//           font-weight: 900;
//           margin-bottom: 1.5rem;
//         }

//         .hero-content p {
//           font-size: 1.3rem;
//           margin-bottom: 2rem;
//           opacity: 0.9;
//         }

//         .hero-badges {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .badge {
//           background: rgba(255, 255, 255, 0.2);
//           backdrop-filter: blur(10px);
//           padding: 0.6rem 1.5rem;
//           border-radius: 25px;
//           font-weight: 600;
//         }

//         .stats-section {
//           padding: 4rem 0;
//           background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 2rem;
//         }

//         .stat-box {
//           text-align: center;
//           padding: 2rem;
//           background: ${mode === 'dark' 
//             ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
//             : 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)'
//           };
//           border-radius: 20px;
//           box-shadow: ${mode === 'dark' 
//             ? '0 10px 30px rgba(0, 0, 0, 0.3)'
//             : '0 10px 30px rgba(0, 0, 0, 0.1)'
//           };
//           transition: transform 0.3s ease;
//         }

//         .stat-box:hover {
//           transform: translateY(-5px);
//         }

//         .stat-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//         }

//         .stat-value {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//           font-size: 0.9rem;
//         }

//         .language-section {
//           padding: 4rem 0;
//           background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
//         }

//         .section-header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }

//         .section-header h2 {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//           margin-bottom: 1rem;
//         }

//         .section-header p {
//           font-size: 1.1rem;
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//         }

//         .auto-translate {
//           max-width: 600px;
//           margin: 0 auto 3rem;
//           padding: 2rem;
//           background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
//           border-radius: 15px;
//           box-shadow: ${mode === 'dark' 
//             ? '0 10px 30px rgba(0, 0, 0, 0.3)'
//             : '0 10px 30px rgba(0, 0, 0, 0.1)'
//           };
//         }

//         .toggle-container {
//           display: flex;
//           align-items: center;
//           gap: 1.5rem;
//         }

//         .toggle-label {
//           position: relative;
//           display: inline-block;
//           width: 60px;
//           height: 34px;
//           cursor: pointer;
//         }

//         .toggle-label input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }

//         .toggle-slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: ${mode === 'dark' ? '#546e7a' : '#ccc'};
//           transition: 0.4s;
//           border-radius: 34px;
//         }

//         .toggle-slider:before {
//           position: absolute;
//           content: "";
//           height: 26px;
//           width: 26px;
//           left: 4px;
//           bottom: 4px;
//           background-color: white;
//           transition: 0.4s;
//           border-radius: 50%;
//         }

//         input:checked + .toggle-slider {
//           background: linear-gradient(45deg, #667eea, #4ecdc4);
//         }

//         input:checked + .toggle-slider:before {
//           transform: translateX(26px);
//         }

//         .toggle-info h4 {
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//           margin-bottom: 0.3rem;
//         }

//         .toggle-info p {
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//           font-size: 0.9rem;
//         }

//         .languages-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         .language-card {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 1.5rem;
//           background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
//           border-radius: 15px;
//           border: 2px solid ${mode === 'dark' ? '#34495e' : '#e0e0e0'};
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .language-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 10px 25px rgba(78, 205, 196, 0.2);
//         }

//         .language-card.selected {
//           border-color: #4ecdc4;
//           background: ${mode === 'dark' 
//             ? 'linear-gradient(145deg, #4ecdc4 0%, #45b7d1 100%)'
//             : 'linear-gradient(145deg, #4ecdc4 0%, #45b7d1 100%)'
//           };
//           box-shadow: 0 10px 30px rgba(78, 205, 196, 0.4);
//         }

//         .language-card.selected * {
//           color: white !important;
//         }

//         .lang-flag {
//           font-size: 3rem;
//         }

//         .lang-info {
//           flex: 1;
//         }

//         .lang-info h3 {
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//           font-size: 1.1rem;
//           margin-bottom: 0.3rem;
//         }

//         .lang-info p {
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//           font-size: 0.85rem;
//         }

//         .lang-status {
//           padding: 0.4rem 0.8rem;
//           border-radius: 12px;
//           font-size: 0.8rem;
//           font-weight: 600;
//         }

//         .lang-status.active {
//           background: rgba(78, 205, 196, 0.2);
//           color: #4ecdc4;
//         }

//         .lang-status.available {
//           background: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//         }

//         .seo-section {
//           padding: 4rem 0;
//           background: ${mode === 'dark' ? '#1a1a2e' : '#ffffff'};
//         }

//         .seo-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 2rem;
//         }

//         .seo-card {
//           padding: 2rem;
//           background: ${mode === 'dark' 
//             ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
//             : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
//           };
//           border-radius: 20px;
//           box-shadow: ${mode === 'dark' 
//             ? '0 10px 30px rgba(0, 0, 0, 0.3)'
//             : '0 10px 30px rgba(0, 0, 0, 0.1)'
//           };
//           transition: transform 0.3s ease;
//         }

//         .seo-card:hover {
//           transform: translateY(-5px);
//         }

//         .seo-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//         }

//         .seo-card h3 {
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//           font-size: 1.3rem;
//           margin-bottom: 1rem;
//         }

//         .seo-card p {
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//           line-height: 1.6;
//           margin-bottom: 1.5rem;
//         }

//         .seo-features-list {
//           list-style: none;
//           padding: 0;
//         }

//         .seo-features-list li {
//           color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//         }

//         .preview-section {
//           padding: 4rem 0;
//           background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
//           transition: all 0.3s ease;
//         }

//         .preview-section.pulse-highlight {
//           animation: pulseHighlight 1.5s ease-in-out;
//         }

//         @keyframes pulseHighlight {
//           0%, 100% {
//             background: ${mode === 'dark' ? '#2c3e50' : '#f8f9fa'};
//           }
//           50% {
//             background: ${mode === 'dark' ? '#34495e' : '#e8f4f8'};
//           }
//         }

//         .preview-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 2rem;
//           flex-wrap: wrap;
//         }

//         .preview-card {
//           flex: 1;
//           min-width: 300px;
//           max-width: 450px;
//           padding: 2rem;
//           background: ${mode === 'dark' ? '#34495e' : '#ffffff'};
//           border-radius: 20px;
//           box-shadow: ${mode === 'dark' 
//             ? '0 10px 30px rgba(0, 0, 0, 0.3)'
//             : '0 10px 30px rgba(0, 0, 0, 0.1)'
//           };
//         }

//         .preview-card.translated {
//           border: 2px solid #4ecdc4;
//         }

//         .preview-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//           padding-bottom: 1rem;
//           border-bottom: 1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'};
//         }

//         .preview-lang {
//           font-weight: 600;
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//         }

//         .accuracy-badge {
//           background: linear-gradient(45deg, #4ecdc4, #45b7d1);
//           color: white;
//           padding: 0.3rem 0.8rem;
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 600;
//         }

//         .preview-content h3 {
//           color: ${mode === 'dark' ? '#ffffff' : '#2c3e50'};
//           font-size: 1.3rem;
//           margin-bottom: 1rem;
//         }

//         .preview-content p {
//           color: ${mode === 'dark' ? '#bdc3c7' : '#5a6c7d'};
//           line-height: 1.6;
//         }

//         .arrow {
//           font-size: 2rem;
//           color: ${mode === 'dark' ? '#4ecdc4' : '#667eea'};
//           font-weight: 700;
//         }

//         .cta-section {
//           padding: 5rem 0;
//           background: ${mode === 'dark' 
//             ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
//             : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
//           };
//           text-align: center;
//           color: white;
//         }

//         .cta-content h2 {
//           font-size: 2.5rem;
//           font-weight: 700;
//           margin-bottom: 1rem;
//         }

//         .cta-content p {
//           font-size: 1.2rem;
//           margin-bottom: 2rem;
//           opacity: 0.9;
//         }

//         .cta-buttons {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .btn-primary,
//         .btn-secondary {
//           padding: 1rem 2.5rem;
//           border: none;
//           border-radius: 25px;
//           font-size: 1.1rem;
//           font-weight: 700;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .btn-primary {
//           background: white;
//           color: #667eea;
//         }

//         .btn-primary:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
//         }

//         .btn-secondary {
//           background: transparent;
//           color: white;
//           border: 2px solid white;
//         }

//         .btn-secondary:hover {
//           background: white;
//           color: #667eea;
//         }

//         @media (max-width: 768px) {
//           .stats-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .languages-grid {
//             grid-template-columns: 1fr;
//           }

//           .preview-container {
//             flex-direction: column;
//           }

//           .arrow {
//             transform: rotate(90deg);
//           }

//           .cta-buttons {
//             flex-direction: column;
//             align-items: center;
//           }

//           .btn-primary,
//           .btn-secondary {
//             width: 100%;
//             max-width: 300px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GlobalReach;




import React, { useState, useContext, useRef } from 'react';
import { Context } from '../../main';

const GlobalReach = () => {
  const { mode } = useContext(Context);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const translationSectionRef = useRef(null);

  const isDark = mode === 'dark';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', speakers: '1.5B', status: 'active' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', speakers: '559M', status: 'active' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', speakers: '1.3B', status: 'active' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', speakers: '602M', status: 'active' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', speakers: '274M', status: 'active' },
    { code: 'fr', name: 'French', flag: '🇫🇷', speakers: '280M', status: 'active' },
    { code: 'de', name: 'German', flag: '🇩🇪', speakers: '134M', status: 'available' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', speakers: '125M', status: 'available' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', speakers: '257M', status: 'available' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', speakers: '258M', status: 'available' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', speakers: '85M', status: 'available' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', speakers: '81M', status: 'available' }
  ];

  const seoFeatures = [
    {
      icon: '🌍',
      title: 'Multi-Regional SEO',
      description: 'Optimize your content for different regions and search engines worldwide',
      features: ['Country-specific URLs', 'Hreflang tags', 'Regional meta tags']
    },
    {
      icon: '🔍',
      title: 'International Keywords',
      description: 'Target keywords in multiple languages to reach global audiences',
      features: ['Keyword research tools', 'Search volume analytics', 'Competition analysis']
    },
    {
      icon: '🚀',
      title: 'Global CDN',
      description: 'Fast content delivery to readers anywhere in the world',
      features: ['Edge caching', 'Low latency', 'Auto-optimization']
    },
    {
      icon: '📱',
      title: 'Localized URLs',
      description: 'Create SEO-friendly URLs for each language and region',
      features: ['Custom URL structures', 'Language prefixes', 'Domain mapping']
    }
  ];

  const stats = [
    { label: 'Supported Languages', value: '50+', icon: '🌐' },
    { label: 'Global Readers', value: '2.5M', icon: '👥' },
    { label: 'Countries Reached', value: '180+', icon: '🗺️' },
    { label: 'Translation Accuracy', value: '98%', icon: '✨' }
  ];

  const handleLanguageToggle = (code) => {
    const language = languages.find(l => l.code === code);
    
    if (language.status === 'available') {
      const enable = window.confirm(
        `${language.name} is currently not active. Would you like to enable it for translation?`
      );
      
      if (!enable) return;
      
      alert(`${language.name} has been enabled! You can now use it for translations.`);
      language.status = 'active';
    }
    
    if (selectedLanguage !== code) {
      setSelectedLanguage(code);
      
      if (translationSectionRef.current) {
        translationSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        translationSectionRef.current.classList.add('pulse-highlight');
        setTimeout(() => {
          translationSectionRef.current.classList.remove('pulse-highlight');
        }, 1500);
      }
    }
  };
  
  const translateText = async () => {
    if (!inputText.trim()) {
      alert('Please enter text to translate');
      return;
    }

    if (selectedLanguage === 'en') {
      alert('Please select a target language other than English');
      return;
    }

    const selectedLang = languages.find(l => l.code === selectedLanguage);
    if (selectedLang?.status !== 'active') {
      alert('Please enable this language first by clicking on it in the language list above.');
      return;
    }

    setIsTranslating(true);

    try {
      const targetLang = languages.find(l => l.code === selectedLanguage)?.name;
      
      const response = await fetch('http://localhost:4000/api/v1/translate/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: targetLang
        })
      });

      const data = await response.json();
      
      if (data.success && data.translation) {
        setTranslatedText(data.translation);
      } else {
        alert(data.message || 'Translation failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during translation. Please check if your backend is running.');
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={`global-reach-page ${isDark ? 'dark-bg' : 'light-bg'}`}>
      <section className="global-hero">
        <div className="container">
          <div className="hero-content">
            <h1>🌍 Go Global</h1>
            <p>Reach readers worldwide with multi-language support and built-in SEO tools</p>
            <div className="hero-badges">
              <span className="badge">50+ Languages</span>
              <span className="badge">AI Translation</span>
              <span className="badge">SEO Optimized</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-box">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="language-section">
        <div className="container">
          <div className="section-header">
            <h2>Supported Languages</h2>
            <p>Click any language to try instant translation below</p>
          </div>

          <div className="auto-translate">
            <div className="toggle-container">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={autoTranslate}
                  onChange={() => setAutoTranslate(!autoTranslate)}
                />
                <span className="toggle-slider"></span>
              </label>
              <div className="toggle-info">
                <h4>Auto-Translate New Posts</h4>
                <p>Automatically translate your content to all enabled languages</p>
              </div>
            </div>
          </div>

          <div className="languages-grid">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className={`language-card ${selectedLanguage === lang.code ? 'selected' : ''}`}
                onClick={() => handleLanguageToggle(lang.code)}
              >
                <div className="lang-flag">{lang.flag}</div>
                <div className="lang-info">
                  <h3>{lang.name}</h3>
                  <p>{lang.speakers} speakers</p>
                </div>
                <div className={`lang-status ${lang.status}`}>
                  {selectedLanguage === lang.code ? '✓ Selected' : lang.status === 'active' ? '✓ Active' : 'Available'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section">
        <div className="container">
          <div className="section-header">
            <h2>Built-in Global SEO Tools</h2>
            <p>Everything you need to rank internationally</p>
          </div>

          <div className="seo-grid">
            {seoFeatures.map((feature, index) => (
              <div key={index} className="seo-card">
                <div className="seo-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="seo-features-list">
                  {feature.features.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-section" ref={translationSectionRef}>
        <div className="container">
          <div className="section-header">
            <h2>See Your Content in Any Language</h2>
            <p>High-quality AI-powered translations that maintain your voice and style</p>
          </div>

          <div className="preview-container">
            <div className="preview-card">
              <div className="preview-header">
                <span className="preview-lang">🇺🇸 English (Original)</span>
              </div>
              <div className="preview-content">
                <textarea
                  placeholder="Paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '1rem',
                    border: isDark ? '1px solid #546e7a' : '1px solid #e0e0e0',
                    borderRadius: '10px',
                    background: isDark ? '#2c3e50' : '#ffffff',
                    color: isDark ? '#ffffff' : '#2c3e50',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            <div className="arrow">→</div>

            <div className="preview-card translated">
              <div className="preview-header">
                <span className="preview-lang">
                  {languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name} (Translated)
                </span>
                {translatedText && <span className="accuracy-badge">98% accurate</span>}
              </div>
              <div className="preview-content">
                <textarea
                  placeholder="Translation will appear here..."
                  value={translatedText}
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '1rem',
                    border: '2px solid #4ecdc4',
                    borderRadius: '10px',
                    background: isDark ? '#2c3e50' : '#ffffff',
                    color: isDark ? '#ffffff' : '#2c3e50',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={translateText}
              disabled={isTranslating || !inputText.trim()}
              style={{
                padding: '1rem 3rem',
                background: isTranslating || !inputText.trim() 
                  ? '#95a5a6' 
                  : isDark
                    ? 'linear-gradient(135deg, #4ecdc4 0%, #44a6d0 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isTranslating || !inputText.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isDark
                  ? '0 5px 20px rgba(78, 205, 196, 0.4)'
                  : '0 5px 20px rgba(102, 126, 234, 0.4)'
              }}
            >
              {isTranslating ? '🔄 Translating...' : '🚀 Translate Now'}
            </button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Reach a Global Audience?</h2>
            <p>Enable multi-language support and SEO tools for your blog today</p>
            <div className="cta-buttons">
              <button className="btn-primary">Enable Global Features</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .global-reach-page {
          min-height: 100vh;
          scroll-behavior: smooth;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .global-hero {
          padding: 8rem 0 4rem;
          background: ${isDark 
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
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .badge {
          background: ${isDark 
            ? 'rgba(78, 205, 196, 0.2)'
            : 'rgba(255, 255, 255, 0.2)'
          };
          backdrop-filter: blur(10px);
          padding: 0.6rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          border: 1px solid ${isDark 
            ? 'rgba(78, 205, 196, 0.3)'
            : 'rgba(255, 255, 255, 0.3)'
          };
        }

        .stats-section {
          padding: 4rem 0;
          background: ${isDark ? '#1a1a2e' : '#ffffff'};
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-box {
          text-align: center;
          padding: 2rem;
          background: ${isDark 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)'
          };
          border-radius: 20px;
          box-shadow: ${isDark 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
          };
          transition: transform 0.3s ease;
          border: 1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'transparent'};
        }

        .stat-box:hover {
          transform: translateY(-5px);
          border-color: ${isDark ? '#4ecdc4' : 'transparent'};
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${isDark ? '#4ecdc4' : '#667eea'};
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
          font-size: 0.9rem;
        }

        .language-section {
          padding: 4rem 0;
          background: ${isDark ? '#2c3e50' : '#f8f9fa'};
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${isDark ? '#ffffff' : '#2c3e50'};
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
        }

        .auto-translate {
          max-width: 600px;
          margin: 0 auto 3rem;
          padding: 2rem;
          background: ${isDark ? '#34495e' : '#ffffff'};
          border-radius: 15px;
          box-shadow: ${isDark 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'transparent'};
        }

        .toggle-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .toggle-label {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
          cursor: pointer;
        }

        .toggle-label input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${isDark ? '#546e7a' : '#ccc'};
          transition: 0.4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background: ${isDark
            ? 'linear-gradient(45deg, #4ecdc4, #44a6d0)'
            : 'linear-gradient(45deg, #667eea, #4ecdc4)'
          };
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .toggle-info h4 {
          color: ${isDark ? '#ffffff' : '#2c3e50'};
          margin-bottom: 0.3rem;
        }

        .toggle-info p {
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
          font-size: 0.9rem;
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .language-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: ${isDark ? '#34495e' : '#ffffff'};
          border-radius: 15px;
          border: 2px solid ${isDark ? '#34495e' : '#e0e0e0'};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .language-card:hover {
          transform: translateY(-3px);
          box-shadow: ${isDark
            ? '0 10px 25px rgba(78, 205, 196, 0.3)'
            : '0 10px 25px rgba(78, 205, 196, 0.2)'
          };
          border-color: #4ecdc4;
        }

        .language-card.selected {
          border-color: #4ecdc4;
          background: ${isDark 
            ? 'linear-gradient(145deg, #4ecdc4 0%, #45b7d1 100%)'
            : 'linear-gradient(145deg, #4ecdc4 0%, #45b7d1 100%)'
          };
          box-shadow: 0 10px 30px rgba(78, 205, 196, 0.4);
        }

        .language-card.selected * {
          color: white !important;
        }

        .lang-flag {
          font-size: 3rem;
        }

        .lang-info {
          flex: 1;
        }

        .lang-info h3 {
          color: ${isDark ? '#ffffff' : '#2c3e50'};
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }

        .lang-info p {
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
          font-size: 0.85rem;
        }

        .lang-status {
          padding: 0.4rem 0.8rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .lang-status.active {
          background: rgba(78, 205, 196, 0.2);
          color: #4ecdc4;
        }

        .lang-status.available {
          background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
        }

        .seo-section {
          padding: 4rem 0;
          background: ${isDark ? '#1a1a2e' : '#ffffff'};
        }

        .seo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .seo-card {
          padding: 2rem;
          background: ${isDark 
            ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
          };
          border-radius: 20px;
          box-shadow: ${isDark 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
          };
          transition: transform 0.3s ease;
          border: 1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'transparent'};
        }

        .seo-card:hover {
          transform: translateY(-5px);
          border-color: ${isDark ? '#4ecdc4' : 'transparent'};
        }

        .seo-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .seo-card h3 {
          color: ${isDark ? '#ffffff' : '#2c3e50'};
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .seo-card p {
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .seo-features-list {
          list-style: none;
          padding: 0;
        }

        .seo-features-list li {
          color: ${isDark ? '#4ecdc4' : '#667eea'};
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .preview-section {
          padding: 4rem 0;
          background: ${isDark ? '#2c3e50' : '#f8f9fa'};
          transition: all 0.3s ease;
        }

        .preview-section.pulse-highlight {
          animation: pulseHighlight 1.5s ease-in-out;
        }

        @keyframes pulseHighlight {
          0%, 100% {
            background: ${isDark ? '#2c3e50' : '#f8f9fa'};
          }
          50% {
            background: ${isDark ? '#34495e' : '#e8f4f8'};
          }
        }

        .preview-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .preview-card {
          flex: 1;
          min-width: 300px;
          max-width: 450px;
          padding: 2rem;
          background: ${isDark ? '#34495e' : '#ffffff'};
          border-radius: 20px;
          box-shadow: ${isDark 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
          };
          border: 1px solid ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'transparent'};
        }

        .preview-card.translated {
          border: 2px solid #4ecdc4;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid ${isDark ? '#546e7a' : '#e0e0e0'};
        }

        .preview-lang {
          font-weight: 600;
          color: ${isDark ? '#ffffff' : '#2c3e50'};
        }

        .accuracy-badge {
          background: linear-gradient(45deg, #4ecdc4, #45b7d1);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .preview-content h3 {
          color: ${isDark ? '#ffffff' : '#2c3e50'};
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .preview-content p {
          color: ${isDark ? '#bdc3c7' : '#5a6c7d'};
          line-height: 1.6;
        }

        .arrow {
          font-size: 2rem;
          color: ${isDark ? '#4ecdc4' : '#667eea'};
          font-weight: 700;
        }

        .cta-section {
          padding: 5rem 0;
          background: ${isDark 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          };
          text-align: center;
          color: white;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: white;
          color: ${isDark ? '#1a1a2e' : '#667eea'};
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: ${isDark ? '#1a1a2e' : '#667eea'};
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .languages-grid {
            grid-template-columns: 1fr;
          }

          .preview-container {
            flex-direction: column;
          }

          .arrow {
            transform: rotate(90deg);
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default GlobalReach;