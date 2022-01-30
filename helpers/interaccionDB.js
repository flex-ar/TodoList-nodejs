const { writeFileSync, readFileSync, existsSync } = require('fs');

const PATH = './db/data.json';

const guardarDB = data => {
    writeFileSync( PATH, data );
};

const leerDB = () => {
    if ( !existsSync( PATH ) ) return false;
    return readFileSync( PATH, 'utf-8');
};

module.exports = { guardarDB, leerDB };