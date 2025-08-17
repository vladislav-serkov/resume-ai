import { Request, Response } from 'express';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

export class AuthController {
  static async login(req: Request<{}, ApiResponse<AuthResponse>, LoginRequest>, res: Response<ApiResponse<AuthResponse>>) {
    try {
      const { email } = req.body;

      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'Иван Петров',
        email: email,
        avatar: 'ИП',
        position: 'Frontend Developer',
        resumeUploaded: true,
        phone: '+7 (999) 123-45-67',
        location: 'Москва',
        experience: '5+ лет',
        about: 'Опытный Frontend разработчик с глубокими знаниями React, TypeScript и современных технологий веб-разработки.',
        skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Redux', 'Next.js'],
        salary: '200 000 - 350 000 ₽',
        employment: 'Полная занятость',
        remote: true
      };

      const response: ApiResponse<AuthResponse> = {
        success: true,
        data: {
          user: mockUser,
          token: 'mock-jwt-token'
        },
        message: 'Successfully logged in'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
      res.status(401).json(response);
    }
  }

  static async register(req: Request<{}, ApiResponse<AuthResponse>, RegisterRequest>, res: Response<ApiResponse<AuthResponse>>) {
    try {
      const { firstName, lastName, email, position, experience } = req.body;

      // Mock user data
      const mockUser: User = {
        id: '1',
        name: `${firstName} ${lastName}`,
        email: email,
        avatar: `${firstName[0]}${lastName[0]}`,
        position: position,
        experience: experience,
        resumeUploaded: false,
        location: 'Москва',
        skills: [],
        remote: false
      };

      const response: ApiResponse<AuthResponse> = {
        success: true,
        data: {
          user: mockUser,
          token: 'mock-jwt-token'
        },
        message: 'Successfully registered'
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
      res.status(400).json(response);
    }
  }
}