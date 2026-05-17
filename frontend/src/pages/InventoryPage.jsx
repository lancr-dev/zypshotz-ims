import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import InventoryTable from '../components/InventoryTable';
import InventoryModal from '../components/InventoryModal';

import { getInventoryItems } from '../services/inventoryApi';

import '../styles/inventory.css';

function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editItem, setEditItem] = useState(null);

  /*
        FETCH INVENTORY ITEMS
    */
  const fetchInventoryItems = async () => {
    try {
      const data = await getInventoryItems();

      setInventoryItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  /*
        OPEN EDIT MODAL
    */
  const openEditModal = (item) => {
    setEditItem(item);

    setIsModalOpen(true);
  };

  /*
        CLOSE MODAL
    */
  const closeModal = () => {
    setEditItem(null);

    setIsModalOpen(false);
  };

  return (
    <div className='dashboard-layout'>
      <Sidebar />

      <main className='dashboard-main'>
        <Navbar />

        <div className='dashboard-content'>
          <div className='inventory-header'>
            <h2>Inventory Management</h2>

            <button
              className='add-item-btn'
              onClick={() => setIsModalOpen(true)}
            >
              Add Item
            </button>
          </div>

          <InventoryTable
            inventoryItems={inventoryItems}
            refreshInventory={fetchInventoryItems}
            openEditModal={openEditModal}
          />
        </div>
      </main>

      {isModalOpen && (
        <InventoryModal
          closeModal={closeModal}
          refreshInventory={fetchInventoryItems}
          editItem={editItem}
        />
      )}
    </div>
  );
}

export default InventoryPage;
