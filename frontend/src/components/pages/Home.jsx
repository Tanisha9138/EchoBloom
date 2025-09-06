import React, { useContext, useState } from "react";
import LatestBlogs from "../miniComponents/LatestBlog";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import PopularAuthors from "../miniComponents/PopularAuthors";
import DiscoveryResultsModal from "./DiscoveryResultsModal"; // Add this import
import { Context } from "../../main";
import "./home.css";
import "../../DiscoveryResultsModal.css"; // Add this import

const Home = () => {
  const { mode, blogs } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Discovery Engine State
  const [discoverySettings, setDiscoverySettings] = useState({
    mood: "curious",
    readingTime: "5",
    topics: ["technology"]
  });
  const [discoveredBlogs, setDiscoveredBlogs] = useState([]);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false); // Renamed for clarity
  
  const categories = ["All", "Technology", "Lifestyle", "Travel", "Food", "Health", "Business", "Education"];
  
  const filteredBlogs = blogs.slice(0, 6);
  
  // Filter blogs based on search and category
  const searchFilteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || blog.category === selectedCategory)
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Discovery Engine Functions
  const handleMoodChange = (mood) => {
    setDiscoverySettings(prev => ({ ...prev, mood }));
  };

  const handleTimeChange = (time) => {
    setDiscoverySettings(prev => ({ ...prev, readingTime: time }));
  };

  const handleTopicToggle = (topic) => {
    setDiscoverySettings(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const findPerfectRead = () => {
    // Mock discovery algorithm based on user preferences
    let filteredResults = blogs.filter(blog => {
      // Filter by topics
      const topicMatch = discoverySettings.topics.length === 0 || 
        discoverySettings.topics.some(topic => 
          blog.category.toLowerCase() === topic.toLowerCase() ||
          blog.title.toLowerCase().includes(topic.toLowerCase()) ||
          (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase())))
        );

      // Mock reading time filter (assuming each blog has readingTime or calculate from content length)
      const readingTimeMatch = true; // You can implement actual reading time logic here

      return topicMatch && readingTimeMatch;
    });

    // Sort by mood preferences
    if (discoverySettings.mood === "inspired") {
      filteredResults = filteredResults.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (discoverySettings.mood === "focused") {
      filteredResults = filteredResults.filter(blog => 
        blog.category === "Business" || blog.category === "Education" || blog.category === "Technology"
      );
    } else if (discoverySettings.mood === "relaxed") {
      filteredResults = filteredResults.filter(blog => 
        blog.category === "Lifestyle" || blog.category === "Travel" || blog.category === "Food"
      );
    }

    // Limit results and add some randomization for variety
    const shuffled = filteredResults.sort(() => 0.5 - Math.random());
    setDiscoveredBlogs(shuffled.slice(0, 6));
    setShowDiscoveryModal(true); // Open modal instead of inline results
  };

  const resetDiscovery = () => {
    setShowDiscoveryModal(false);
    setDiscoveredBlogs([]);
    setDiscoverySettings({
      mood: "curious",
      readingTime: "5",
      topics: ["technology"]
    });
  };

  const closeDiscoveryModal = () => {
    setShowDiscoveryModal(false);
  };
  

  return (
    <div className={`home-container ${mode === "dark" ? "dark-theme" : "light-theme"}`}>
      {/* Blog-themed Animated Background */}
      <div className="background-layers">
        <div className="blog-pattern-bg"></div>
        <div className="floating-elements">
          <div className="blog-element blog-1">📝</div>
          <div className="blog-element blog-2">✍️</div>
          <div className="blog-element blog-3">📚</div>
          <div className="blog-element blog-4">💡</div>
          <div className="blog-element blog-5">🎯</div>
          <div className="blog-element blog-6">📖</div>
          <div className="blog-element blog-7">🚀</div>
          <div className="blog-element blog-8">💭</div>
        </div>
        <div className="ink-drops">
          <div className="ink-drop drop-1"></div>
          <div className="ink-drop drop-2"></div>
          <div className="ink-drop drop-3"></div>
        </div>
        <div className="paper-texture"></div>
      </div>

      <article className="main-content">
        {/* Ultra-Stylish Hero Section */}
        <section className="hero-wrapper">
          <div className="hero-glass-card">
            <div className="typewriter-decoration">
              <div className="typing-line"></div>
              <div className="cursor-blink">|</div>
            </div>
            <HeroSection />
            
            {/* Premium Search Bar */}
            <div className="search-section">
              <div className="search-container">
                <div className="search-wrapper">
                  <div className="search-box">
                    <div className="search-glow"></div>
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Discover amazing stories, insights, and ideas..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="search-input"
                    />
                    <div className="search-suggestions">
                      <span>Try: "technology", "travel tips", "lifestyle"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stylish Category Explorer with Blog Theme */}
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration">✨</span>
                Explore Categories
                <span className="title-decoration">✨</span>
              </h2>
              <div className="section-subtitle">Discover content that inspires you</div>
            </div>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div
                  key={category}
                  className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="card-shine"></div>
                  <div className="category-icon">
                    {category === "All" && "🌟"}
                    {category === "Technology" && "💻"}
                    {category === "Lifestyle" && "🌱"}
                    {category === "Travel" && "✈️"}
                    {category === "Food" && "🍽️"}
                    {category === "Health" && "💪"}
                    {category === "Business" && "💼"}
                    {category === "Education" && "📚"}
                  </div>
                  <h3>{category}</h3>
                  <span className="post-count">{category === "All" ? blogs.length : blogs.filter(b => b.category === category).length} stories</span>
                  <div className="category-hover-effect"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-wrapper">
              <div className="stats-header">
                <h3>Our Blogging Journey</h3>
                <p>Numbers that tell our story</p>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📄</div>
                  <div className="stat-number">{blogs.length}+</div>
                  <div className="stat-label">Articles Published</div>
                  <div className="stat-bar"></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Readers</div>
                  <div className="stat-bar"></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✍️</div>
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Expert Writers</div>
                  <div className="stat-bar"></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🌍</div>
                  <div className="stat-number">25+</div>
                  <div className="stat-label">Countries</div>
                  <div className="stat-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Content Sections */}
        <section className="content-section trending-wrapper">
          <div className="section-decorator">
            <div className="pen-decoration">🖋️</div>
          </div>
          <TrendingBlogs />
        </section>

        <section className="content-section latest-wrapper">
          <div className="section-decorator">
            <div className="book-decoration">📚</div>
          </div>
          <LatestBlogs 
            heading={searchTerm ? `Search Results for "${searchTerm}"` : "Latest Blogs"} 
            blogs={searchTerm ? searchFilteredBlogs.slice(0, 6) : filteredBlogs} 
          />
        </section>

       
        {/* Blog Discovery Engine Section */}
        <section className="discovery-engine-section">
          <div className="container">
            <div className="discovery-engine-card">
              <div className="discovery-engine-bg-pattern"></div>
              <div className="discovery-engine-content">
                <div className="discovery-engine-icon">🎯</div>
                <h2>Discover Your Perfect Read</h2>
                <p>Tell us what you're in the mood for, and we'll find the perfect story just for you</p>
                
                {/* Mood Selector */}
                <div className="discovery-section">
                  <h4>How are you feeling today?</h4>
                  <div className="mood-selector">
                    {[
                      { id: "curious", emoji: "🤔", label: "Curious" },
                      { id: "inspired", emoji: "💡", label: "Inspired" },
                      { id: "relaxed", emoji: "😌", label: "Relaxed" },
                      { id: "focused", emoji: "🎯", label: "Focused" }
                    ].map((mood) => (
                      <div 
                        key={mood.id}
                        className={`mood-option ${discoverySettings.mood === mood.id ? 'active' : ''}`} 
                        onClick={() => handleMoodChange(mood.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-label">{mood.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reading Time Selector */}
                
                <div className="discovery-section">
                  <h4>How much time do you have?</h4>
                  <div className="time-selector">
                    {[
                      { id: "5", number: "5", label: "min" },
                      { id: "10", number: "10", label: "min" },
                      { id: "15", number: "15", label: "min" },
                      { id: "20+", number: "20+", label: "min" }
                    ].map((time) => (
                      <div 
                        key={time.id}
                        className={`time-option ${discoverySettings.readingTime === time.id ? 'active' : ''}`} 
                        onClick={() => handleTimeChange(time.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="time-number">{time.number}</span>
                        <span className="time-label">{time.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic Interest Cloud */}
                 <div className="discovery-section">
                  <h4>What interests you?</h4>
                  <div className="topic-cloud">
                    {["technology", "lifestyle", "business", "travel", "health", "education", "food", "science"].map((topic) => (
                      <span 
                        key={topic}
                        className={`topic-tag ${discoverySettings.topics.includes(topic) ? 'active' : ''}`} 
                        onClick={() => handleTopicToggle(topic)}
                        role="button"
                        tabIndex={0}
                      >
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>


                {/* Discovery Button */}
                <div className="discovery-action">
                  <button 
                    className="find-content-btn"
                    onClick={findPerfectRead}
                  >
                    <span>Find My Perfect Read</span>
                    <div className="btn-shine"></div>
                    <div className="btn-sparkle">✨</div>
                  </button>
                </div>

                <div className="discovery-benefits">
                  <span>🎯 Personalized recommendations</span>
                  <span>⏱️ Time-based filtering</span>
                  <span>🎨 Mood-matched content</span>
                </div>
              </div>
              
              {/* Floating Discovery Elements */}
              <div className="discovery-illustration">
                <div className="floating-elements-discovery">
                  <span className="float-element">📖</span>
                  <span className="float-element">🔍</span>
                  <span className="float-element">💫</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Remove the old inline results section and replace with modal */}

        <section className="content-section authors-wrapper">
          <div className="section-decorator">
            <div className="author-decoration">👥</div>
          </div>
          <PopularAuthors />
        </section>
      </article>

      {/* Add the Discovery Results Modal */}
      <DiscoveryResultsModal 
        isOpen={showDiscoveryModal}
        onClose={closeDiscoveryModal}
        blogs={discoveredBlogs}
        preferences={discoverySettings}
        onReset={resetDiscovery}
      />
    </div>
  );
};

export default Home;