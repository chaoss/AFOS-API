import * as userRepository from '../repositories/user.repository.js';

class UserService {
  async getUsers() {
    const users = await userRepository.findAllUsers();
    return users;
  }

  async getUserById(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id, userData) {
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
  }

  async deleteUser(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}

export default new UserService();
