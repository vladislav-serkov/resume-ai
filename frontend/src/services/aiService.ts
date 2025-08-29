import axios from 'axios';
import { AIStatus } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export interface StartProcessingRequest {
  searchQuery: string;
  maxApplicationsPerRun?: number;
  checkIntervalMinutes?: number;
}

export interface UpdateAIStatusRequest {
  is_active: boolean;
  searchQuery?: string;
  maxApplicationsPerRun?: number;
  checkIntervalMinutes?: number;
}

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
      console.log('AI Status endpoint error:', error);
      // Return default status instead of throwing
      return {
        is_active: false,
        search_query: null,
        max_applications_per_run: 5,
        check_interval_minutes: 30,
        last_check: null,
        processed_today: 0,
        total_processed: 0
      };
    }
  },

  /**
   * Start AI processing with parameters
   */
  async startProcessing(request: StartProcessingRequest): Promise<AIStatus> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-status/start`, request, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Failed to start AI processing:', error);
      throw error;
    }
  },

  /**
   * Stop AI processing
   */
  async stopProcessing(): Promise<AIStatus> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-status/stop`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Failed to stop AI processing:', error);
      throw error;
    }
  },

  /**
   * Update AI assistant settings
   */
  async updateAIStatus(request: UpdateAIStatusRequest): Promise<AIStatus> {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/ai-status`, request, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update AI status:', error);
      throw error;
    }
  },

  /**
   * Get user applications from backend
   */
  async getUserApplications() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/vacancies/applications`, {
        withCredentials: true
      });
      return {
        success: response.data.success,
        ...response.data.data
      };
    } catch (error) {
      console.log('Get user applications error:', error);
      return {
        success: false,
        applications: [],
        applicationsCount: 0,
        stats: undefined
      };
    }
  },

  /**
   * Create SSE connection for real-time updates
   */
  createEventSource(): EventSource {
    return new EventSource(`${API_BASE_URL}/api/ai-status/stream`, {
      withCredentials: true
    });
  }
};