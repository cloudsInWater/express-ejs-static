const NEV_NOW = process.env.NODE_ENV;
let config;
if(NEV_NOW === 'development'){
  config = require('./config.dev.json');
}else if(NEV_NOW === 'production'){
  config = require('./config.prod.json');
}
module.exports = {
    db: config.db,
    dbName: 'home',
    host: '0.0.0.0',
    upload_file_url:"XXXXXXX",
};