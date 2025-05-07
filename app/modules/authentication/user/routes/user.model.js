module.exports = (sequelize, Sequelize) => {
  const moment = require('moment-timezone');
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userToken: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    resetToken: {
      type: Sequelize.STRING
    },
    activeInd: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
   },
  createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
        const currentIST = moment().tz('Asia/Kolkata').toDate();
        User.createdAt = currentIST;
        User.updatedAt = currentIST;
      },
      beforeUpdate: (User, options) => {
        const currentIST = moment().tz('Asia/Kolkata').toDate();
        User.updatedAt = currentIST;
      }
    }
  });

  return User;
};
