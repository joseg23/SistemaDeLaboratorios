var knex = require('../db');

module.exports = {

    getAll(){
        return knex('usuario');
    },

    getOne(usuario){
        return knex('usuario').where('usuario',code);
    },

    create(usuario){
        return knex('usuario').insert(usuario,'*');
    },

    
}