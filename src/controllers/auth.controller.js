import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
 try {
  const { email, password } = req.body;
  const result = await authService.loginService(email, password);

  return res.status(200).json({
   status: 'success',
   data: result,
  });
 } catch (error) {
  return res.status(401).json({
   status: 'error',
   message: error.message,
  });
 }
};

export const acceptInvitation = async (req, res) => {
 try {
  const { token, fullname, password } = req.body;
  const result = await authService.acceptInvitationService(token, {
   fullname,
   password,
  });

  return res.status(200).json({
   status: 'success',
   data: result,
  });
 } catch (error) {
  return res.status(400).json({
   status: 'error',
   message: error.message,
  });
 }
};

export const changePassword = async (req, res) => {
 try {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePasswordService(
   req.user.id,
   currentPassword,
   newPassword
  );

  return res.status(200).json({
   status: 'success',
   data: result,
  });
 } catch (error) {
  return res.status(400).json({
   status: 'error',
   message: error.message,
  });
 }
};

export const forgotPassword = async (req, res) => {
 try {
  const { email } = req.body;
  const result = await authService.forgotPasswordService(email);

  return res.status(200).json({
   status: 'success',
   data: result,
  });
 } catch (error) {
  return res.status(400).json({
   status: 'error',
   message: error.message,
  });
 }
};

export const resetPassword = async (req, res) => {
 try {
  const { token, newPassword } = req.body;
  const result = await authService.resetPasswordService(token, newPassword);

  return res.status(200).json({
   status: 'success',
   data: result,
  });
 } catch (error) {
  return res.status(400).json({
   status: 'error',
   message: error.message,
  });
 }
};
