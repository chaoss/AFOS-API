import { Op } from 'sequelize';
import { User, Invitation } from '../models/index.js';

export const findUserByEmail = async (email) => {
 return User.findOne({ where: { email } });
};

export const createUser = async (userData) => {
 return User.create(userData);
};

export const findInvitationByToken = async (token) => {
 return Invitation.findOne({
  where: {
   token,
   status: 'pending',
  },
 });
};

export const updateInvitationStatus = async (invitation, status) => {
 return invitation.update({ status });
};

export const updateUserPassword = async (userId, newPassword) => {
 const user = await User.findByPk(userId);
 return user.update({ password: newPassword });
};

export const createPasswordResetToken = async (userId) => {
 const resetToken = crypto.randomBytes(32).toString('hex');
 const hashedToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');

 await User.update(
  {
   passwordResetToken: hashedToken,
   passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  },
  { where: { id: userId } }
 );

 return resetToken;
};

export const findUserByResetToken = async (token) => {
 const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
 return User.findOne({
  where: {
   passwordResetToken: hashedToken,
   passwordResetExpires: { [Op.gt]: new Date() },
  },
 });
};
