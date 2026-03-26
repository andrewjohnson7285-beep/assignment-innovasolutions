import { useMemo } from 'react';
import { processTransactions } from '../utils/rewardUtils';
import CustomerRewards from './CustomerRewards';
import './RewardsDashboard.css';

const RewardsDashboard = ({ transactions }) => {
    const customerData = useMemo(
        () => processTransactions(transactions),
        [transactions]
    );


    const allMonths = useMemo(() => {
        const monthSet = new Map();
        customerData.forEach((c) =>
            c.months.forEach((m) => monthSet.set(m.monthKey, m.monthLabel))
        );
        return Array.from(monthSet.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, label]) => ({ key, label }));
    }, [customerData]);

    return (
        <div className="dashboard">

            <section className="section">
                <h2 className="section-title">
                    <span className="section-icon">📊</span>
                    Rewards Summary
                </h2>
                <div className="table-wrap">
                    <table className="summary-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                {allMonths.map((m) => (
                                    <th key={m.key}>{m.label}</th>
                                ))}
                                <th className="total-col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerData.map((customer) => {
                                const monthPointsMap = {};
                                customer.months.forEach((m) => {
                                    monthPointsMap[m.monthKey] = m.points;
                                });

                                return (
                                    <tr key={customer.customerId}>
                                        <td className="name-cell">{customer.customerName}</td>
                                        {allMonths.map((m) => (
                                            <td key={m.key} className="num-cell">
                                                {monthPointsMap[m.key] ?? 0}
                                            </td>
                                        ))}
                                        <td className="num-cell total-col">
                                            {customer.totalPoints.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>


            <section className="section">
                <h2 className="section-title">
                    <span className="section-icon">👤</span>
                    Customer Details
                </h2>
                <div className="cards-grid">
                    {customerData.map((customer) => (
                        <CustomerRewards key={customer.customerId} customer={customer} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RewardsDashboard;
