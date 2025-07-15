import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProgressBar, Alert, Button, Form } from 'react-bootstrap';

const API = 'https://68762a75814c0dfa653af1cb.mockapi.io/PersonalFinanceTracker';

const Budget = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setTransactions(res.data));
  }, []);

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!category || !limit) return;
    setBudgets(prev => ({ ...prev, [category]: parseFloat(limit) }));
    setCategory('');
    setLimit('');
  };

  const categorySpent = {};
  transactions.filter(t => t.type === 'Expense').forEach(t => {
    categorySpent[t.category] = (categorySpent[t.category] || 0) + parseFloat(t.amount);
  });

  const categories = Object.keys(budgets);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Set Your Budgets</h4>
      <Form className="row g-2 mb-4" onSubmit={handleAddBudget}>
        <div className="col-md-4">
          <Form.Control
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <Form.Control
            type="number"
            placeholder="Limit ₹"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <Button type="submit" className="w-100">Add</Button>
        </div>
      </Form>

      {categories.length === 0 ? (
        <p className="text-muted">No budgets added.</p>
      ) : (
        categories.map(cat => {
          const spent = categorySpent[cat] || 0;
          const budget = budgets[cat];
          const percentage = Math.min((spent / budget) * 100, 100).toFixed(1);
          const isOver = spent > budget;

          return (
            <div key={cat} className="mb-4">
              <div className="fw-semibold mb-1">{cat} - ₹{spent.toFixed(2)} / ₹{budget.toFixed(2)}</div>
              <ProgressBar
                now={percentage}
                label={`${percentage}%`}
                variant={isOver ? 'danger' : percentage > 80 ? 'warning' : 'success'}
              />
              {isOver && (
                <Alert variant="danger" className="mt-2">Overspent on {cat}</Alert>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Budget;
