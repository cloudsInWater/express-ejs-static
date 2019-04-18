var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var askSchema = new Schema({
    about: String,                  //咨询内容
    name: String,                //姓名
    company: String,               //公司
    phone: Number,               //手机号
    etime:{type: Date, default: Date.now },//时间
    connecto:{type: Boolean, default: false },
    city:{type:String,default:'默认的'},
    businessNeeds:{type:String,default:'之后详谈'},
    Mobile_if:{type: Boolean, default: false },//是否是移动端 false表示非移动端
    from_word_wechat:{type:String,default:'null'}
});
mongoose.model('question', askSchema);
module.exports=mongoose.model('question')