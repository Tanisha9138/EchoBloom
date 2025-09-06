// import React from "react";
// import { Link } from "react-router-dom";

// const LatestBlogs = ({ heading, newClass, blogs }) => {
//   return (
//     <section
//       className={
//         newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
//       }
//     >
//       <h3>{heading}</h3>
//       <div className="container">
//         {blogs &&
//           blogs.map((element) => {
//             return (
//               <Link to={`/blog/${element._id}`} className="card" key={element._id}>
//                 <img src={element.mainImage.url} alt="blog" />
//                 <span className="category">{element.category}</span>
//                 <h4>{element.title}</h4>
//                 <div className="writer_section">
//                   <div className="author">
//                     <img src={element.authorAvatar} alt="author_avatar" />
//                     <p>{element.authorName}</p>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//       </div>
//     </section>
//   );
// };

// export default LatestBlogs;



// import React from "react";
// import { Link } from "react-router-dom";

// const LatestBlogs = ({ heading, blogs }) => {
//   // Function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   // Function to calculate reading time
//   const calculateReadingTime = (content) => {
//     const wordsPerMinute = 200;
//     const words = content?.split(' ').length || 0;
//     const minutes = Math.ceil(words / wordsPerMinute);
//     return minutes > 0 ? minutes : 1;
//   };

//   // Function to generate excerpt
//   const generateExcerpt = (content, maxLength = 150) => {
//     if (!content) return "Discover amazing insights and stories that will inspire and inform you.";
//     return content.length > maxLength 
//       ? content.substring(0, maxLength).trim() + "..." 
//       : content;
//   };

//   return (
//     <div className="latest-blogs-section">
//       <div className="latest-blogs-header">
//         <h2 className="latest-blogs-title">
//           {heading || "Latest Blogs"}
//         </h2>
//         <p className="latest-blogs-subtitle">
//           Discover fresh perspectives and insights from our community
//         </p>
//       </div>

//       {blogs && blogs.length > 0 ? (
//         <>
//           <div className="blogs-grid">
//             {blogs.map((blog, index) => (
//               <article 
//                 key={blog._id || index} 
//                 className="blog-card"
//                 style={{ 
//                   animationDelay: `${index * 0.1}s`,
//                   opacity: 0,
//                   animation: 'slideInUp 0.8s ease forwards'
//                 }}
//               >
//                 <Link 
//                   to={`/blog/${blog._id}`} 
//                   className="blog-link"
//                   aria-label={`Read more about ${blog.title}`}
//                 />

//                 <div className="blog-image-container">
//                   <img 
//                     src={blog.blogImage?.url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"} 
//                     alt={blog.title || "Blog post"}
//                     className="blog-image"
//                     onError={(e) => {
//                       e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
//                     }}
//                   />
//                   <div className="blog-category-badge">
//                     {blog.category || "General"}
//                   </div>
//                   <div className="blog-reading-time">
//                     {calculateReadingTime(blog.intro)} min read
//                   </div>
//                 </div>

//                 <div className="blog-content">
//                   <h3 className="blog-title">
//                     {blog.title || "Untitled Post"}
//                   </h3>
                  
//                   <p className="blog-excerpt">
//                     {generateExcerpt(blog.intro)}
//                   </p>

