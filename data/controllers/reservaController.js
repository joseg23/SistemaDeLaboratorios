var knex = require('../db');

module.exports= {
    getAll(){
        return knex('reserva');
    },

    getOne(id){
        return knex('reserva').where({id:id});
    },

    create(reserva){
        return knex('reserva').insert({
            laboratorio: reserva.laboratorio,
            code_usuario: reserva.code_usuario,
            materia: reserva.materia,
            title: reserva.title,
            status: reserva.status,
            start: reserva.start,
            fin: reserva.fin,
            color:reserva.color,
        }).returning('*');
    },

    update(id,reserva){
        return knex('reserva').where({id:id}).update({
            materia: reserva.materia,
            laboratorio: reserva.laboratorio,
            title:reserva.title,
            start:reserva.start,
            fin:reserva.fin,
            status: reserva.status,
            color: reserva.color,
        })
        .returning('*');
    },

    delete(id){
        return knex('reserva').where({id:id}).del();
    }
}