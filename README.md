# 💎 Rewards Program Dashboard

A React application that calculates and displays customer reward points based on purchase transaction history. Built with **React 19** and **Vite**.

## Overview

Retailers often run loyalty programs that award points for purchases. This dashboard implements a points system where customers earn:

- **2 points** for every dollar spent **over $100** per transaction
- **1 point** for every dollar spent **between $50 and $100** per transaction

For example, a $120 purchase earns `(120 - 100) × 2 + 50 × 1 = 90 points`.

The app fetches transaction data via a simulated async API call, processes it to compute monthly and total reward points per customer, and presents the results in a clean, responsive dashboard.

## Features

- **Rewards Summary Table** — At-a-glance view of each customer's monthly and total points
- **Customer Detail Cards** — Expandable per-customer breakdowns with individual transaction data
- **Async Data Loading** — Simulated API call with a loading spinner and error handling
- **Responsive Design** — Optimized layout for desktop and mobile screens

## Project Structure

```
src/
├── App.jsx                      # Root component — fetches data, manages loading/error state
├── components/
│   ├── RewardsDashboard.jsx     # Summary table + customer detail cards
│   ├── CustomerRewards.jsx      # Individual customer reward card
│   └── LoadingSpinner.jsx       # Loading indicator
├── data/
│   ├── transactionData.js       # Mock transaction dataset (5 customers, Jan–Mar 2026)
│   └── api.js                   # Simulated async fetch (1s delay)
└── utils/
    └── rewardUtils.js           # calculatePoints() and processTransactions()
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Linting

```bash
npm run lint
```

### Production Build

```bash
npm run build
npm run preview
```

## Tech Stack

| Layer     | Technology      |
| --------- | --------------- |
| UI        | React 19        |
| Bundler   | Vite 5          |
| Styling   | Vanilla CSS     |
| Linting   | ESLint 9        |
| Language  | JavaScript (ES Modules) |

## Points Calculation Logic

Located in `src/utils/rewardUtils.js`:

```js
// Per-transaction points
if (dollars > 100) {
  points += (dollars - 100) * 2;  // 2× for amount over $100
  points += 50;                   // 1× for the $50–$100 range
} else if (dollars > 50) {
  points += (dollars - 50) * 1;   // 1× for amount over $50
}
```

Fractional cents are floored before calculation. Negative or zero amounts return 0 points.
