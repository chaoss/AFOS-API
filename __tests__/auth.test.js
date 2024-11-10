import request from 'supertest';
import { describe, test, expect, beforeAll } from '@jest/globals';
import app from '../src/app.js';
import { User } from '../src/models/index.js';
import { generateToken } from '../src/configs/jwt.config.js';

describe('Auth endpoints', () => {
  let adminToken;

  beforeAll(async () => {
    const admin = await User.create({
      fullname: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      isSuperAdmin: true,
    });
    adminToken = generateToken(admin);
  });

  describe('POST /api/auth/login', () => {
    test('should login successfully with valid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'admin@test.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', 'admin@test.com');
    });

    test('should fail with invalid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'admin@test.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe('error');
    });
  });

  describe('POST /api/auth/invitations', () => {
    test('should create invitation successfully', async () => {
      const res = await request(app)
        .post('/api/auth/invitations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          invitee_email: 'newuser@test.com',
          isSuperAdmin: false,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.invitation).toHaveProperty('invitee_email', 'newuser@test.com');
    });
  });
});
