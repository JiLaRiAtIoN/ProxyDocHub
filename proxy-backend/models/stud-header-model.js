const Sequelize = require('sequelize');
const sequelize = require('../connection');

const StudHeaderModel = sequelize.define(
    'studheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date1: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        voditelId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        organizationId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        marka: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        marshrut: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = StudHeaderModel;