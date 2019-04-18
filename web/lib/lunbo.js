// //无缝轮播
// // ;(function($) {
//     function Carouse(){
//         this.init=function(can,elem1,elemL,elemR,span,time){
//             this.i=0;
//             this.elem1=elem1;
//             this.span=span;
//             this.elemL=elemL;
//             this.elemR=elemR;
//             this.can=can;
//             this.time=time || 3000;
//             // this.elem1.hasClass('litter-move')
//             elem1.get(0).innerHTML+=elem1.get(0).innerHTML;
//             if(can.hasClass('width-contra')){
//                 var _width=$(window).width();
//                 if(_width<1296){
//                     _width=1296;
//                 }
//             }
//             if(!can.hasClass('width-contra')){
//                 var _width=elem1.children("li").width();
//             }
//             elem1.get(0).style.width=_width*elem1.children("li").length+"px";
//             this.leng=elem1.children("li").length/2;
//             this.speed=-1*(elem1.find('li').width());
//             this.ulwidth=this.leng * _width;
//             this._width=_width;
//             this.addEvent(this.can,this.elem1,this.elemL,this.elemR,this.span);
//         },
//             this.addEvent=function(can,elem1,elemL,elemR,span){
//                  // 设置隐藏属性和改变可见属性的事件的名称
//                  var hidden, visibilityChange;
//                  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
//                      hidden = "hidden";
//                      visibilityChange = "visibilitychange";
//                  } else if (typeof document.msHidden !== "undefined") {
//                      hidden = "msHidden";
//                      visibilityChange = "msvisibilitychange";
//                  } else if (typeof document.webkitHidden !== "undefined") {
//                      hidden = "webkitHidden";
//                      visibilityChange = "webkitvisibilitychange";
//                  }
//                 //   页面隐藏状态or展示状态
//                  document.addEventListener(visibilityChange, ()=>{
//                     if (document[hidden]) {
//                         this.stop();
//                         return 0;
//                     } else {
//                         this._interval=setInterval(()=>{this.run(this.elem1);this.spanThing(this.span);},this.time)
//                     }
//                  }, false);
//                 // $('body').hover(()=>{this._interval=setInterval(()=>{this.run(this.elem1);this.spanThing(this.span);},this.time)},()=>{this.stop()})
//                 this.can.hover(()=>{this.stop()},()=>{
//                     this._interval=setInterval(()=>{this.run(this.elem1);this.spanThing(this.span);},this.time)
//                 })
                
//                 this.elemL.on('click',()=>{
//                     this.prev(this.elem1);
//                 })
//                 this.elemR.on('click',()=>{
//                     this.next(this.elem1);
//                 })
//                 let _this=this;
//                 if(this.span){
//                     this.span.on('mouseover','span',function(e){
//                         let now=$(this).index();
//                         _this.span.children('span').each(function(){$(this).removeClass('span-now')})
//                         $(this).addClass('span-now');
//                         _this.changes(_this.elem1);
//                         _this.i=now;
//                         _this.elem1.css('transition',"0.5s all linear")
//                         _this.elem1.get(0).style.left=_this.speed*_this.i+"px";
//                     })
//                 }
    
//             },
//             this.stop=function(){
//                 clearInterval(this._interval)
//             },
//             this.prev=function(elem1){
//                 this.i--;
//                 elem1.css('transition',"0.5s all linear")
//                 elem1.get(0).style.left=this.speed*this.i+"px";
//                 if(this.i==-1){
//                     this.i=this.leng;
//                     elem1.get(0).style.transition="0s all linear"
//                     elem1.get(0).style.left=this.speed*this.i+"px";
//                     setTimeout(()=>{
//                         this.i--;
//                         elem1.get(0).style.transition="0.5s all linear"
//                         elem1.get(0).style.left=this.speed*this.i+"px";
//                     },50)
//                 }
//                 this.spanThing(this.span);
//             },
//             this.next=function(elem1){
//                 this.i++;
//                 elem1.css('transition',"0.5s all linear")
//                 elem1.get(0).style.left=this.speed*this.i+"px";
//                 if(this.elem1.hasClass('litter-move')){
//                     if( -1*this.elem1.position().left>this._width+this.ulwidth/2 ){
//                         setTimeout(()=>{
//                             this.i=0;
//                             elem1.get(0).style.transition="0s all linear"
//                             elem1.get(0).style.left=this.speed*this.i+"px";
//                         },500)
//                     }
//                 }else{
//                     if( this.i==this.leng*2-1 ){
//                         setTimeout(()=>{
//                             this.i=this.leng-1;
//                             elem1.get(0).style.transition="0s all linear"
//                             elem1.get(0).style.left=this.speed*this.i+"px";
//                         },500)
//                     }
//                 }
//                 this.spanThing(this.span);
//             },
//             this.run=function(elem1){
//                 this.i++;
//                 elem1.css('transition',"0.5s all linear")
//                 elem1.css('left',`${this.i*this.speed}px`)
//                 if(this.i>this.leng-1){
//                     setTimeout(()=>{
//                         this.changes(elem1);
//                     },500)
//                 }
//             }
//             this.changes=function(elem1){
//                 elem1.css('transition',"0s all linear")
//                 switch(this.i){
//                     case this.leng:
//                         this.i=0;
//                         break;
//                     case this.leng+1:
//                         this.i=1;
//                         break;
//                     case this.leng+2:
//                         this.i=2;
//                         break;
//                     case this.leng+3:
//                         this.i=3;
//                         break;
//                     default:
//                         break;
//                 }
//                 elem1.css('left',`${this.i*this.speed}px`)
//              }
//              this.spanThing=function(span){
//                 if(!span){
//                     return 0;
//                 }
//                  span.children('span').each(function(){$(this).removeClass('span-now')})
//                 if(this.i<this.leng){
//                     $(span.children('span')[this.i]).addClass('span-now')
//                 }else{
//                     $(span.children('span')[this.i-this.leng]).addClass('span-now')
//                 }
//              }
//     }
    
//     // })(jQuery);
    