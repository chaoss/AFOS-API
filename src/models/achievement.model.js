import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.config.js';
import Project from './project.model.js';

const Achievement = sequelize.define('Achievement', {
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
  item: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Achievement.belongsTo(Project);
Project.hasMany(Achievement);

export default Achievement;
