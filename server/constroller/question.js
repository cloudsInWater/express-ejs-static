const moment = require('moment');
const _ = require('underscore');
const nodemailer = require('nodemailer');
const question=require('./../model/question')
const questions={
    postQuestion:async function(req,res){
        res.send({error:'error really happend.'});
    }
}
module.exports =questions;