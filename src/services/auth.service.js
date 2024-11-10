import bcrypt from 'bcryptjs';
import { generateToken } from '../configs/jwt.config.js';
import * as authRepository from '../repositories/auth.repository.js';

class AuthService {
  async login(email, password) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
      },
      token,
    };
  }

  async acceptInvitation(token, userData) {
    const invitation = await authRepository.findInvitationByToken(token);

    if (!invitation || invitation.expires_at < new Date()) {
      await invitation?.update({ status: 'expired' });
      throw new Error('Invalid or expired invitation');
    }

    const user = await authRepository.createUser({
      ...userData,
      email: invitation.invitee_email,
      isSuperAdmin: invitation.isSuperAdmin,
    });

    await authRepository.updateInvitationStatus(invitation, 'accepted');

    const authToken = generateToken(user);

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
      },
      token: authToken,
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await authRepository.findUserByPk(userId);

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await authRepository.updateUserPassword(userId, hashedPassword);

    return { message: 'Password updated successfully' };
  }

  async forgotPassword(email) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('No user found with this email');
    }

    const resetToken = await authRepository.createPasswordResetToken(user.id);

    return {
      message: 'Password reset token generated',
      resetToken,
    };
  }

  async resetPassword(token, newPassword) {
    const user = await authRepository.findUserByResetToken(token);
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await authRepository.updateUserPassword(user.id, hashedPassword);

    await user.update({
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return { message: 'Password has been reset successfully' };
  }
}

export default new AuthService();
