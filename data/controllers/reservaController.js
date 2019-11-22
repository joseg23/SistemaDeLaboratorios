var knex = require('../db');

module.exports.getAll = (req, res, next) => {
    knex.select('*').from('reserva')
    .asCallback(function(error,rows){
        if(error){
            throw error;
        }
        res.status(200).json(rows);
    })
}