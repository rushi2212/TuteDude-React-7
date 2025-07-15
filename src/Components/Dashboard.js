import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const API_URL = 'https://68762a75814c0dfa653af1cb.mockapi.io/PersonalFinanceTracker';
const COLORS = ['#007bff', '#dc3545', '#ffc107', '#28a745', '#6610f2'];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setTransactions(res.data));
  }, []);

  useEffect(() => {
    if (dateFilter === '') {
      setFiltered(transactions);
    } else {
      const selected = new Date(dateFilter).toISOString().split('T')[0];
      setFiltered(transactions.filter(t => t.date === selected));
    }
  }, [dateFilter, transactions]);

  const totalIncome = filtered.filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = filtered.filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const savings = totalIncome * 0.2;
  const remaining = totalIncome - totalExpenses;

  const monthlySpending = {};
  filtered.forEach(t => {
    const month = t.date?.slice(0, 7);
    if (t.type === 'Expense') {
      monthlySpending[month] = (monthlySpending[month] || 0) + parseFloat(t.amount);
    }
  });

  const barData = Object.entries(monthlySpending).map(([month, value]) => ({ month, value }));

  const categoryMap = {};
  filtered.filter(t => t.type === 'Expense').forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + parseFloat(t.amount);
  });

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Dashboard</h4>
        <input type="date" className="form-control w-auto" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <div className="bg-light p-3 border text-success rounded">
            <div className="small">Income</div>
            <h5>₹{totalIncome.toFixed(2)}</h5>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="bg-light p-3 border text-danger rounded">
            <div className="small">Expenses</div>
            <h5>₹{totalExpenses.toFixed(2)}</h5>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="bg-light p-3 border text-primary rounded">
            <div className="small">Remaining</div>
            <h5>₹{remaining.toFixed(2)}</h5>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="bg-light p-3 border text-warning rounded">
            <div className="small">Savings (20%)</div>
            <h5>₹{savings.toFixed(2)}</h5>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <h6 className="mb-3">Monthly Spending</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6 mb-3">
          <h6 className="mb-3">Category-wise Expenses</h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} label dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h6>{dateFilter ? `Expenses on ${dateFilter}` : `Today's Expenses`}</h6>
        <table className="table table-bordered text-center small">
          <thead className="table-light">
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.filter(t => t.type === 'Expense').map(txn => (
              <tr key={txn.id}>
                <td>₹{txn.amount}</td>
                <td>{txn.category}</td>
                <td>{txn.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
