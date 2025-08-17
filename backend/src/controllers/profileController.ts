import { Request, Response } from 'express';
import { ApiResponse, User } from '../types';

export class ProfileController {
  static async getProfile(req: Request, res: Response<ApiResponse<User>>) {
    try {
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'Иван Петров',
        email: 'ivan@example.com',
        avatar: 'ИП',
        position: 'Frontend Developer',
        phone: '+7 (999) 123-45-67',
        location: 'Москва',
        experience: '5+ лет',
        about: 'Опытный Frontend разработчик с глубокими знаниями React, TypeScript и современных технологий веб-разработки.',
        skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Redux', 'Next.js', 'GraphQL', 'Jest', 'Docker', 'AWS'],
        salary: '200 000 - 350 000 ₽',
        employment: 'Полная занятость',
        remote: true,
        resumeUploaded: true
      };

      const response: ApiResponse<User> = {
        success: true,
        data: mockUser,
        message: 'Profile retrieved successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile'
      };
      res.status(500).json(response);
    }
  }

  static async updateProfile(req: Request<{}, ApiResponse<User>, Partial<User>>, res: Response<ApiResponse<User>>) {
    try {
      const updateData = req.body;

      // Mock updated user data
      const updatedUser: User = {
        id: '1',
        name: updateData.name || 'Иван Петров',
        email: updateData.email || 'ivan@example.com',
        avatar: 'ИП',
        position: updateData.position || 'Frontend Developer',
        phone: updateData.phone || '+7 (999) 123-45-67',
        location: updateData.location || 'Москва',
        experience: updateData.experience || '5+ лет',
        about: updateData.about || 'Опытный Frontend разработчик',
        skills: updateData.skills || ['React', 'TypeScript'],
        salary: updateData.salary || '200 000 - 350 000 ₽',
        employment: updateData.employment || 'Полная занятость',
        remote: updateData.remote || true,
        resumeUploaded: true
      };

      const response: ApiResponse<User> = {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
      res.status(400).json(response);
    }
  }
}