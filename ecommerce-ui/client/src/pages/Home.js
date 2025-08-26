import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Product Catalog",
      description: "Browse through our extensive collection with advanced search and filtering capabilities.",
      icon: "🛍️",
      link: "/products",
      category: "Discovery"
    },
    {
      title: "Order Management",
      description: "Track your orders in real-time from placement to delivery with complete transparency.",
      icon: "📦",
      link: "/orders",
      category: "Orders"
    },
    {
      title: "Inventory Control",
      description: "Real-time stock monitoring and automated alerts for seamless business operations.",
      icon: "📊",
      link: "/inventory",
      category: "Management"
    },
    {
      title: "Smart Shipping",
      description: "AI-powered logistics with multiple delivery options and cost optimization.",
      icon: "🚚",
      link: "/shipping",
      category: "Logistics"
    },
    {
      title: "User Profiles",
      description: "Personalized experiences with preferences, history, and account management.",
      icon: "👤",
      link: "/profile",
      category: "Account"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer assistance with live chat and priority support.",
      icon: "💬",
      link: "/contact",
      category: "Support"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "50M+", label: "Orders Processed" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="netflix-container">
      {/* Navigation */}
      <nav className={`netflix-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-brand">
            <div className="brand-icon">E</div>
            <span className="brand-text">E-STORE</span>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu desktop-only">
            <Link to="/" className="nav-item active">Home</Link>
            <Link to="/products" className="nav-item">Products</Link>
            <Link to="/orders" className="nav-item">Orders</Link>
            <Link to="/inventory" className="nav-item">Inventory</Link>
            <Link to="/shipping" className="nav-item">Shipping</Link>
            <Link to="/profile" className="nav-item">Profile</Link>
          </div>

          {/* Right Side */}
          <div className="nav-right">
            <button className="search-btn">🔍</button>
            <button className="notifications-btn">🔔</button>
            <div className="profile-avatar">A</div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-nav-item">Home</Link>
          <Link to="/products" className="mobile-nav-item">Products</Link>
          <Link to="/orders" className="mobile-nav-item">Orders</Link>
          <Link to="/inventory" className="mobile-nav-item">Inventory</Link>
          <Link to="/shipping" className="mobile-nav-item">Shipping</Link>
          <Link to="/profile" className="mobile-nav-item">Profile</Link>
          <Link to="/contact" className="mobile-nav-item">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">⚡</span>
            <span>New Platform Launch</span>
          </div>
          
          <h1 className="hero-title">
            The Future of
            <br />
            <span className="gradient-text">E-Commerce</span>
          </h1>
          
          <p className="hero-subtitle">
            Experience seamless shopping with AI-powered recommendations, 
            real-time inventory, and lightning-fast delivery. Built for the modern consumer.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary">
              <span>Start Shopping</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span>
              <span>Watch Demo</span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Platform Features</div>
            <h2 className="section-title">Everything you need to succeed</h2>
            <p className="section-subtitle">
              Our comprehensive platform provides all the tools and services 
              required to build and scale your e-commerce business.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{'--delay': `${index * 0.1}s`}}>
                <div className="card-content">
                  <div className="card-header">
                    <div className="card-icon">{service.icon}</div>
                    <div className="card-category">{service.category}</div>
                  </div>
                  
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                  
                  <Link to={service.link} className="card-link">
                    <span>Learn More</span>
                    <span className="link-arrow">→</span>
                  </Link>
                </div>
                
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to transform your business?</h2>
            <p className="cta-subtitle">
              Join thousands of successful businesses already using our platform to grow their revenue.
            </p>
            
            <div className="cta-buttons">
              <button className="btn-primary large">
                Get Started Free
              </button>
              <button className="btn-outline">
                Schedule Demo
              </button>
            </div>
            
            <div className="cta-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>No setup fees</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Cancel anytime</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="netflix-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="brand-icon">E</div>
              <span>E-STORE</span>
            </div>
            <p className="footer-tagline">The future of e-commerce, today.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <Link to="/products">Products</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/inventory">Inventory</Link>
              <Link to="/shipping">Shipping</Link>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/status">Status</Link>
              <Link to="/docs">Documentation</Link>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press</Link>
              <Link to="/partners">Partners</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-container">
            <p>&copy; 2024 E-Store. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;