//                   <div className="blog-footer">
//                     <div className="blog-author">
//                       <img 
//                         src={blog.authorAvatar?.url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"} 
//                         alt={blog.authorName || "Author"}
//                         className="author-avatar"
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80";
//                         }}
//                       />
//                       <div className="author-info">
//                         <span className="author-name">
//                           {blog.authorName || "Anonymous"}
//                         </span>
//                         <span className="blog-date">
//                           {blog.createdAt ? formatDate(blog.createdAt) : "Recently"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="blog-stats">
//                       <div className="stat-item">
//                         <span>👁️</span>
//                         <span>{blog.views || Math.floor(Math.random() * 500) + 100}</span>
//                       </div>
//                       <div className="stat-item">
//                         <span>❤️</span>
//                         <span>{blog.likes || Math.floor(Math.random() * 50) + 10}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {blogs.length >= 6 && (
//             <div className="view-all-container">
//               <Link to="/blogs" className="view-all-btn">
//                 <span>View All Blogs</span>
//                 <span>→</span>
//               </Link>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="empty-blogs-state">
//           <div className="empty-blogs-icon">📝</div>
//           <h3 className="empty-blogs-title">No Blogs Found</h3>
//           <p className="empty-blogs-text">
//             {heading && heading.includes("Search Results") 
//               ? "Try adjusting your search terms or browse our categories to find amazing content."
//               : "New stories are being crafted by our talented writers. Check back soon for fresh, inspiring content!"
//             }
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LatestBlogs;

// import React from "react";
// import { Link } from "react-router-dom";

// const LatestBlogs = ({ heading, blogs }) => {
//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Reading time
//   const calculateReadingTime = (content) => {
//     const wordsPerMinute = 200;
//     const words = content?.split(" ").length || 0;
//     const minutes = Math.ceil(words / wordsPerMinute);
//     return minutes > 0 ? minutes : 1;
//   };

//   // Excerpt
//   const generateExcerpt = (content, maxLength = 150) => {
//     if (!content) return "Discover amazing insights and stories that will inspire and inform you.";
//     return content.length > maxLength
//       ? content.substring(0, maxLength).trim() + "..."
//       : content;
//   };

//   return (
//     <div className="latest-blogs-section">
//       <div className="latest-blogs-header">
//         <h2 className="latest-blogs-title">{heading || "Latest Blogs"}</h2>
//         <p className="latest-blogs-subtitle">
//           Discover fresh perspectives and insights from our community
//         </p>
//       </div>

//       {blogs && blogs.length > 0 ? (
//         <>
//           <div className="blogs-grid">
//             {blogs.map((blog, index) => (
//               <article
//                 key={blog._id || index}
//                 className="blog-card"
//                 style={{
//                   animationDelay: `${index * 0.1}s`,
//                   opacity: 0,
//                   animation: "slideInUp 0.8s ease forwards",
//                 }}
//               >
//                 <Link
//                   to={`/blog/${blog._id}`}
//                   className="blog-link"
//                   aria-label={`Read more about ${blog.title}`}
//                 />

//                 {/* ✅ Fix: use old data field names */}
//                 <div className="blog-image-container">
//                   <img
//                     src={
//                       blog.mainImage?.url ||
//                       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
//                     }
//                     alt={blog.title || "Blog post"}
//                     className="blog-image"
//                   />
//                   <div className="blog-category-badge">
//                     {blog.category || "General"}
//                   </div>
//                   <div className="blog-reading-time">
//                     {calculateReadingTime(blog.intro || blog.content)} min read
//                   </div>
//                 </div>

//                 <div className="blog-content">
//                   <h3 className="blog-title">{blog.title || "Untitled Post"}</h3>

//                   <p className="blog-excerpt">
//                     {generateExcerpt(blog.intro || blog.content)}
//                   </p>

//                   <div className="blog-footer">
//                     <div className="blog-author">
//                       <img
//                         src={
//                           blog.authorAvatar ||
//                           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
//                         }
//                         alt={blog.authorName || "Author"}
//                         className="author-avatar"
//                       />
//                       <div className="author-info">
//                         <span className="author-name">
//                           {blog.authorName || "Anonymous"}
//                         </span>
//                         <span className="blog-date">
//                           {blog.createdAt ? formatDate(blog.createdAt) : "Recently"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="blog-stats">
//                       <div className="stat-item">
//                         <span>👁️</span>
//                         <span>{blog.views || Math.floor(Math.random() * 500) + 100}</span>
//                       </div>
//                       <div className="stat-item">
//                         <span>❤️</span>
//                         <span>{blog.likes || Math.floor(Math.random() * 50) + 10}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {blogs.length >= 6 && (
//             <div className="view-all-container">
//               <Link to="/blogs" className="view-all-btn">
//                 <span>View All Blogs</span>
//                 <span>→</span>
//               </Link>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="empty-blogs-state">
//           <div className="empty-blogs-icon">📝</div>
//           <h3 className="empty-blogs-title">No Blogs Found</h3>
//           <p className="empty-blogs-text">
//             {heading && heading.includes("Search Results")
//               ? "Try adjusting your search terms or browse our categories to find amazing content."
//               : "New stories are being crafted by our talented writers. Check back soon for fresh, inspiring content!"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LatestBlogs;



