require('dotenv').config()
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : "127.0.0.1",
      port : "3306",
      user : "root",
      password : "824Kjd13%",
      database : "silabu"
    }
  }
};
