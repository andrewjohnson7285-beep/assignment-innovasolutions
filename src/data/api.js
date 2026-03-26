import transactions from './transactionData';


export const fetchTransactions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(transactions);
        }, 1000);
    });
};
