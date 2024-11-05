import { User } from '../models/index.js';

export const findAllUsers = () => {
  return User.findAll({
    attributes: ['id', 'fullname', 'email', 'isSuperAdmin', 'created_at'],
  });
};

export const findUserById = (id) => {
  return User.findByPk(id, {
    attributes: ['id', 'fullname', 'email', 'isSuperAdmin', 'created_at'],
  });
};

export const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  return user.update(userData);
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  return user.destroy();
};
