module.exports = (sequelize, Sequelize) => {
    const moment = require("moment-timezone");

    const QuoteForm = sequelize.define(
        "get_quote_form",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            mobile: {
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
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            area: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            style: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            service: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
                beforeCreate: (form) => {
                    const currentIST = moment().tz("Asia/Kolkata").toDate();
                    form.createdAt = currentIST;
                    form.updatedAt = currentIST;
                },
                beforeUpdate: (form) => {
                    const currentIST = moment().tz("Asia/Kolkata").toDate();
                    form.updatedAt = currentIST;
                },
            },
            tableName: "get_quote_form",
            timestamps: true,
        }
    );

    return QuoteForm;
};
