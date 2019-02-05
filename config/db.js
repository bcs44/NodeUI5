let username = 'bsilva4';
let password = 'Bruna_silva4';
let dbhost = 'ds111765.mlab.com';
let port = '11765';
let dbname = 'db_pacientes';

module.exports = {
    url: `mongodb://${username}:${password}@${dbhost}:${port}/${dbname}`
};
