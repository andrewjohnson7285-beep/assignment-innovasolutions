import { useState } from 'react';
import './CustomerRewards.css';

const CustomerRewards = ({ customer }) => {
    const [expandedMonths, setExpandedMonths] = useState({});

    const toggleMonth = (monthKey) => {
        setExpandedMonths((prev) => ({
            ...prev,
            [monthKey]: !prev[monthKey],
        }));
    };

    const formatCurrency = (amount) =>
        `$${amount.toFixed(2)}`;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="customer-card">
            <div className="customer-header">
                <div className="customer-info">
                    <div className="customer-avatar">
                        {customer.customerName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="customer-name">{customer.customerName}</h3>
                        <span className="customer-id">ID: {customer.customerId}</span>
                    </div>
                </div>
                <div className="total-badge">
                    <span className="total-label">Total Points</span>
                    <span className="total-value">{customer.totalPoints.toLocaleString()}</span>
                </div>
            </div>

            <div className="months-container">
                {customer.months.map((month) => (
                    <div key={month.monthKey} className="month-section">
                        <button
                            className={`month-toggle ${expandedMonths[month.monthKey] ? 'expanded' : ''}`}
                            onClick={() => toggleMonth(month.monthKey)}
                        >
                            <div className="month-info">
                                <span className="month-chevron">
                                    {expandedMonths[month.monthKey] ? '▾' : '▸'}
                                </span>
                                <span className="month-label">{month.monthLabel}</span>
                                <span className="txn-count">
                                    {month.transactions.length} transaction{month.transactions.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <span className="month-points">{month.points} pts</span>
                        </button>

                        {expandedMonths[month.monthKey] && (
                            <div className="transactions-table-wrap">
                                <table className="transactions-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {month.transactions.map((txn) => (
                                            <tr key={txn.id}>
                                                <td>{formatDate(txn.date)}</td>
                                                <td className="amount">{formatCurrency(txn.amount)}</td>
                                                <td className="points-cell">
                                                    <span className={`points-badge ${txn.points === 0 ? 'zero' : ''}`}>
                                                        {txn.points}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerRewards;
