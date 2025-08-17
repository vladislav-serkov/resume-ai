import { Request, Response } from 'express';
import { ApiResponse } from '../types';

interface UserSettings {
  id: string;
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    jobMatches: boolean;
    applicationUpdates: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    currency: string;
    jobAlerts: boolean;
    autoApply: boolean;
  };
  searchFilters: {
    defaultLocation: string;
    defaultSalaryMin: number;
    defaultRemote: boolean;
    defaultExperience: string;
  };
}

export class SettingsController {
  static async getUserSettings(_req: Request, res: Response<ApiResponse<UserSettings>>) {
    try {
      // Mock user settings data
      const mockSettings: UserSettings = {
        id: '1',
        userId: '1',
        notifications: {
          email: true,
          push: true,
          jobMatches: true,
          applicationUpdates: true,
          weeklyDigest: false,
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
          showPhone: false,
        },
        preferences: {
          language: 'ru',
          timezone: 'Europe/Moscow',
          currency: 'RUB',
          jobAlerts: true,
          autoApply: false,
        },
        searchFilters: {
          defaultLocation: 'Москва',
          defaultSalaryMin: 100000,
          defaultRemote: false,
          defaultExperience: '1-3',
        },
      };

      res.json({
        success: true,
        data: mockSettings,
        message: 'Настройки пользователя получены успешно'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при получении настроек пользователя'
      });
    }
  }

  static async updateUserSettings(req: Request, res: Response<ApiResponse<UserSettings>>) {
    try {
      const updatedData = req.body;

      // Mock updated settings - merge with existing settings
      const updatedSettings: UserSettings = {
        id: '1',
        userId: '1',
        notifications: {
          email: updatedData.notifications?.email ?? true,
          push: updatedData.notifications?.push ?? true,
          jobMatches: updatedData.notifications?.jobMatches ?? true,
          applicationUpdates: updatedData.notifications?.applicationUpdates ?? true,
          weeklyDigest: updatedData.notifications?.weeklyDigest ?? false,
        },
        privacy: {
          profileVisible: updatedData.privacy?.profileVisible ?? true,
          showEmail: updatedData.privacy?.showEmail ?? false,
          showPhone: updatedData.privacy?.showPhone ?? false,
        },
        preferences: {
          language: updatedData.preferences?.language ?? 'ru',
          timezone: updatedData.preferences?.timezone ?? 'Europe/Moscow',
          currency: updatedData.preferences?.currency ?? 'RUB',
          jobAlerts: updatedData.preferences?.jobAlerts ?? true,
          autoApply: updatedData.preferences?.autoApply ?? false,
        },
        searchFilters: {
          defaultLocation: updatedData.searchFilters?.defaultLocation ?? 'Москва',
          defaultSalaryMin: updatedData.searchFilters?.defaultSalaryMin ?? 100000,
          defaultRemote: updatedData.searchFilters?.defaultRemote ?? false,
          defaultExperience: updatedData.searchFilters?.defaultExperience ?? '1-3',
        },
      };

      res.json({
        success: true,
        data: updatedSettings,
        message: 'Настройки пользователя обновлены успешно'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при обновлении настроек пользователя'
      });
    }
  }

  static async resetUserSettings(_req: Request, res: Response<ApiResponse<UserSettings>>) {
    try {
      // Mock default settings
      const defaultSettings: UserSettings = {
        id: '1',
        userId: '1',
        notifications: {
          email: true,
          push: true,
          jobMatches: true,
          applicationUpdates: true,
          weeklyDigest: true,
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
          showPhone: false,
        },
        preferences: {
          language: 'ru',
          timezone: 'Europe/Moscow',
          currency: 'RUB',
          jobAlerts: true,
          autoApply: false,
        },
        searchFilters: {
          defaultLocation: '',
          defaultSalaryMin: 0,
          defaultRemote: false,
          defaultExperience: '',
        },
      };

      res.json({
        success: true,
        data: defaultSettings,
        message: 'Настройки сброшены к значениям по умолчанию'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Ошибка при сбросе настроек пользователя'
      });
    }
  }
}