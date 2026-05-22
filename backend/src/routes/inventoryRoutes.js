import express from 'express';

import {
  createInventoryItem,
  getInventoryItems,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  increaseStock,
  decreaseStock,
  getInventoryLogs,
  deleteInventoryLogs,
} from '../controllers/inventoryController.js';

const router = express.Router();

/*
    INVENTORY CRUD ROUTES
*/
router.post('/', createInventoryItem);

router.get('/', getInventoryItems);

/*
    INVENTORY LOG ROUTES
*/
router.get('/logs/all', getInventoryLogs);

router.delete('/logs/all', deleteInventoryLogs);

router.get('/:id', getInventoryItem);

router.put('/:id', updateInventoryItem);

router.delete('/:id', deleteInventoryItem);

/*
    STOCK MANAGEMENT ROUTES
*/
router.patch('/:id/increase', increaseStock);

router.patch('/:id/decrease', decreaseStock);

export default router;
