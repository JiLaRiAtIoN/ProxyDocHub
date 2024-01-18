const Sequelize = require('sequelize');
const sequelize = require('../connection');

const StudBodyModel = sequelize.define(
    'studbody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        probeg: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        studHeaderId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = StudBodyModel;