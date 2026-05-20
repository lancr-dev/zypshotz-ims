import { Pencil, Trash2, Plus, Minus } from 'lucide-react';

import toast from 'react-hot-toast';

import {
  deleteInventoryItem,
  increaseStock,
  decreaseStock,
} from '../services/inventoryApi';

import '../styles/inventory.css';

function InventoryTable({ inventoryItems, refreshInventory, openEditModal }) {
  /*
        DELETE ITEM
    */
  const handleDelete = async (id) => {
    try {
      await deleteInventoryItem(id);

      toast.success('Inventory item deleted');

      refreshInventory();
    } catch (error) {
      toast.error('Failed to delete item');

      console.log(error);
    }
  };

  /*
        INCREASE STOCK
    */
  const handleIncrease = async (id) => {
    try {
      await increaseStock(id, 1);

      toast.success('Stock increased');

      refreshInventory();
    } catch (error) {
      toast.error('Failed to increase stock');

      console.log(error);
    }
  };

  /*
        DECREASE STOCK
    */
  const handleDecrease = async (id) => {
    try {
      await decreaseStock(id, 1);

      toast.success('Stock decreased');

      refreshInventory();
    } catch (error) {
      toast.error('Failed to decrease stock');

      console.log(error);
    }
  };

  return (
    <div className='inventory-table-container'>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>Item Name</th>

            <th>Category</th>

            <th>Stock</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventoryItems.map((item) => (
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

              <td>
                <div className='action-buttons'>
                  <button
                    className='action-btn increase-btn'
                    onClick={() => handleIncrease(item._id)}
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    className='action-btn decrease-btn'
                    onClick={() => handleDecrease(item._id)}
                  >
                    <Minus size={16} />
                  </button>

                  <button
                    className='action-btn edit-btn'
                    onClick={() => openEditModal(item)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className='action-btn delete-btn'
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
