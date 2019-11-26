var knex = require('../db');

module.exports = {

    getAll(){
        return knex('usuario');
    },

    getOne(email){
        return knex('usuario').where('email',email);
    },

    create(usuario){
        return knex('usuario').insert({
            nombre: usuario.nombre,
            usernamne: usuario.username,
            contrasenia: usuario.contrasenia,
            emial: usuario.email
        }).returning('*');
    }   
};