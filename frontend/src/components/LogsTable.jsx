import '../styles/logs.css';

function LogsTable({ logs, currentPage, totalPages, totalLogs, onPageChange }) {
  /*
        FORMAT DATE
    */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className='logs-table-container'>
      <table className='logs-table'>
        <thead>
          <tr>
            <th>Date & Time</th>

            <th>Item</th>

            <th>Action</th>

            <th>Qty</th>

            <th>Before</th>

            <th>After</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan='6' className='empty-log-message'>
                No inventory logs found.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td>{formatDate(log.createdAt)}</td>

                <td>{log.inventoryId?.itemName || 'Deleted Item'}</td>

                <td>
                  <span
                    className={`log-badge ${
                      log.actionType === 'ADD' ? 'stock-in' : 'stock-out'
                    }`}
                  >
                    {log.actionType === 'ADD' ? 'Stock In' : 'Stock Out'}
                  </span>
                </td>

                <td>{log.quantity}</td>

                <td>{log.previousStock}</td>

                <td>{log.newStock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      {totalLogs > 0 && (
        <div className='pagination-container'>
          <div className='pagination-info'>
            Showing {(currentPage - 1) * 20 + 1}–
            {Math.min(currentPage * 20, totalLogs)} of {totalLogs} logs
          </div>

          <div className='pagination-controls'>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active-page' : ''}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogsTable;
