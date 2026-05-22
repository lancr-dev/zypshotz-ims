const API_URL = 'http://localhost:5003/api/inventory/logs/all';

/*
    GET INVENTORY LOGS
*/
export const getInventoryLogs = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch inventory logs');
  }

  return response.json();
};
