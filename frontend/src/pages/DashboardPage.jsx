import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import RecentInventory from '../components/RecentInventory';

import { getDashboardAnalytics } from '../services/inventoryApi';

import '../styles/dashboard.css';

function DashboardPage() {
  const [analytics, setAnalytics] = useState({
    totalItems: 0,
    lowStockCount: 0,
    outStockCount: 0,
    recentItems: [],
  });

  /*
        FETCH ANALYTICS
    */
  const fetchAnalytics = async () => {
    try {
      const data = await getDashboardAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className='dashboard-layout'>
      <Sidebar />

      <main className='dashboard-main'>
        <Navbar />

        <div className='dashboard-content'>
          <DashboardCards analytics={analytics} />

          <RecentInventory recentItems={analytics.recentItems} />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
