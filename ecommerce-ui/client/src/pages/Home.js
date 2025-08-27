import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const microservices = [
    {
      title: "Product Catalog",
      description: "Discover our premium collection of products with advanced filtering and search capabilities.",
      icon: "🛍️",
      link: "/products",
      color: "blue-purple"
    },
    {
      title: "Order Management",
      description: "Seamlessly place orders and track their progress with real-time updates.",
      icon: "📦",
      link: "/orders",
      color: "green-teal"
    },
    {
      title: "Inventory Management",
      description: "Monitor stock levels and product availability across all categories.",
      icon: "📊",
      link: "/inventory",
      color: "orange-red"
    },
    {
      title: "Shipping Services",
      description: "Explore flexible shipping options designed for your convenience.",
      icon: "🚚",
      link: "/shipping",
      color: "cyan-blue"
    },
    {
      title: "Profile Management",
      description: "Personalize your experience and manage your account settings.",
      icon: "👤",
      link: "/profile",
      color: "purple-pink"
    },
    {
      title: "Customer Support",
      description: "Connect with our dedicated support team for assistance and inquiries.",
      icon: "💬",
      link: "/contact",
      color: "indigo-purple"
    }
  ];

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-header">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">
                <span>🛍️</span>
              </div>
              <span className="logo-text">E-Store</span>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/inventory" className="nav-link">Inventory</Link>
              <Link to="/shipping" className="nav-link">Shipping</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <span>✕</span> : <span>☰</span>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              <Link to="/products" className="mobile-nav-link">Products</Link>
              <Link to="/orders" className="mobile-nav-link">Orders</Link>
              <Link to="/inventory" className="mobile-nav-link">Inventory</Link>
              <Link to="/shipping" className="mobile-nav-link">Shipping</Link>
              <Link to="/profile" className="mobile-nav-link">Profile</Link>
              <Link to="/contact" className="mobile-nav-link">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="star-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
              <span className="rating-text">Trusted by 10,000+ customers</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line1">Welcome to</span>
              <span className="title-line2">E-Store Pro</span>
            </h1>
            <p className="hero-description">
              Experience the future of e-commerce with our comprehensive platform. 
              Manage everything from products to customer relationships in one place.
            </p>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary">
              <span>Get Started</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-section">
        <div className="services-content">
          <div className="services-header">
            <h2 className="services-title">Powerful Features</h2>
            <p className="services-description">
              Discover our comprehensive suite of microservices designed to streamline your business operations
            </p>
          </div>

          <div className="services-grid">
            {microservices.map((service, index) => (
              <div key={index} className={`service-card ${service.color}`}>
                <div className="service-overlay"></div>
                
                {/* Icon */}
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
                
                {/* Content */}
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <Link to={service.link} className="service-link">
                    <span>Explore</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="footer-cta">
        <div className="cta-content">
          <h3 className="cta-title">Ready to get started?</h3>
          <p className="cta-description">
            Join thousands of businesses already using our platform to grow their operations.
          </p>
          <button className="cta-button">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;