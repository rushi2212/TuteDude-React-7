import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center gap-2">
          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
            <i className="bi bi-wallet2 text-primary fs-6"></i>
          </div>
          <span className="fw-semibold text-white">FinanceTracker</span>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to='/' className={`nav-link ${activeTab === 'dashboard' ? 'text-white' : 'text-white-50'}`} onClick={() => setActiveTab('dashboard')}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/transaction' className={`nav-link ${activeTab === 'transactions' ? 'text-white' : 'text-white-50'}`} onClick={() => setActiveTab('transactions')}>
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/budget' className={`nav-link ${activeTab === 'budgets' ? 'text-white' : 'text-white-50'}`} onClick={() => setActiveTab('budgets')}>
                Budgets
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/profile' className={`nav-link ${activeTab === 'profile' ? 'text-white' : 'text-white-50'}`} onClick={() => setActiveTab('profile')}>
                Profile
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="text-white me-3 small">Rushikesh Raut</div>
            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
              <span className="text-primary fw-bold">RR</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
