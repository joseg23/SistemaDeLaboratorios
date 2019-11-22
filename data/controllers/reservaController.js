var knex = require('../db');

module.exports= {
    getAll(){
        return knex('reserva');
    },

    getOne(laboratorio){
        return knex('reserva').where('laboratorio',laboratorio);
    },

    create(reserva){
        return knex('reserva').insert(reserva,'*');
    },

    update(laboratorio, reserva){
        return knex('reserva').where('laboratorio', id).update(reserva,'*');
    },

    delete(laboratorio){
        return knex('reserva').where('laboratorio',laboratorio).del();
    }
}