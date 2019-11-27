var knex = require('../db');

module.exports = {
    DeleteOne(id){
        return knex('sessions').where({ sid: id}).del();
    }
}