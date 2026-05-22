import '../styles/logs.css';

function LogsTable({ logs }) {
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
    </div>
  );
}

export default LogsTable;
