import { useState, useEffect } from 'react';
import { fetchTransactions } from './data/api';
import RewardsDashboard from './components/RewardsDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchTransactions()
      .then((data) => {
        if (isMounted) {
          setTransactions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch transactions');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-icon">💎</span>
            <div>
              <h1 className="brand-title">Rewards Program</h1>
              <p className="brand-sub">Customer Loyalty Points Dashboard</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="meta-pill">Jan – Mar 2026</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        {loading && <LoadingSpinner />}
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
          </div>
        )}
        {!loading && !error && (
          <RewardsDashboard transactions={transactions} />
        )}
      </main>

      <footer className="app-footer">
        <p>Retailer Rewards Program &copy; 2026 &mdash; Points calculated per transaction</p>
      </footer>
    </div>
  );
}

export default App;
