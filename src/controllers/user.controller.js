import userService from '../services/user.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};
