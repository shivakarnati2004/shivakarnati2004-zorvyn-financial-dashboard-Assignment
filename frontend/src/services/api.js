const API_BASE_URL = '/api';

const api = {
  getTransactions: async () => {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  addTransaction: async (data) => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add transaction');
    return response.json();
  },

  updateTransaction: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response.json();
  },

  deleteTransaction: async (id) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
    return response.json();
  },
};

export default api;
