import '../styles/dashboard.css';
import '../styles/inventory.css';

function RecentInventory({ recentItems }) {
  return (
    <div className='recent-inventory'>
      <div className='recent-header'>
        <h2>Recent Inventory Items</h2>
      </div>

      <div className='recent-table-container'>
        <table className='recent-table'>
          <thead>
            <tr>
              <th>Item Name</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>

                <td>{item.category}</td>

                <td>{item.stock}</td>

                <td>
                  <span
                    className={`status-badge ${item.status
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentInventory;
