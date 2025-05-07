module.exports = (sequelize, Sequelize) => {
  const moment = require('moment-timezone');
  const UserInfo = sequelize.define("userinfo", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // storeId: {
    //   type: Sequelize.INTEGER,
    //     allowNull: false,
    // },  
    userId: {
      type: Sequelize.INTEGER,
        allowNull: false,
    },
    photo: {
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
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    zipCode: {
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
      beforeCreate: (UserInfo, options) => {
        const currentIST = moment().tz('Asia/Kolkata').toDate();
        UserInfo.createdAt = currentIST;
        UserInfo.updatedAt = currentIST;
      },
      beforeUpdate: (UserInfo, options) => {
        const currentIST = moment().tz('Asia/Kolkata').toDate();
        UserInfo.updatedAt = currentIST;
      }
    }
  });

  return UserInfo;
};
