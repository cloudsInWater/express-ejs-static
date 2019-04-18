
module.exports =function(app){
    require('./notApi')(app)
    require('./api')(app)
}