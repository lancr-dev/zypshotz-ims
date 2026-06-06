import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import Sidebar from '../components/Sidebar';

import LogsTable from '../components/LogsTable';

import {
  getInventoryLogs,
  deleteInventoryLogs,
  exportInventoryLogs,
} from '../services/logApi';

import toast from 'react-hot-toast';

import exportLogsPdf from '../utils/exportLogsPdf';

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

  /*
      CLEAR ALL LOGS
*/
  const handleClearLogs = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all inventory logs?',
    );

    if (!confirmed) return;

    try {
      await deleteInventoryLogs();

      toast.success('All logs cleared successfully');

      // Reset to first page
      setCurrentPage(1);

      // Refresh the table immediately
      await fetchLogs(1);
    } catch (error) {
      toast.error('Failed to clear logs');

      console.log(error);
    }
  };

  /*
      DOWNLOAD LOGS AS PDF
*/
  const handleDownloadPdf = async () => {
    try {
      const logs = await exportInventoryLogs();

      if (logs.length === 0) {
        toast.error('No logs available to export');

        return;
      }

      await exportLogsPdf(logs);

      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate PDF');

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

            <div className='logs-header-actions'>
              <button className='download-logs-btn' onClick={handleDownloadPdf}>
                Download PDF
              </button>

              <button className='clear-logs-btn' onClick={handleClearLogs}>
                Clear Logs
              </button>
            </div>
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
