module.exports = (sequelize, Sequelize) => {
    const moment = require('moment-timezone');

    const Form = sequelize.define(
        "form",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            service: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            hooks: {
                beforeCreate: (form, options) => {
                    const currentIST = moment().tz('Asia/Kolkata').toDate();
                    form.createdAt = currentIST;
                    form.updatedAt = currentIST;
                },
                beforeUpdate: (form, options) => {
                    const currentIST = moment().tz('Asia/Kolkata').toDate();
                    form.updatedAt = currentIST;
                },
            },
            tableName: "form", // Optional: ensures it doesn't pluralize to "forms"
            timestamps: true, // Optional: but you’re already managing them manually
        }
    );

    return Form;
};
