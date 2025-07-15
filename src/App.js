
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Transaction from './Components/Transaction';
import Budget from './Components/Budget';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/transaction" element={<Transaction/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
