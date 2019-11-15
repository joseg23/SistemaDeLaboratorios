const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'admin',
        password: 'Lestrebien',
        database: 'proyectoweb'
    }
})

module.exports = knex;