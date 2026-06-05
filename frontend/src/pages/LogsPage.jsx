import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import Sidebar from '../components/Sidebar';

import LogsTable from '../components/LogsTable';

import { getInventoryLogs } from '../services/logApi';

function LogsPage() {
  const [logs, setLogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalLogs, setTotalLogs] = useState(0);

  /*
        FETCH LOGS
    */
  const fetchLogs = async (page = 1) => {
    try {
      const data = await getInventoryLogs(page, 20);

      setLogs(data.logs);

      setCurrentPage(data.currentPage);

      setTotalPages(data.totalPages);

      setTotalLogs(data.totalLogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  return (
    <div className='dashboard-layout'>
      <Sidebar />

      <main className='dashboard-main'>
        <Navbar />

        <div className='dashboard-content'>
          <div className='inventory-header'>
            <h2>Inventory Logs</h2>
          </div>

          <LogsTable
            logs={logs}
            currentPage={currentPage}
            totalPages={totalPages}
            totalLogs={totalLogs}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}

export default LogsPage;
