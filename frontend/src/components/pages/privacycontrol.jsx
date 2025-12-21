import React, { useState, useEffect } from 'react';

const PrivacyControl = () => {
  const [mode, setMode] = useState('light');
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);
  
  // Blog post states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    visibility: 'public',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showStorageDebug, setShowStorageDebug] = useState(false);
  const [storageData, setStorageData] = useState(null);
  
  // View post states
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingPost, setViewingPost] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest'); // 'admin', 'member', 'guest'

  // Check if window.storage is available, otherwise use localStorage
  const isStorageAvailable = () => {
    return typeof window !== 'undefined' && window.storage;
  };

  // Load saved plan and blog posts from storage on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (isStorageAvailable()) {
          // Use window.storage (Claude persistent storage)
          console.log('Using Claude persistent storage');
          
          // Load plan
          try {
            const planResult = await window.storage.get('user-plan');
            if (planResult && planResult.value) {
              setSelectedPlan(planResult.value);
            }
          } catch (err) {
            console.log('No saved plan found, using default');
          }

          // Load blog posts
          try {
            const postsResult = await window.storage.list('blog-post:');
            if (postsResult && postsResult.keys && postsResult.keys.length > 0) {
              const posts = [];
              for (const key of postsResult.keys) {
                try {
                  const postResult = await window.storage.get(key);
                  if (postResult && postResult.value) {
                    const post = JSON.parse(postResult.value);
                    posts.push(post);
                  }
                } catch (err) {
                  console.log('Error loading post:', key, err);
                }
              }
              // Sort by date, newest first
              posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setBlogPosts(posts);
            }
          } catch (err) {
            console.log('No blog posts found');
          }
        } else {
          // Fallback to localStorage
          console.log('Using localStorage as fallback');
          
          // Load plan from localStorage
          try {
            const savedPlan = localStorage.getItem('user-plan');
            if (savedPlan) {
              setSelectedPlan(savedPlan);
            }
          } catch (err) {
            console.log('No saved plan found');
          }

          // Load blog posts from localStorage
          try {
            const savedPosts = localStorage.getItem('blog-posts');
            if (savedPosts) {
              const posts = JSON.parse(savedPosts);
              posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setBlogPosts(posts);
            }
          } catch (err) {
            console.log('No blog posts found');
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save plan to storage
  const savePlan = async (plan) => {
    try {
      if (isStorageAvailable()) {
        await window.storage.set('user-plan', plan);
        console.log('Plan saved to Claude storage');
      } else {
        localStorage.setItem('user-plan', plan);
        console.log('Plan saved to localStorage');
      }
      return true;
    } catch (error) {
      console.error('Error saving plan:', error);
      return false;
    }
  };

  // Save blog post to storage
  const saveBlogPost = async (post) => {
    try {
      if (isStorageAvailable()) {
        const result = await window.storage.set(`blog-post:${post.id}`, JSON.stringify(post));
        console.log('Post saved to Claude storage:', result);
        return true;
      } else {
        // Save to localStorage - store all posts together
        const existingPosts = localStorage.getItem('blog-posts');
        let posts = existingPosts ? JSON.parse(existingPosts) : [];
        
        // Update or add post
        const index = posts.findIndex(p => p.id === post.id);
        if (index >= 0) {
          posts[index] = post;
        } else {
          posts.push(post);
        }
        
        localStorage.setItem('blog-posts', JSON.stringify(posts));
        console.log('Post saved to localStorage');
        return true;
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      return false;
    }
  };

  // Delete blog post from storage
  const deleteBlogPost = async (postId) => {
    try {
      if (isStorageAvailable()) {
        await window.storage.delete(`blog-post:${postId}`);
        console.log('Post deleted from Claude storage');
        return true;
      } else {
        const existingPosts = localStorage.getItem('blog-posts');
        if (existingPosts) {
          let posts = JSON.parse(existingPosts);
          posts = posts.filter(p => p.id !== postId);
          localStorage.setItem('blog-posts', JSON.stringify(posts));
          console.log('Post deleted from localStorage');
        }
        return true;
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  };

  const privacyFeatures = [
    {
      icon: '🔒',
      title: 'Private Blogs',
      description: 'Keep your content completely private and accessible only to you',
      features: ['Hidden from search engines', 'No public access', 'Complete privacy'],
      requiredPlan: 'premium'
    },
    {
      icon: '🔑',
      title: 'Password Protection',
      description: 'Protect your blogs with passwords and share with specific people',
      features: ['Custom passwords', 'Multiple passwords', 'Easy sharing'],
      requiredPlan: 'premium'
    },
    {
      icon: '👥',
      title: 'Members-Only Content',
      description: 'Create exclusive content for your subscribers and members',
      features: ['User authentication', 'Membership tiers', 'Content restrictions'],
      requiredPlan: 'business'
    },
    {
      icon: '📊',
      title: 'Analytics Privacy',
      description: 'Control what analytics data you collect and how it\'s used',
      features: ['GDPR compliant', 'Cookie consent', 'Data anonymization'],
      requiredPlan: 'free'
    },
    {
      icon: '🎯',
      title: 'Selective Sharing',
      description: 'Choose exactly who can see each blog post',
      features: ['Individual permissions', 'Group sharing', 'Link-based access'],
      requiredPlan: 'premium'
    },
    {
      icon: '🛡️',
      title: 'Data Protection',
      description: 'Enterprise-grade security for your content and user data',
      features: ['End-to-end encryption', 'Secure backups', 'DDoS protection'],
      requiredPlan: 'business'
    }
  ];

  const membershipPlans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: [
        'Public blogs',
        'Basic privacy settings',
        'Standard security',
        'Community support'
      ],
      color: '#667eea',
      popular: false,
      planKey: 'free'
    },
    {
      name: 'Premium',
      price: '₹1',
      period: '/month',
      features: [
        'Everything in Free',
        'Private blogs',
        'Password protection',
        'Custom domains',
        'Priority support',
        'Advanced analytics'
      ],
      color: '#4ecdc4',
      popular: true,
      planKey: 'premium'
    },
    {
      name: 'Business',
      price: '₹2',
      period: '/month',
      features: [
        'Everything in Premium',
        'Members-only content',
        'Unlimited private blogs',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Dedicated support'
      ],
      color: '#f093fb',
      popular: false,
      planKey: 'business'
    }
  ];

  const visibilityOptions = [
    {
      id: 'public',
      icon: '🌐',
      title: 'Public',
      description: 'Anyone can view and search engines can index',
      requiredPlan: 'free'
    },
    {
      id: 'private',
      icon: '🔒',
      title: 'Private',
      description: 'Only you can see this content',
      requiredPlan: 'premium'
    },
    {
      id: 'passwordProtected',
      icon: '🔑',
      title: 'Password Protected',
      description: 'Requires a password to view',
      requiredPlan: 'premium'
    },
    {
      id: 'membersOnly',
      icon: '👥',
      title: 'Members Only',
      description: 'Only registered members can view',
      requiredPlan: 'business'
    }
  ];

  const complianceFeatures = [
    { icon: '✓', text: 'GDPR Compliant' },
    { icon: '✓', text: 'CCPA Compliant' },
    { icon: '✓', text: 'SOC 2 Certified' },
    { icon: '✓', text: 'ISO 27001 Certified' },
    { icon: '✓', text: 'HIPAA Compliant' },
    { icon: '✓', text: '2FA Authentication' }
  ];

  const getPlanLevel = (plan) => {
    const levels = { free: 0, premium: 1, business: 2 };
    return levels[plan] || 0;
  };

  const canAccessFeature = (requiredPlan) => {
    return getPlanLevel(selectedPlan) >= getPlanLevel(requiredPlan);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlanSelection = async (plan) => {
    if (plan.planKey === 'free') {
      setSelectedPlan('free');
      await savePlan('free');
      alert('✓ Switched to Free plan');
      return;
    }

    if (plan.planKey === selectedPlan) {
      alert('✓ You are already on this plan');
      return;
    }

    setPendingPlan(plan);
    setShowPaymentModal(true);
  };

  const initiatePayment = async () => {
    setShowPaymentModal(false);
    
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const amount = pendingPlan.planKey === 'premium' ? 1 : 2;

    const options = {
      key: 'rzp_test_R5AG4O69rKotnN',
      amount: amount * 100,
      currency: 'INR',
      name: 'Blog Platform',
      description: `${pendingPlan.name} Plan Subscription`,
      image: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      handler: async function (response) {
        setSelectedPlan(pendingPlan.planKey);
        await savePlan(pendingPlan.planKey);
        alert(`🎉 Successfully upgraded to ${pendingPlan.name} plan!\n\nPayment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#667eea'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Blog post functions
  const handleCreateNewPost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      visibility: 'public',
      password: ''
    });
    setFormErrors({});
    setShowCreateModal(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      visibility: post.visibility,
      password: post.password || ''
    });
    setFormErrors({});
    setShowCreateModal(true);
  };

  const handleDeletePost = async (post) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    const success = await deleteBlogPost(post.id);
    if (success) {
      setBlogPosts(blogPosts.filter(p => p.id !== post.id));
      alert('✓ Blog post deleted successfully!');
    } else {
      alert('❌ Failed to delete blog post. Please try again.');
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }

    const requiredPlan = visibilityOptions.find(v => v.id === formData.visibility)?.requiredPlan;
    if (!canAccessFeature(requiredPlan)) {
      errors.visibility = `This visibility option requires ${requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan. Please upgrade your plan first.`;
    }

    if (formData.visibility === 'passwordProtected' && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSavePost = async () => {
    console.log('Attempting to save post...');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    const post = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      title: formData.title.trim(),
      content: formData.content.trim(),
      visibility: formData.visibility,
      password: formData.visibility === 'passwordProtected' ? formData.password : '',
      createdAt: editingPost ? editingPost.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Saving post:', post);

    const success = await saveBlogPost(post);
    
    if (success) {
      if (editingPost) {
        setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p));
        alert('✓ Blog post updated successfully!');
      } else {
        setBlogPosts([post, ...blogPosts]);
        alert('✓ Blog post created successfully!');
      }
      setShowCreateModal(false);
      setFormData({
        title: '',
        content: '',
        visibility: 'public',
        password: ''
      });
    } else {
      alert('❌ Failed to save blog post. Please try again.');
    }
  };

  const getVisibilityIcon = (visibility) => {
    const option = visibilityOptions.find(v => v.id === visibility);
    return option ? option.icon : '🌐';
  };

  const getVisibilityLabel = (visibility) => {
    const option = visibilityOptions.find(v => v.id === visibility);
    return option ? option.title : 'Public';
  };

  // Debug: View Storage Data
  const viewStorageData = async () => {
    try {
      const data = {
        storageType: isStorageAvailable() ? 'Claude Persistent Storage' : 'Browser localStorage',
        plan: null,
        posts: [],
        allKeys: []
      };

      if (isStorageAvailable()) {
        // Get current plan
        try {
          const planResult = await window.storage.get('user-plan');
          data.plan = planResult ? planResult.value : 'Not set (using default: free)';
        } catch (err) {
          data.plan = 'Error loading plan';
        }

        // List all blog post keys
        try {
          const postsResult = await window.storage.list('blog-post:');
          if (postsResult && postsResult.keys) {
            data.allKeys = postsResult.keys;
            
            // Get each post's data
            for (const key of postsResult.keys) {
              try {
                const postResult = await window.storage.get(key);
                if (postResult && postResult.value) {
                  data.posts.push({
                    key: key,
                    data: JSON.parse(postResult.value)
                  });
                }
              } catch (err) {
                data.posts.push({
                  key: key,
                  error: 'Failed to load'
                });
              }
            }
          }
        } catch (err) {
          data.postsError = 'Error listing posts';
        }
      } else {
        // Use localStorage
        try {
          const savedPlan = localStorage.getItem('user-plan');
          data.plan = savedPlan || 'Not set (using default: free)';
        } catch (err) {
          data.plan = 'Error loading plan';
        }

        try {
          const savedPosts = localStorage.getItem('blog-posts');
          if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            data.allKeys = posts.map(p => `blog-post:${p.id}`);
            data.posts = posts.map(p => ({
              key: `blog-post:${p.id}`,
              data: p
            }));
          }
        } catch (err) {
          data.postsError = 'Error loading posts';
        }
      }

      setStorageData(data);
      setShowStorageDebug(true);
    } catch (error) {
      console.error('Error viewing storage:', error);
      alert('Error accessing storage data');
    }
  };

  // Export data as JSON file
  const exportData = () => {
    const dataToExport = {
      plan: selectedPlan,
      posts: blogPosts,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-posts-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✓ Data exported successfully!');
  };

  // View post with authentication
  const handleViewPost = (post) => {
    setViewingPost(post);
    setPasswordInput('');
    setPasswordError('');
    
    // Check if post can be viewed based on visibility
    if (post.visibility === 'public') {
      setIsAuthenticated(true);
      setShowViewModal(true);
    } else if (post.visibility === 'private') {
      // Private posts require admin access
      if (userRole === 'admin') {
        setIsAuthenticated(true);
        setShowViewModal(true);
      } else {
        setIsAuthenticated(false);
        setShowViewModal(true);
      }
    } else if (post.visibility === 'passwordProtected') {
      // Password protected posts need password verification
      setIsAuthenticated(false);
      setShowViewModal(true);
    } else if (post.visibility === 'membersOnly') {
      // Members only posts require member or admin access
      if (userRole === 'admin' || userRole === 'member') {
        setIsAuthenticated(true);
        setShowViewModal(true);
      } else {
        setIsAuthenticated(false);
        setShowViewModal(true);
      }
    }
  };

  // Verify password for password-protected posts
  const verifyPassword = () => {
    if (!viewingPost) return;
    
    if (viewingPost.visibility === 'passwordProtected') {
      if (passwordInput === viewingPost.password) {
        setIsAuthenticated(true);
        setPasswordError('');
      } else {
        setPasswordError('❌ Incorrect password. Please try again.');
      }
    }
  };

  // Login as admin or member
  const handleLogin = (role) => {
    setUserRole(role);
    alert(`✓ Logged in as ${role.toUpperCase()}`);
  };

  // Logout
  const handleLogout = () => {
    setUserRole('guest');
    alert('✓ Logged out successfully');
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: mode === 'dark' ? '#1a1a2e' : '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ fontSize: '1.2rem', color: mode === 'dark' ? '#ffffff' : '#2c3e50' }}>
            Loading your data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: mode === 'dark' ? '#1a1a2e' : '#ffffff',
      color: mode === 'dark' ? '#ffffff' : '#2c3e50'
    }}>
      {/* Current Plan Badge */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '10px 20px',
        background: mode === 'dark' ? '#34495e' : '#f8f9fa',
        borderRadius: '25px',
        fontWeight: '600',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        Current Plan: <span style={{
          color: selectedPlan === 'business' ? '#f093fb' : selectedPlan === 'premium' ? '#4ecdc4' : '#667eea'
        }}>
          {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
        </span>
      </div>

      {/* Storage Debug Button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button
          onClick={viewStorageData}
          style={{
            padding: '10px 15px',
            background: mode === 'dark' ? '#34495e' : '#f8f9fa',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            color: mode === 'dark' ? '#ffffff' : '#2c3e50'
          }}
        >
          🔍 View Storage
        </button>
        <button
          onClick={exportData}
          style={{
            padding: '10px 15px',
            background: mode === 'dark' ? '#34495e' : '#f8f9fa',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            color: mode === 'dark' ? '#ffffff' : '#2c3e50'
          }}
        >
          💾 Export Data
        </button>
      </div>

      {/* Hero Section */}
      <section style={{
        padding: '8rem 0 4rem',
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1.5rem' }}>
            🛡️ Privacy & Control
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
            Complete control over your content visibility with premium membership options and private blogs
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              fontWeight: '600'
            }}>🔒 Private Blogs</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              fontWeight: '600'
            }}>🔑 Password Protected</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              fontWeight: '600'
            }}>👥 Members Only</span>
          </div>
        </div>
      </section>

      {/* My Blog Posts Section */}
      <section style={{
        padding: '4rem 0',
        background: mode === 'dark' ? '#1a1a2e' : '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                My Blog Posts
              </h2>
              <p style={{ fontSize: '1.1rem', color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
                {blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'} created
              </p>
            </div>
            <button
              onClick={handleCreateNewPost}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 5px 20px rgba(102, 126, 234, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ✏️ Create New Post
            </button>
          </div>

          {blogPosts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: mode === 'dark' ? '#2c3e50' : '#f8f9fa',
              borderRadius: '20px',
              border: `2px dashed ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No blog posts yet</h3>
              <p style={{ color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d', marginBottom: '1.5rem' }}>
                Create your first blog post with custom privacy settings
              </p>
              <button
                onClick={handleCreateNewPost}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {blogPosts.map((post) => (
                <div key={post.id} style={{
                  background: mode === 'dark' 
                    ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: mode === 'dark' 
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      marginBottom: '0.5rem',
                      flex: 1,
                      wordBreak: 'break-word'
                    }}>{post.title}</h3>
                    <span style={{
                      fontSize: '1.5rem',
                      marginLeft: '0.5rem'
                    }}>{getVisibilityIcon(post.visibility)}</span>
                  </div>
                  
                  <p style={{
                    color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {post.content}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                    fontSize: '0.85rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      background: post.visibility === 'public' ? 'rgba(78, 205, 196, 0.2)' :
                                 post.visibility === 'private' ? 'rgba(255, 107, 107, 0.2)' :
                                 post.visibility === 'passwordProtected' ? 'rgba(240, 147, 251, 0.2)' :
                                 'rgba(102, 126, 234, 0.2)',
                      color: post.visibility === 'public' ? '#4ecdc4' :
                            post.visibility === 'private' ? '#ff6b6b' :
                            post.visibility === 'passwordProtected' ? '#f093fb' :
                            '#667eea'
                    }}>
                      {getVisibilityLabel(post.visibility)}
                    </span>
                    <span style={{
                      color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d'
                    }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => handleViewPost(post)}
                      style={{
                        flex: 1,
                        padding: '0.7rem',
                        background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => handleEditPost(post)}
                      style={{
                        flex: 1,
                        padding: '0.7rem',
                        background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post)}
                      style={{
                        flex: 1,
                        padding: '0.7rem',
                        background: mode === 'dark' ? '#e74c3c' : '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Privacy Features */}
      <section style={{
        padding: '4rem 0',
        background: mode === 'dark' ? '#2c3e50' : '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Advanced Privacy Features
            </h2>
            <p style={{ fontSize: '1.1rem', color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
              Control every aspect of your content visibility and security
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {privacyFeatures.map((feature, index) => {
              const isLocked = !canAccessFeature(feature.requiredPlan);
              return (
                <div key={index} style={{
                  padding: '2.5rem',
                  background: mode === 'dark' 
                    ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  borderRadius: '20px',
                  boxShadow: mode === 'dark' 
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  opacity: isLocked ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }}>
                  {isLocked && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ff6b6b',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      🔒 {feature.requiredPlan.charAt(0).toUpperCase() + feature.requiredPlan.slice(1)} Required
                    </div>
                  )}
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{feature.title}</h3>
                  <p style={{
                    color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>{feature.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {feature.features.map((item, idx) => (
                      <li key={idx} style={{
                        color: mode === 'dark' ? '#4ecdc4' : '#667eea',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem'
                      }}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section style={{
        padding: '4rem 0',
        background: mode === 'dark' ? '#1a1a2e' : '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Membership Plans
            </h2>
            <p style={{ fontSize: '1.1rem', color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
              Choose the plan that fits your privacy needs
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {membershipPlans.map((plan, index) => (
              <div key={index} style={{
                position: 'relative',
                padding: '2.5rem',
                background: mode === 'dark' 
                  ? 'linear-gradient(145deg, #34495e 0%, #2c3e50 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                borderRadius: '20px',
                boxShadow: mode === 'dark' 
                  ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                  : '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: plan.popular ? `3px solid ${plan.color}` : 'none',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.color,
                    color: 'white',
                    padding: '5px 20px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700'
                  }}>
                    ⭐ MOST POPULAR
                  </div>
                )}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: plan.color
                }}>{plan.name}</h3>
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '900' }}>{plan.price}</span>
                  <span style={{ fontSize: '1rem', color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
                    {plan.period}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} style={{
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: plan.color, fontSize: '1.2rem' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={selectedPlan === plan.planKey}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: selectedPlan === plan.planKey 
                      ? mode === 'dark' ? '#546e7a' : '#e0e0e0'
                      : `linear-gradient(45deg, ${plan.color}, ${plan.color}dd)`,
                    color: selectedPlan === plan.planKey 
                      ? mode === 'dark' ? '#bdc3c7' : '#5a6c7d'
                      : 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: selectedPlan === plan.planKey ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {selectedPlan === plan.planKey ? '✓ Current Plan' : `Choose ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section style={{
        padding: '4rem 0',
        background: mode === 'dark' ? '#2c3e50' : '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Security & Compliance
            </h2>
            <p style={{ fontSize: '1.1rem', color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
              Enterprise-grade security standards and certifications
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {complianceFeatures.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: mode === 'dark' ? '#34495e' : '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{
                  fontSize: '2rem',
                  color: '#4ecdc4'
                }}>{item.icon}</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create/Edit Blog Post Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          overflowY: 'auto'
        }} onClick={() => setShowCreateModal(false)}>
          <div style={{
            background: mode === 'dark' ? '#2c3e50' : '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: '700' }}>
              {editingPost ? '✏️ Edit Blog Post' : '✨ Create New Blog Post'}
            </h2>

            {/* Title Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter your blog title..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: formErrors.title 
                    ? '2px solid #ff6b6b' 
                    : `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                  background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                  color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
              {formErrors.title && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {formErrors.title}
                </p>
              )}
            </div>

            {/* Content Textarea */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here..."
                rows={8}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: formErrors.content 
                    ? '2px solid #ff6b6b' 
                    : `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                  background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                  color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
              {formErrors.content && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {formErrors.content}
                </p>
              )}
            </div>

            {/* Visibility Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '1rem',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Visibility *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {visibilityOptions.map((option) => {
                  const isLocked = !canAccessFeature(option.requiredPlan);
                  const isSelected = formData.visibility === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => {
                        if (!isLocked) {
                          setFormData({ ...formData, visibility: option.id });
                          // Clear visibility error when user selects a valid option
                          if (formErrors.visibility) {
                            setFormErrors({ ...formErrors, visibility: '' });
                          }
                        }
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: isSelected 
                          ? '2px solid #667eea' 
                          : `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                        background: isSelected 
                          ? mode === 'dark' ? '#34495e' : '#f0f4ff'
                          : mode === 'dark' ? '#2c3e50' : '#ffffff',
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                        opacity: isLocked ? 0.5 : 1,
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isLocked && (
                        <div style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          fontSize: '0.8rem'
                        }}>🔒</div>
                      )}
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {option.icon}
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                        {option.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                        marginTop: '0.3rem'
                      }}>
                        {option.description}
                      </div>
                    </div>
                  );
                })}
              </div>
              {formErrors.visibility && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {formErrors.visibility}
                </p>
              )}
            </div>

            {/* Password Field (conditional) */}
            {formData.visibility === 'passwordProtected' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password (min 6 characters)..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: formErrors.password 
                      ? '2px solid #ff6b6b' 
                      : `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                    background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                    color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
                {formErrors.password && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    {formErrors.password}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                  color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {editingPost ? '💾 Update Post' : '✨ Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && pendingPlan && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }} onClick={() => setShowPaymentModal(false)}>
          <div style={{
            background: mode === 'dark' ? '#2c3e50' : '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Confirm Upgrade
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
              marginBottom: '2rem'
            }}>
              You are upgrading to <strong style={{ color: pendingPlan.color }}>
                {pendingPlan.name}
              </strong> plan for <strong>{pendingPlan.price}</strong>{pendingPlan.period}
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                  color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={initiatePayment}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: `linear-gradient(45deg, ${pendingPlan.color}, ${pendingPlan.color}dd)`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Post Modal */}
      {showViewModal && viewingPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          overflowY: 'auto'
        }} onClick={() => setShowViewModal(false)}>
          <div style={{
            background: mode === 'dark' ? '#2c3e50' : '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Check if authenticated to view */}
            {!isAuthenticated ? (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
                  🔒 Access Restricted
                </h2>

                {viewingPost.visibility === 'passwordProtected' && (
                  <div>
                    <p style={{ 
                      textAlign: 'center', 
                      marginBottom: '2rem',
                      color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                      fontSize: '1.1rem'
                    }}>
                      This post is password protected. Please enter the password to view.
                    </p>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }}>
                        Password
                      </label>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && verifyPassword()}
                        placeholder="Enter password..."
                        style={{
                          width: '100%',
                          padding: '1rem',
                          borderRadius: '12px',
                          border: passwordError 
                            ? '2px solid #ff6b6b' 
                            : `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`,
                          background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                          color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                          fontSize: '1rem',
                          boxSizing: 'border-box'
                        }}
                      />
                      {passwordError && (
                        <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => setShowViewModal(false)}
                        style={{
                          flex: 1,
                          padding: '1rem',
                          background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                          color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={verifyPassword}
                        style={{
                          flex: 1,
                          padding: '1rem',
                          background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        🔓 Unlock
                      </button>
                    </div>
                  </div>
                )}

                {viewingPost.visibility === 'private' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
                    <p style={{ 
                      marginBottom: '1.5rem',
                      color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                      fontSize: '1.1rem'
                    }}>
                      This post is private and can only be viewed by the admin.
                    </p>
                    <p style={{ 
                      marginBottom: '2rem',
                      color: '#ff6b6b',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      You need to be logged in as an Admin to view this content.
                    </p>
                    <button
                      onClick={() => setShowViewModal(false)}
                      style={{
                        padding: '1rem 2rem',
                        background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                        color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}

                {viewingPost.visibility === 'membersOnly' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
                    <p style={{ 
                      marginBottom: '1.5rem',
                      color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                      fontSize: '1.1rem'
                    }}>
                      This post is members-only and requires authentication.
                    </p>
                    <p style={{ 
                      marginBottom: '2rem',
                      color: '#ff6b6b',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      You need to be logged in as a Member or Admin to view this content.
                    </p>
                    <button
                      onClick={() => setShowViewModal(false)}
                      style={{
                        padding: '1rem 2rem',
                        background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                        color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Show full post content
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: '700', flex: 1 }}>
                    {viewingPost.title}
                  </h2>
                  <span style={{ fontSize: '2rem', marginLeft: '1rem' }}>
                    {getVisibilityIcon(viewingPost.visibility)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    background: viewingPost.visibility === 'public' ? 'rgba(78, 205, 196, 0.2)' :
                               viewingPost.visibility === 'private' ? 'rgba(255, 107, 107, 0.2)' :
                               viewingPost.visibility === 'passwordProtected' ? 'rgba(240, 147, 251, 0.2)' :
                               'rgba(102, 126, 234, 0.2)',
                    color: viewingPost.visibility === 'public' ? '#4ecdc4' :
                          viewingPost.visibility === 'private' ? '#ff6b6b' :
                          viewingPost.visibility === 'passwordProtected' ? '#f093fb' :
                          '#667eea'
                  }}>
                    {getVisibilityLabel(viewingPost.visibility)}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                    color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d'
                  }}>
                    📅 {new Date(viewingPost.createdAt).toLocaleString()}
                  </span>
                </div>

                <div style={{
                  padding: '2rem',
                  background: mode === 'dark' ? '#34495e' : '#f8f9fa',
                  borderRadius: '15px',
                  marginBottom: '2rem',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {viewingPost.content}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => handleEditPost(viewingPost)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✏️ Edit Post
                  </button>
                  <button
                    onClick={() => setShowViewModal(false)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: mode === 'dark' ? '#546e7a' : '#e0e0e0',
                      color: mode === 'dark' ? '#ffffff' : '#2c3e50',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Storage Debug Modal */}
      {showStorageDebug && storageData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          overflowY: 'auto'
        }} onClick={() => setShowStorageDebug(false)}>
          <div style={{
            background: mode === 'dark' ? '#2c3e50' : '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: '700' }}>
              🔍 Storage Debug Information
            </h2>

            {/* Current Plan */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: mode === 'dark' ? '#34495e' : '#f8f9fa',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#667eea' }}>
                📊 Current Plan
              </h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                {storageData.plan}
              </p>
            </div>

            {/* Storage Keys */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: mode === 'dark' ? '#34495e' : '#f8f9fa',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#4ecdc4' }}>
                🔑 Storage Keys ({storageData.allKeys.length})
              </h3>
              {storageData.allKeys.length === 0 ? (
                <p style={{ color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
                  No blog posts saved yet
                </p>
              ) : (
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {storageData.allKeys.map((key, idx) => (
                    <li key={idx} style={{
                      padding: '0.5rem',
                      marginBottom: '0.5rem',
                      background: mode === 'dark' ? '#2c3e50' : '#ffffff',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}>
                      {key}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Saved Posts Data */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: mode === 'dark' ? '#34495e' : '#f8f9fa',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#f093fb' }}>
                📝 Saved Posts Data
              </h3>
              {storageData.posts.length === 0 ? (
                <p style={{ color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d' }}>
                  No posts found
                </p>
              ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {storageData.posts.map((post, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      marginBottom: '1rem',
                      background: mode === 'dark' ? '#2c3e50' : '#ffffff',
                      borderRadius: '8px',
                      border: `1px solid ${mode === 'dark' ? '#546e7a' : '#e0e0e0'}`
                    }}>
                      {post.error ? (
                        <p style={{ color: '#ff6b6b' }}>Error: {post.error}</p>
                      ) : (
                        <>
                          <p style={{ 
                            fontSize: '0.85rem', 
                            color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                            marginBottom: '0.5rem',
                            fontFamily: 'monospace'
                          }}>
                            Key: {post.key}
                          </p>
                          <pre style={{
                            background: mode === 'dark' ? '#1a1a2e' : '#f8f9fa',
                            padding: '1rem',
                            borderRadius: '8px',
                            overflow: 'auto',
                            fontSize: '0.85rem',
                            maxHeight: '200px'
                          }}>
                            {JSON.stringify(post.data, null, 2)}
                          </pre>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Storage Info */}
            <div style={{
              padding: '1.5rem',
              background: mode === 'dark' ? '#34495e' : '#f8f9fa',
              borderRadius: '12px',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#667eea' }}>
                ℹ️ Storage Information
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                color: mode === 'dark' ? '#bdc3c7' : '#5a6c7d',
                fontSize: '0.95rem',
                lineHeight: '1.8'
              }}>
                <li>• <strong>Storage Type:</strong> {storageData.storageType}</li>
                <li>• <strong>Location:</strong> {isStorageAvailable() ? 'Claude Cloud Storage' : 'Browser Local Storage'}</li>
                <li>• <strong>API:</strong> {isStorageAvailable() ? 'window.storage (Claude Artifacts)' : 'localStorage (Browser)'}</li>
                <li>• <strong>Persistence:</strong> {isStorageAvailable() ? 'Cloud-based, permanent' : 'Browser-based, clears on cache clear'}</li>
                <li>• <strong>Scope:</strong> {isStorageAvailable() ? 'Personal (not shared)' : 'This browser only'}</li>
                <li>• <strong>Limits:</strong> {isStorageAvailable() ? '5MB per key, 200 char key' : '5-10MB total (browser dependent)'}</li>
              </ul>
            </div>

            <button
              onClick={() => setShowStorageDebug(false)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(45deg, #667eea, #4ecdc4)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControl;