import axios from 'axios';
import { AIStatus } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export const aiService = {
  /**
   * Get current AI assistant status
   */
  async getAIStatus(): Promise<AIStatus> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai-status`, {
        withCredentials: true // Include session cookies
      });
      return response.data;
    } catch (error) {
      // Don't let axios errors affect session state
      console.log('AI Status endpoint not available:', error);
      // Return default status instead of throwing
      return {
        is_active: false,
        last_check: new Date().toISOString(),
        processed_today: 0
      };
    }
  },

  /**
   * Update AI assistant status (start/stop)
   */
  async updateAIStatus(isActive: boolean): Promise<AIStatus> {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/ai-status`, {
        is_active: isActive
      }, {
        withCredentials: true // Include session cookies
      });
      return response.data;
    } catch (error) {
      console.log('AI Status update endpoint not available:', error);
      // Return current status unchanged
      return {
        is_active: false,
        last_check: new Date().toISOString(),
        processed_today: 0
      };
    }
  }
};