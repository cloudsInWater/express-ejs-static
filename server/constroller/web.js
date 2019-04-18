
const mod={
    index:function(req, res){
        const cai='/';
        res.render('pages/index',{zh:cai});
    },
}
module.exports =mod;