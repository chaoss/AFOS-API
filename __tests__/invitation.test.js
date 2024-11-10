import { describe, test, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';
import { User, Invitation } from '../src/models/index.js';
import { generateToken } from '../src/configs/jwt.config.js';

describe('Invitation endpoints', () => {
  let adminToken = null;

  beforeAll(async () => {
    const admin = await User.create({
      fullname: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      isSuperAdmin: true,
    });
    adminToken = generateToken(admin);

    await Invitation.create({
      inviter_id: admin.id,
      invitee_email: 'invited@test.com',
      token: 'test-token',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  });

  describe('GET /api/invitations', () => {
    test('should get all invitations', async () => {
      const res = await request(app)
        .get('/api/invitations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('should fail without auth token', async () => {
      const res = await request(app).get('/api/invitations');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/invitations/accept', () => {
    test('should accept invitation successfully', async () => {
      const res = await request(app).post('/api/invitations/accept').send({
        token: 'test-token',
        fullname: 'New User',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });

    test('should fail with invalid token', async () => {
      const res = await request(app).post('/api/invitations/accept').send({
        token: 'invalid-token',
        fullname: 'New User',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(res.status).toBe(400);
    });
  });
});
