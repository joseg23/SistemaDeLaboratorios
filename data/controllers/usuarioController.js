var knex = require('../db');

module.exports = {

    getAll(){
        return knex('usuario');
    },

    getOne(email){
        return knex('usuario').where({correo:email});
    },

    create(usuario,password){
        return knex('usuario').insert({
            nombre: usuario.nombre,
            username: usuario.username,
            contrasenia: password,
            correo: usuario.correo,
            tipo: 'Estudiante'
        }).returning('*');
    }   
};