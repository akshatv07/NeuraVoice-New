import { AxiosResponse } from 'axios';
import axios from 'axios';

// Get API base URL from Vite environment variables
// Define API endpoints
const UPLOAD_ENDPOINT = 'http://neuravoice-lb-1102080440.ap-south-1.elb.amazonaws.com:8004/upload';
const STORE_ENDPOINT = 'http://neuravoice-lb-1102080440.ap-south-1.elb.amazonaws.com:8005/store-assistant';

export const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => {
    // Accept all status codes and handle them manually
    return true;
  },
  withCredentials: true,
});

// File Upload API
export const uploadFile = async (file: File): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.status !== 200) {
      throw new Error(`Upload failed with status ${response.status}`);
    }
    
    // Check if response is HTML (likely an error page)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      throw new Error('Server returned HTML response instead of JSON');
    }
    
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'File upload failed');
    }
    throw new Error(error.message || 'File upload failed');
  }
};

// Store Assistant Configuration API
export const storeAssistantConfig = async (config: {
  name: string;
  provider: string;
  model: string;
  persona: string;
  goal: string;
  domain: string;
  department: string;
  strategyPrompt: string;
  guardrails: {
    avoidProfanity: boolean;
    stickToInfo: boolean;
    politeTone: boolean;
    slotFilling: boolean;
  };
}): Promise<AxiosResponse> => {
  try {
    const response = await api.post(STORE_ENDPOINT, config);
    
    if (response.status !== 200) {
      throw new Error(`Failed to create assistant with status ${response.status}`);
    }
    
    // Check if response is HTML (likely an error page)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      throw new Error('Server returned HTML response instead of JSON');
    }
    
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to create assistant');
    }
    throw new Error(error.message || 'Failed to create assistant');
  }
};