import React, { useState } from "react";
import { Link } from "react-router-dom";

const LatestBlogs = ({ heading, blogs }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(" ").length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes > 0 ? minutes : 1;
  };

  // Excerpt
  const generateExcerpt = (content, maxLength = 150) => {
    if (!content)
      return "Discover amazing insights and stories that will inspire and inform you.";
    return content.length > maxLength
      ? content.substring(0, maxLength).trim() + "..."
      : content;
  };

  // Local state for likes to allow increment on click
  const [likesState, setLikesState] = useState(
    blogs?.map((blog) => blog.likes || 0) || []
  );

  const handleLike = (index) => {
    const newLikes = [...likesState];
    newLikes[index] += 1;
    setLikesState(newLikes);
  };

  return (
    <div className="latest-blogs-section">
      <div className="latest-blogs-header">
        <h2 className="latest-blogs-title">{heading || "Latest Blogs"}</h2>
        <p className="latest-blogs-subtitle">
          Discover fresh perspectives and insights from our community
        </p>
      </div>

      {blogs && blogs.length > 0 ? (
        <>
          <div className="blogs-grid">
            {blogs.map((blog, index) => (
              <article
                key={blog._id || index}
                className="blog-card"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  animation: "slideInUp 0.8s ease forwards",
                }}
              >
                <Link
                  to={`/blog/${blog._id}`}
                  className="blog-link"
                  aria-label={`Read more about ${blog.title}`}
                />

                <div className="blog-image-container">
                  <img
                    src={
                      blog.mainImage?.url ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={blog.title || "Blog post"}
                    className="blog-image"
                  />
                  <div className="blog-category-badge">
                    {blog.category || "General"}
                  </div>
                  <div className="blog-reading-time">
                    {calculateReadingTime(blog.intro || blog.content)} min read
                  </div>
                </div>

                <div className="blog-content">
                  <h3 className="blog-title">{blog.title || "Untitled Post"}</h3>

                  <p className="blog-excerpt">
                    {generateExcerpt(blog.intro || blog.content)}
                  </p>

                  <div className="blog-footer">
                    <div className="blog-author">
                      <img
                        src={
                          blog.authorAvatar ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
                        }
                        alt={blog.authorName || "Author"}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <span className="author-name">
                          {blog.authorName || "Anonymous"}
                        </span>
                        <span className="blog-date">
                          {blog.createdAt ? formatDate(blog.createdAt) : "Recently"}
                        </span>
                      </div>
                    </div>

                    <div className="blog-stats">
                      <div className="stat-item">
                        <span>👁️</span>
                        <span>{blog.views || 0}</span>
                      </div>
                      <div
                        className="stat-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleLike(index)}
                      >
                        <span>❤️</span>
                        <span>{likesState[index]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {blogs.length >= 6 && (
            <div className="view-all-container">
              <Link to="/blogs" className="view-all-btn">
                <span>View All Blogs</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="empty-blogs-state">
          <div className="empty-blogs-icon">📝</div>
          <h3 className="empty-blogs-title">No Blogs Found</h3>
          <p className="empty-blogs-text">
            {heading && heading.includes("Search Results")
              ? "Try adjusting your search terms or browse our categories to find amazing content."
              : "New stories are being crafted by our talented writers. Check back soon for fresh, inspiring content!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
