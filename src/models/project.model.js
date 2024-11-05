import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.config.js';

const Project = sequelize.define('Project', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
 },
 title: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 description: {
  type: DataTypes.TEXT,
  allowNull: false,
 },
 url: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 license_status: {
  type: DataTypes.ENUM('licensed', 'not licensed'),
  allowNull: false,
 },
 license_details: {
  type: DataTypes.ENUM(
   'MIT License',
   'Apache License 2.0',
   'BSD License (2-Clause and 3-Clause)',
   'Microsoft Public License (MS-PL)',
   'Zlib License',
   'GNU General Public License (GPL) 2.0 & 3.0',
   'GNU Lesser General Public License (LGPL)',
   'Affero General Public License (AGPL)',
   'Mozilla Public License 2.0 (MPL)',
   'Creative Commons Zero (CC0)',
   'Unlicense',
   'Eclipse Public License (EPL)',
   'Common Development and Distribution License (CDDL)',
   'SIL Open Font License (OFL)',
   'End User License Agreement (EULA)',
   'Proprietary License',
   'Subscription-Based License',
   'Trial or Evaluation License'
  ),
 },
 status: {
  type: DataTypes.ENUM('submitted', 'approved', 'rejected', 'pending'),
  defaultValue: 'pending',
 },
 category: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 country: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 logo_url: {
  type: DataTypes.STRING,
 },
 created_at: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
 },
});

export default Project;
