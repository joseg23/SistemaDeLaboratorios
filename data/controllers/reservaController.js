var knex = require('../db');

module.exports= {
    getAll(){
        return knex('reserva');
    },

    getOne(id){
        return knex('reserva').where({id:id});
    },

    create(reserva){
        return knex('reserva').insert(reserva,'*');
    },

    update(id,reserva){
        return knex('reserva').where({id:id}).update({
            materia: reserva.materia,
            laboratorio: reserva.laboratorio,
            title:reserva.title,
            start:reserva.start,
            fin:reserva.fin,
        })
        .returning('*');
    },

    delete(id){
        return knex('reserva').where({id:id}).del();
    }
}