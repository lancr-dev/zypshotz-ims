import { Package, AlertTriangle, XCircle } from 'lucide-react';

import '../styles/dashboard.css';

function DashboardCards({ analytics }) {
  const dashboardData = [
    {
      title: 'Total Items',
      value: analytics.totalItems,
      icon: <Package size={28} />,
      className: 'card-total',
    },

    {
      title: 'Low Stock',
      value: analytics.lowStockCount,
      icon: <AlertTriangle size={28} />,
      className: 'card-low',
    },

    {
      title: 'Out of Stock',
      value: analytics.outStockCount,
      icon: <XCircle size={28} />,
      className: 'card-out',
    },
  ];

  return (
    <div className='dashboard-cards'>
      {dashboardData.map((card, index) => (
        <div key={index} className={`dashboard-card ${card.className}`}>
          <div className='dashboard-card-info'>
            <h3>{card.title}</h3>

            <h2>{card.value}</h2>
          </div>

          <div className='dashboard-card-icon'>{card.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
