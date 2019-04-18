
// canSlide 被选择的内容
// tabChioce 包裹所以选项卡选项的元素的名字
// tabChioceName 选项卡替换的类名
// tabChioceItem 选项卡选项的元素名
// tabChiocewho 找到选项卡元素的指引

function swiperTabs(canSlide,tabChioce,tabChioceName,tabChioceItem,tabChiocewho) {
    var tabSwiper1 = new Swiper(canSlide, {
        autoHeight: true, // 高度随内容变化
        spaceBetween:10,
        on:{
            slideChangeTransitionStart: function(){
                $(tabChiocewho).each(function(){
                    if($(this).hasClass(tabChioceName)){
                        $(this).removeClass(tabChioceName);
                    }
                })
                $(tabChiocewho).eq(this.activeIndex).addClass(tabChioceName);
            },
        }
    })
    $(tabChioce).on('click',tabChioceItem,function(){
        let now=$(this).index();
        $(tabChiocewho).each(function(){
            if($(this).hasClass(tabChioceName)){
                $(this).removeClass(tabChioceName);
            }
        })
        $(this).addClass(tabChioceName);
        tabSwiper1.slideTo(now, 500, false);
    })
}
