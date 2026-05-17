import Inventory from '../models/Inventory.js';
import InventoryLog from '../models/InventoryLog.js';

/*
    CREATE INVENTORY ITEM
*/
export const createInventoryItem = async (req, res) => {
  try {
    const { itemName, category, stock } = req.body;

    const inventoryItem = await Inventory.create({
      itemName,
      category,
      stock,
    });

    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    GET ALL INVENTORY ITEMS
*/
export const getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().sort({
      createdAt: -1,
    });

    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    GET SINGLE INVENTORY ITEM
*/
export const getInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        message: 'Inventory item not found',
      });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    UPDATE INVENTORY ITEM
*/
export const updateInventoryItem = async (req, res) => {
  try {
    const { itemName, category, stock } = req.body;

    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        message: 'Inventory item not found',
      });
    }

    inventoryItem.itemName = itemName || inventoryItem.itemName;

    inventoryItem.category = category || inventoryItem.category;

    inventoryItem.stock = stock ?? inventoryItem.stock;

    await inventoryItem.save();

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    DELETE INVENTORY ITEM
*/
export const deleteInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        message: 'Inventory item not found',
      });
    }

    await inventoryItem.deleteOne();

    res.status(200).json({
      message: 'Inventory item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    INCREASE STOCK
*/
export const increaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        message: 'Inventory item not found',
      });
    }

    const previousStock = inventoryItem.stock;

    inventoryItem.stock += quantity;

    await inventoryItem.save();

    await InventoryLog.create({
      inventoryId: inventoryItem._id,
      actionType: 'ADD',
      quantity,
      previousStock,
      newStock: inventoryItem.stock,
    });

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
    DECREASE STOCK
*/
export const decreaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      return res.status(404).json({
        message: 'Inventory item not found',
      });
    }

    if (inventoryItem.stock < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
      });
    }

    const previousStock = inventoryItem.stock;

    inventoryItem.stock -= quantity;

    await inventoryItem.save();

    await InventoryLog.create({
      inventoryId: inventoryItem._id,
      actionType: 'REMOVE',
      quantity,
      previousStock,
      newStock: inventoryItem.stock,
    });

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
