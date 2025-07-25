import React from 'react';

const Footer = () => {
  const handleLinkClick = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-4">
        <div className="row">
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-primary">Quick Links</h6>
            <ul className="list-unstyled small">
              {['dashboard', 'transactions', 'budgets', 'reports'].map(link => (
                <li key={link}>
                  <span role="button" className="text-light" onClick={() => handleLinkClick(link)}>
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-primary">Account</h6>
            <ul className="list-unstyled small">
              {['profile', 'security', 'notifications', 'export'].map(link => (
                <li key={link}>
                  <span role="button" className="text-light" onClick={() => handleLinkClick(link)}>
                    {link.charAt(0).toUpperCase() + link.slice(1).replace(/([A-Z])/g, ' $1')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-primary">Support</h6>
            <ul className="list-unstyled small">
              {['help', 'contact', 'privacy', 'terms'].map(link => (
                <li key={link}>
                  <span role="button" className="text-light" onClick={() => handleLinkClick(link)}>
                    {link.charAt(0).toUpperCase() + link.slice(1).replace(/([A-Z])/g, ' $1')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-primary">About</h6>
            <ul className="list-unstyled small">
              {['about', 'features', 'blog', 'updates'].map(link => (
                <li key={link}>
                  <span role="button" className="text-light" onClick={() => handleLinkClick(link)}>
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between small flex-column flex-md-row text-center text-md-start">
          <span className="mb-2 mb-md-0">&copy; 2025 FinanceTracker</span>
          <div>
            {['facebook', 'twitter', 'linkedin', 'email'].map(icon => (
              <span key={icon} role="button" className="text-light me-3" onClick={() => handleLinkClick(icon)}>
                <i className={`bi bi-${icon}`}></i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
