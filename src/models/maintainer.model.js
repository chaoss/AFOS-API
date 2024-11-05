import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.config.js';
import Project from './project.model.js';

const Maintainer = sequelize.define('Maintainer', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
 },
 project_id: {
  type: DataTypes.INTEGER,
  references: {
   model: Project,
   key: 'id',
  },
 },
 fullname: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 email: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
   isEmail: true,
  },
 },
 linkedin_url: {
  type: DataTypes.STRING,
 },
 x_url: {
  type: DataTypes.STRING,
 },
 created_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
 },
});

Maintainer.belongsTo(Project);
Project.hasMany(Maintainer);

export default Maintainer;
