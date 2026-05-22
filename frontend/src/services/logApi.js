import API from './inventoryApi';

/*
    GET INVENTORY LOGS
*/
export const getInventoryLogs = async () => {
  const response = await API.get('/inventory/logs/all');

  return response.data;
};
