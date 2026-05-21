import { useState } from 'react';

import { Pencil, Trash2, Plus, Minus } from 'lucide-react';

import toast from 'react-hot-toast';

import {
  deleteInventoryItem,
  increaseStock,
  decreaseStock,
} from '../services/inventoryApi';

import StockAdjustmentModal from './StockAdjustmentModal';

import '../styles/inventory.css';

function InventoryTable({ inventoryItems, refreshInventory, openEditModal }) {
  /*
        MODAL STATES
    */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedItemName, setSelectedItemName] = useState('');

  const [actionType, setActionType] = useState('increase');

  /*
        DELETE ITEM
    */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (!confirmDelete) return;

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
        OPEN INCREASE MODAL
    */
  const handleIncrease = (item) => {
    setSelectedItemId(item._id);

    setSelectedItemName(item.itemName);

    setActionType('increase');

    setIsModalOpen(true);
  };

  /*
        OPEN DECREASE MODAL
    */
  const handleDecrease = (item) => {
    setSelectedItemId(item._id);

    setSelectedItemName(item.itemName);

    setActionType('decrease');

    setIsModalOpen(true);
  };

  /*
        CONFIRM STOCK ADJUSTMENT
    */
  const handleConfirmAdjustment = async (quantity) => {
    try {
      if (actionType === 'increase') {
        await increaseStock(selectedItemId, quantity);

        toast.success(`Stock increased by ${quantity}`);
      } else {
        await decreaseStock(selectedItemId, quantity);

        toast.success(`Stock decreased by ${quantity}`);
      }

      refreshInventory();

      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update stock');

      console.log(error);
    }
  };

  return (
    <>
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
                      onClick={() => handleIncrease(item)}
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      className='action-btn decrease-btn'
                      onClick={() => handleDecrease(item)}
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

      <StockAdjustmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdjustment}
        actionType={actionType}
        itemName={selectedItemName}
      />
    </>
  );
}

export default InventoryTable;
