const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Complaint = sequelize.define("Complaint", {
  trackingId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  citizenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
});

module.exports = Complaint;