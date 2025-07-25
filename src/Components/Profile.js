import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const API = 'https://68762a75814c0dfa653af1cb.mockapi.io/PersonalFinanceTracker';

const Profile = () => {
  // Simulated user info (could be fetched from API in real app)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currency: '₹'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setTransactions(res.data));
  }, []);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const savings = totalIncome - totalExpenses;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Save to backend here if needed
  };

  return (
    <div className="container mt-4 mb-4">
      <h3 className="mb-4">Profile</h3>

      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Default Currency</Form.Label>
            <Form.Select
              name="currency"
              value={user.currency}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="₹">₹ Rupee</option>
              <option value="$">$ Dollar</option>
              <option value="€">€ Euro</option>
              <option value="£">£ Pound</option>
              <option value="¥">¥ Yen</option>
            </Form.Select>
          </Form.Group>

          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button type="submit" variant="success">Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </Form>
      </Card>

      <div className="row mt-5">
        <div className="col-md-6">
          <Card className="text-white bg-danger text-center p-3 shadow-sm">
            <h5>Total Expenses</h5>
            <h3>{user.currency}{totalExpenses.toFixed(2)}</h3>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="text-white bg-success text-center p-3 shadow-sm">
            <h5>Total Savings</h5>
            <h3>{user.currency}{savings.toFixed(2)}</h3>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
