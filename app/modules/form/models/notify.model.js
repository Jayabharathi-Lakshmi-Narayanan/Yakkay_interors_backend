module.exports = (sequelize, DataTypes) => {
    return sequelize.define("notify", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: "notify",
        timestamps: true
    });
};
