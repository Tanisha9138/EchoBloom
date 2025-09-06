import React, { useContext, useState } from "react";
import LatestBlogs from "../miniComponents/LatestBlog";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import PopularAuthors from "../miniComponents/PopularAuthors";
import { Context } from "../../main";
import "./home.css";

const Home = () => {
  const { mode, blogs } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
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
                    <div className="mood-option active" data-mood="curious">
                      <span className="mood-emoji">🤔</span>
                      <span className="mood-label">Curious</span>
                    </div>
                    <div className="mood-option" data-mood="inspired">
                      <span className="mood-emoji">💡</span>
                      <span className="mood-label">Inspired</span>
                    </div>
                    <div className="mood-option" data-mood="relaxed">
                      <span className="mood-emoji">😌</span>
                      <span className="mood-label">Relaxed</span>
                    </div>
                    <div className="mood-option" data-mood="focused">
                      <span className="mood-emoji">🎯</span>
                      <span className="mood-label">Focused</span>
                    </div>
                  </div>
                </div>

                {/* Reading Time Selector */}
                <div className="discovery-section">
                  <h4>How much time do you have?</h4>
                  <div className="time-selector">
                    <div className="time-option active" data-time="5">
                      <span className="time-number">5</span>
                      <span className="time-label">min</span>
                    </div>
                    <div className="time-option" data-time="10">
                      <span className="time-number">10</span>
                      <span className="time-label">min</span>
                    </div>
                    <div className="time-option" data-time="15">
                      <span className="time-number">15</span>
                      <span className="time-label">min</span>
                    </div>
                    <div className="time-option" data-time="20+">
                      <span className="time-number">20+</span>
                      <span className="time-label">min</span>
                    </div>
                  </div>
                </div>

                {/* Topic Interest Cloud */}
                <div className="discovery-section">
                  <h4>What interests you?</h4>
                  <div className="topic-cloud">
                    <span className="topic-tag active" data-topic="technology">Technology</span>
                    <span className="topic-tag" data-topic="lifestyle">Lifestyle</span>
                    <span className="topic-tag" data-topic="business">Business</span>
                    <span className="topic-tag" data-topic="travel">Travel</span>
                    <span className="topic-tag" data-topic="health">Health</span>
                    <span className="topic-tag" data-topic="education">Education</span>
                    <span className="topic-tag" data-topic="food">Food</span>
                    <span className="topic-tag" data-topic="science">Science</span>
                  </div>
                </div>

                {/* Discovery Button */}
                <div className="discovery-action">
                  <button className="find-content-btn">
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

        <section className="content-section authors-wrapper">
          <div className="section-decorator">
            <div className="author-decoration">👥</div>
          </div>
          <PopularAuthors />
        </section>
      </article>
    </div>
  );
};

export default Home;