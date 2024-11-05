import * as userRepository from '../repositories/user.repository.js';

export const getUsersService = async () => {
  const users = await userRepository.findAllUsers();
  return users;
};

export const getUserByIdService = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserService = async (id, userData) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await userRepository.updateUser(id, userData);
  return {
    id: updatedUser.id,
    fullname: updatedUser.fullname,
    email: updatedUser.email,
    isSuperAdmin: updatedUser.isSuperAdmin,
  };
};

export const deleteUserService = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  await userRepository.deleteUser(id);
  return { message: 'User deleted successfully' };
};
