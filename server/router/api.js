const question=require('./../constroller/question')

module.exports = (app) =>{
    app.post('/api/v1/XX',question.postQuestion)
}