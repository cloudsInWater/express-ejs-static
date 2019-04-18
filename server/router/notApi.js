const index =require('./../constroller');
const web=index.web;

module.exports = (app) =>{
    app.get('/',web.index)
}