import axios from 'axios';
import { AIStatus } from '../types';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const aiService = {
  /**
   * Get current AI assistant status
   */
  async getAIStatus(): Promise<AIStatus> {
    const response = await axios.get(`${API_BASE_URL}/api/ai-status`);
    return response.data;
  },

  /**
   * Update AI assistant status (start/stop)
   */
  async updateAIStatus(isActive: boolean): Promise<AIStatus> {
    const response = await axios.put(`${API_BASE_URL}/api/ai-status`, {
      is_active: isActive
    });
    return response.data;
  }
};