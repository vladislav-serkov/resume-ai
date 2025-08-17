import { Request, Response } from 'express';
import { ApiResponse, UserStats } from '../types';

export class StatsController {
  static async getUserStats(_req: Request, res: Response<ApiResponse<UserStats>>) {
    try {
      // Mock stats data
      const mockStats: UserStats = {
        totalApplications: 24,
        responses: 8,
        interviews: 3,
        offers: 1,
        aiAdaptations: 45,
        autoResponses: 12,
        successRate: 33
      };

      const response: ApiResponse<UserStats> = {
        success: true,
        data: mockStats,
        message: 'Stats retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get stats'
      };
      res.status(500).json(response);
    }
  }
}