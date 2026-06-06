import API from './inventoryApi';

/*
    GET INVENTORY LOGS
*/
export const getInventoryLogs = async (page = 1, limit = 20) => {
  const response = await API.get(
    `/inventory/logs/all?page=${page}&limit=${limit}`,
  );

  return response.data;
};

/*
    DELETE ALL INVENTORY LOGS
*/
export const deleteInventoryLogs = async () => {
  const response = await API.delete('/inventory/logs/all');

  return response.data;
};

/*
    GET ALL LOGS FOR PDF EXPORT
*/
export const exportInventoryLogs = async () => {
  const response = await API.get('/inventory/logs/export');

  return response.data;
};
