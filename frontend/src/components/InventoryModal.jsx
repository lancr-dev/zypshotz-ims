import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { X } from 'lucide-react';

import {
  createInventoryItem,
  updateInventoryItem,
} from '../services/inventoryApi';

import '../styles/modal.css';

function InventoryModal({ closeModal, refreshInventory, editItem }) {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    stock: '',
  });

  /*
        LOAD EDIT DATA
    */
  useEffect(() => {
    if (editItem) {
      setFormData({
        itemName: editItem.itemName,
        category: editItem.category,
        stock: editItem.stock,
      });
    }
  }, [editItem]);

  /*
        HANDLE INPUT CHANGE
    */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
        HANDLE SUBMIT
    */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*
                EDIT
            */
      if (editItem) {
        await updateInventoryItem(editItem._id, {
          ...formData,
          stock: Number(formData.stock),
        });

        toast.success('Inventory item updated');
      } else {

      /*
                CREATE
            */
        await createInventoryItem({
          ...formData,
          stock: Number(formData.stock),
        });

        toast.success('Inventory item created');
      }

      refreshInventory();

      closeModal();
    } catch (error) {
      toast.error('Operation failed');

      console.log(error);
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <h2>{editItem ? 'Edit Inventory Item' : 'Add Inventory Item'}</h2>

          <button className='modal-close-btn' onClick={closeModal}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='modal-form'>
          <input
            type='text'
            name='itemName'
            placeholder='Item Name'
            value={formData.itemName}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='category'
            placeholder='Category'
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type='number'
            name='stock'
            placeholder='Stock'
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <button type='submit' className='submit-btn'>
            {editItem ? 'Update Item' : 'Create Item'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InventoryModal;
