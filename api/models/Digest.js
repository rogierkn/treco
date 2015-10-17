/**
 * Digest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'INTEGER',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        text: {
            type: 'TEXT'
        },
        keywords: {
            collection: 'Keyword',
            via: 'digestId'
        },
        ip: {
            type: 'STRING'
        }
    }
};

