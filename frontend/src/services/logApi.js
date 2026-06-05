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
