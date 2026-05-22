import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import Sidebar from '../components/Sidebar';

import LogsTable from '../components/LogsTable';

import { getInventoryLogs } from '../services/logApi';

function LogsPage() {
  const [logs, setLogs] = useState([]);

  /*
        FETCH LOGS
    */
  const fetchLogs = async () => {
    try {
      const data = await getInventoryLogs();

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className='dashboard-layout'>
      <Sidebar />

      <main className='dashboard-main'>
        <Navbar />

        <div className='dashboard-content'>
          <div className='inventory-header'>
            <h2>Inventory Logs</h2>
          </div>

          <LogsTable logs={logs} />
        </div>
      </main>
    </div>
  );
}

export default LogsPage;
