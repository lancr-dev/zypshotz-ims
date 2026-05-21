import { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import '../styles/stockAdjustmentModal.css';

function StockAdjustmentModal({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  itemName,
}) {
  const [quantity, setQuantity] = useState(1);

  /*
        RESET QUANTITY WHEN MODAL OPENS
    */
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  /*
        HANDLE SUBMIT
    */
  const handleSubmit = () => {
    if (quantity <= 0) {
      toast.error('Quantity must be greater than 0');

      return;
    }

    onConfirm(quantity);
  };

  /*
        CLOSE MODAL IF NOT OPEN
    */
  if (!isOpen) return null;

  return (
    <div className='stock-modal-overlay'>
      <div className='stock-modal'>
        <h2>
          {actionType === 'increase' ? 'Increase Stock' : 'Decrease Stock'}
        </h2>

        <p className='stock-modal-item'>{itemName}</p>

        <div className='stock-modal-input-group'>
          <label>Quantity</label>

          <input
            type='number'
            min='1'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className='stock-modal-buttons'>
          <button className='stock-modal-btn cancel-btn' onClick={onClose}>
            Cancel
          </button>

          <button
            className={`stock-modal-btn ${
              actionType === 'increase'
                ? 'confirm-increase-btn'
                : 'confirm-decrease-btn'
            }`}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockAdjustmentModal;
