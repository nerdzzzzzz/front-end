// Simulates an API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API client
export const api = {
  post: async (endpoint: string, data: any) => {
    console.log(`[MOCK API] POST ${endpoint}`, data);
    await delay(500); // Simulate network latency
    return { success: true, data: { ...data, id: Math.random().toString() } };
  },
  
  put: async (endpoint: string, data: any) => {
    console.log(`[MOCK API] PUT ${endpoint}`, data);
    await delay(300);
    return { success: true, data };
  },
};
