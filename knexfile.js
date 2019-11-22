require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      afterCreate: function (conn, done) {
        conn.query('SET timezone="UTC";', function (err) {
          if (err) {
            done(err, conn);
          } else {
            conn.query('SELECT set_limit(0.01);', function (err) {
              done(err, conn);
            });
          }
        });
      }
    }
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
  }
};