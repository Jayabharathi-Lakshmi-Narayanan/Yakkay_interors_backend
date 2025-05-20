module.exports = {
  dbConfig: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    DB: process.env.DB_NAME, // Use the local database
    PASSWORD: process.env.DB_PASS, // Use the local password
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

}