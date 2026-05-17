import axios from 'axios';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5003/api' : '/api';

const API = axios.create({
  baseURL: BASE_URL,
});

/*
    GET ALL INVENTORY ITEMS
*/
export const getInventoryItems = async () => {
  const response = await API.get('/inventory');

  return response.data;
};

/*
    CREATE INVENTORY ITEM
*/
export const createInventoryItem = async (inventoryData) => {
  const response = await API.post('/inventory', inventoryData);

  return response.data;
};

/*
    UPDATE INVENTORY ITEM
*/
export const updateInventoryItem = async (id, updatedData) => {
  const response = await API.put(`/inventory/${id}`, updatedData);

  return response.data;
};

/*
    DELETE INVENTORY ITEM
*/
export const deleteInventoryItem = async (id) => {
  const response = await API.delete(`/inventory/${id}`);

  return response.data;
};

/*
    INCREASE STOCK
*/
export const increaseStock = async (id, quantity) => {
  const response = await API.patch(`/inventory/${id}/increase`, { quantity });

  return response.data;
};

/*
    DECREASE STOCK
*/
export const decreaseStock = async (id, quantity) => {
  const response = await API.patch(`/inventory/${id}/decrease`, { quantity });

  return response.data;
};

/*
    GET DASHBOARD ANALYTICS
*/
export const getDashboardAnalytics = async () => {
  const response = await API.get('/inventory');

  const inventoryItems = response.data;

  const totalItems = inventoryItems.length;

  const lowStockItems = inventoryItems.filter(
    (item) => item.status === 'Low Stock',
  );

  const outStockItems = inventoryItems.filter(
    (item) => item.status === 'Out of Stock',
  );

  return {
    totalItems,
    lowStockCount: lowStockItems.length,
    outStockCount: outStockItems.length,
    recentItems: inventoryItems.slice(0, 5),
  };
};

export default API;
