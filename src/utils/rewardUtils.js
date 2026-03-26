
export const calculatePoints = (amount) => {
    let points = 0;

    if (amount <= 0) return points;


    const dollars = Math.floor(amount);

    if (dollars > 100) {
        points += (dollars - 100) * 2;
        points += 50;
    } else if (dollars > 50) {
        points += (dollars - 50) * 1;
    }

    return points;
};


const getMonthLabel = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};


const getMonthKey = (dateStr) => dateStr.slice(0, 7);


export const processTransactions = (transactions) => {
    const customerMap = {};

    transactions.forEach((txn) => {
        const { customerId, customerName, date, amount } = txn;
        const monthKey = getMonthKey(date);
        const monthLabel = getMonthLabel(date);
        const points = calculatePoints(amount);

        if (!customerMap[customerId]) {
            customerMap[customerId] = {
                customerId,
                customerName,
                months: {},
                totalPoints: 0,
            };
        }

        const customer = customerMap[customerId];

        if (!customer.months[monthKey]) {
            customer.months[monthKey] = {
                monthKey,
                monthLabel,
                transactions: [],
                points: 0,
            };
        }

        customer.months[monthKey].transactions.push({
            ...txn,
            points,
        });
        customer.months[monthKey].points += points;
        customer.totalPoints += points;
    });


    return Object.values(customerMap)
        .map((customer) => ({
            ...customer,
            months: Object.values(customer.months).sort(
                (a, b) => a.monthKey.localeCompare(b.monthKey)
            ),
        }))
        .sort((a, b) => a.customerName.localeCompare(b.customerName));
};
