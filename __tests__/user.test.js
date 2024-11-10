import request from 'supertest';
import { describe, test, expect, beforeAll } from '@jest/globals';
import app from '../src/app.js';
import { User } from '../src/models/index.js';
import { generateToken } from '../src/configs/jwt.config.js';

describe('User endpoints', () => {
  let adminToken;
  let testUserId;

  beforeAll(async () => {
    const admin = await User.create({
      fullname: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      isSuperAdmin: true,
    });
    adminToken = generateToken(admin);

    const testUser = await User.create({
      fullname: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    });
    testUserId = testUser.id;
  });

  describe('GET /api/users', () => {
    test('should get all users', async () => {
      const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update user successfully', async () => {
      const res = await request(app)
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          fullname: 'Updated Name',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.fullname).toBe('Updated Name');
    });
  });
});
