const { dbConfig } = require("../config/db.config.js");
const Sequelize = require("sequelize");
const moment = require("moment-timezone");

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  timezone: "+05:30", // Set timezone to IST
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models with error handling
try {
  db.user = require("../modules/authentication/user/models/user.model.js")(sequelize, Sequelize);
  db.userinfo = require("../modules/authentication/user/models/userinfo.model.js")(sequelize, Sequelize);
  db.form = require("../modules/form/models/form.model.js")(sequelize, Sequelize);
  db.get_quote_form = require("../modules/form/models/get_quote_form.model.js")(sequelize, Sequelize);
  db.notify = require("../modules/form/models/notify.model.js")(sequelize, Sequelize);

} catch (error) {
  console.error("Error importing models:", error);
}

// Define associations

// User and UserInfo association
db.user.hasOne(db.userinfo, { foreignKey: "userId", as: "userInfo" });
db.userinfo.belongsTo(db.user, { foreignKey: "userId", as: "user" });


// Export db object
module.exports = db;
