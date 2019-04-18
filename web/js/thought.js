


$(function(){

    // 首页banner背景图片懒加载
    if($('.bg-show-later').length>0){
        $('.bg-show-later').each(function(){
            var bgCover=$(this).attr('data-bg');
            $(this).css({
                'background':`url('${bgCover}') no-repeat center center`
            })
        })
    }

    if($('.bg-show-later-soon').length>0){
        $('.bg-show-later-soon').each(function(){
            var bgCover=$(this).attr('data-bg');
            $(this).css({
                'background':`url('${bgCover}') no-repeat center center`,
                'background-size':'cover',
            })
        })
    }

    // 图片懒加载
    if($('.image-show-later').length>0){
        $('.image-show-later').each(function(){
            var picCover=$(this).attr('data-later');
            $(this).attr('src',picCover);
        })
    }

    var yearNow=(new Date()).getFullYear();
    if(yearNow==2018){
        $('.year-count').text('2018')
    }else{
        $('.year-count').text("2018-"+yearNow+"")
    }

    function whenWindowChange(){
        var width_w=$(window).width();
        if(width_w<1057){
            $('.remove-hover').each(function(){
                if($(this).hasClass('has-hover')){
                    $(this).removeClass('has-hover')
                }
            })
        }else{
            $('.remove-hover').each(function(){
                if(!$(this).hasClass('has-hover')){
                    $(this).addClass('has-hover')
                }
            })
        }
        changeLeft();
    }
    whenWindowChange();
    $(window).resize(function(){
        setTimeout(whenWindowChange,500);
    })

    $('.ice-explosion-item').hover(function(){
        $('.ice-explosion-item-bigger').removeClass('ice-explosion-item-bigger');
        $(this).addClass('ice-explosion-item-bigger');
    })

    $('.us-one-leader').on('click',function(){
        // if($(window).width()>1180){
            $('.us-one-leader').removeClass('leader-more');
            $(this).addClass('leader-more');
            let d_width=34.5;
            switch($(this).attr('data-id')){
                case 'one':
                    d_width=34.5;
                    break;
                case 'two':
                    d_width=103.5;
                    break;
                case 'three':
                    d_width=172.5;
                    break;
                case 'four':
                    d_width=207;
                    break;
                default:
                    break;
            }
            $('.leader-who div').width(d_width)
        // }
    })

    $('.video-play').on('click','.video',function(e){
        e.stopPropagation();
        if($('.all-video').hasClass('video-not')){
            $('.all-video').removeClass('video-not');
            $('.all-video video').get(0).play();
        }
        if(!$('.video').hasClass('do-not-been-saw')){
            $('.video').addClass('do-not-been-saw');
        }

    })


    function stop(){
        if(!$('.all-video').hasClass('video-not')){
            $('.all-video').addClass('video-not');
        }
        if($('.video').hasClass('do-not-been-saw')){
            $('.video').removeClass('do-not-been-saw');
        }
        $('.all-video video').get(0).pause();

    }
    $(document).keydown(function(e){
        if(e.keyCode==32 && !$('.all-video').hasClass('video-not')){
            if($('.all-video video').get(0).paused){
                $('.all-video video').get(0).play();
            }else{
                $('.all-video video').get(0).pause();
            }
        }
    });
    if($('.all-video').length>0){
        $('.all-video').get(0).oncontextmenu = function(e){
            e.returnValue = false;
        };
    }
    $('body').on('click','.go-out',stop);

    function choiceOne(canner,child,child_name,sub,sub_name){
        $(canner).on('click',child,function(){
            var id=$(this).attr('data-id');
            $("."+child_name+"").removeClass(child_name);
            $("."+sub_name+"").removeClass(sub_name);
            $("."+sub+"[data-id$="+id+"]").addClass(sub_name);
            $(this).addClass(child_name);
        })
    }

    // 选择
    choiceOne('.customers-page-can-left','li','this-been-choiced','customers-page-items','customers-page-item-show');
    choiceOne('.job-show-type','li','job-show-type-wanted','job-show-entry-item','job-show-right-now');
    choiceOne('.case-can-left','li','advisory-case-choice','advisory-case-right','right-ul-case-show');
    choiceOne('.very-detail-of-pro-top','.detail-pro-top-inner','detail-pro-top-inner-chioced','detail-pro-bottom-inner','detail-pro-bottom-inner-show');

    $('.alert-email').on('click',function(){
        $('.if-can-not-alert-email').removeClass('if-can-not-alert-email');
    })
    // 才云生活
    $('.from-sky-0').slick({
        arrows:true,
        prevArrow:$('.go-left-from-sky-0')[0],
        nextArrow:$('.go-right-from-sky-0')[0],
    })
    $('.from-sky-1').slick({
        arrows:true,
        prevArrow:$('.go-left-from-sky-1')[0],
        nextArrow:$('.go-right-from-sky-1')[0],
    })
    $('.from-sky-2').slick({
        arrows:true,
        prevArrow:$('.go-left-from-sky-2')[0],
        nextArrow:$('.go-right-from-sky-2')[0],
    })
    $('.from-sky-3').slick({
        arrows:true,
        prevArrow:$('.go-left-from-sky-3')[0],
        nextArrow:$('.go-right-from-sky-3')[0],
    })
    $('.from-sky-4').slick({
        arrows:true,
        prevArrow:$('.go-left-from-sky-4')[0],
        nextArrow:$('.go-right-from-sky-4')[0],
    })
    // 首页
    $('#top-banner').slick({
        arrows:true,
        infinite: true,
        speed: 300,
        autoplay:true,
        autoplaySpeed:5000,
        dotsClass:'pagination-top',
        dots:true,
        pauseOnDotsHover:true,
        prevArrow:$('.go-left-you-want')[0],
        nextArrow:$('.go-right-you-want')[0],

    })

    $('.trust-indeed-inner-items').slick({
        arrows:true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:$('.left-trust-you-want')[0],
        nextArrow:$('.right-trust-you-want')[0],
        responsive: [{
            breakpoint: 1100,
            settings: {
            slidesToShow: 'auto',
            infinite: true,
            centerMode: true,
            slidesToShow: 3,
            variableWidth:true,
            }}, {
            breakpoint: 850,
            settings: {
            slidesToShow: 2,
            centerMode: true,
            focusOnSelect: true,
            variableWidth:true,
            //   mobileFirst:true,
            }
        }, {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                focusOnSelect: true,
                variableWidth:true,
                // mobileFirst:true,
            }
        }]
    })
    $('.honor-show-can-ul').slick({
        arrows:true,
        slidesToShow: 4,
        prevArrow:$('.honora-left')[0],
        nextArrow:$('.honora-right')[0],
        responsive: [{
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            infinite: true
            }}, {
            breakpoint: 800,
            settings: {
            slidesToShow: 2,
            }
        }, {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
            }
        }]
    })

    // 菜单
    $('.phone-hanbao a').on('click',function(){
        if($('.hanbao').hasClass('hanbao-do')){
            $('.hanbao').removeClass('hanbao-do')
            $('.phone-hanbao').css('height','0');
            $('.phone-hanbao').css('opacity','0');
            $('.phone-hanbao').css('display','none');
        }
    })
    $('.banner-on-small-hanbao').on('click',function(e){
        if(!$('.hanbao').hasClass('hanbao-do')){
            $('.hanbao').addClass('hanbao-do')
            $('.phone-hanbao').css('height','auto');
            $('.phone-hanbao').css('opacity','1');
            $('.phone-hanbao').css('display','block');
            e.stopPropagation();
            return;
        }
        if($('.hanbao').hasClass('hanbao-do')){
            $('.hanbao').removeClass('hanbao-do')
            $('.phone-hanbao').css('height','0');
            $('.phone-hanbao').css('opacity','0');
            $('.phone-hanbao').css('display','none');
            e.stopPropagation();
            return;
        }
    })
    $('.phone-hanbao').click(function(e){
        e.stopPropagation();
    })
    $('.header-to-title').on('click',function(e){
        if($(window).width()<1057){
            e.stopPropagation();
            if($(this).parent().hasClass('header-to-long')){
                $(this).parent().removeClass('header-to-long');
                return false;
            }
            $('.header-to-small').each(function(){
                if($(this).hasClass('header-to-long') && !$(this).hasClass('has-two-told')){
                    $(this).removeClass('header-to-long')
                }
            })
            $(this).parent().addClass('header-to-long');
            return false;
        }
    });
    $('.gotcha-you').on('click',function(e){
        if($(window).width()<1137){
            if($(this).parent().hasClass('sunshine-hot-longer')){
                $(this).parent().removeClass('sunshine-hot-longer');
                return false;
            }
            $('.sunshine-hot').each(function(){
                if($(this).hasClass('sunshine-hot-longer')){
                    $(this).removeClass('sunshine-hot-longer')
                }
            })
            $(this).parent().addClass('sunshine-hot-longer');
        }
    });

    $('.outer-container').on('click',function(e){
        if($('.click-more-items').hasClass('been-choice-more')){
            $('.click-more-items').removeClass('been-choice-more')
        }
        if($(window).width()<1137){
            if($('.hanbao').hasClass('hanbao-do')){
                $('.hanbao').removeClass('hanbao-do')
                $('.phone-hanbao').css('height','0');
                $('.phone-hanbao').css('opacity','0');
                $('.phone-hanbao').css('display','none');
            }
        }
    })
    // CKA培训页面
    function just_thisO(i){
        if(!$('.train-left-can li').eq(i).hasClass('train-know-this')){
            $('.train-know-this').removeClass('train-know-this');
            $('.train-left-can li').eq(i).addClass('train-know-this');
        }
    }
    function changeLeft(){
        if($('.train-can').length>0 && $(window).width()>960){
            var top_cka=$('.train-right-can').offset().top;
            var top_max_cka=$('.train-right-can-six').offset().top;
            var top_go=$(window).scrollTop();
            if(top_go>top_cka && top_go<top_max_cka){
                if(!$('.train-left-can ul').hasClass('train-left-can-ul-fixed')){
                    $('.train-left-can ul').addClass('train-left-can-ul-fixed');
                }
                var ul_width=$('.train-left-can').width();
                var ul_left=$('.train-left-can').offset().left;
                $('.train-left-can ul').width(ul_width);
                $('.train-left-can ul').css({
                    width:ul_width+'px',
                    left:ul_left+'px',
                });
            }else{
                if($('.train-left-can ul').hasClass('train-left-can-ul-fixed')){
                    $('.train-left-can ul').removeClass('train-left-can-ul-fixed')
                }
            }
        }
    }
    if($('.train-can').length>0 && $(window).width()>960){
        changeLeft();
        var space=100;
        var top_cka=$('.train-right-can').offset().top;
        var top_max_cka=$('.train-right-can-six').offset().top;
        var title_7=$('.train-right-can-six').offset().top;
        var title_6=$('.train-right-can-five').offset().top;
        var title_5=$('.train-right-can-four').offset().top;
        var title_4=$('.train-right-can-three-two').offset().top;
        var title_3=$('.train-right-can-three-one').offset().top;
        var title_2=$('.train-right-can-two').offset().top;
        var title_1=$('.train-right-can-one').offset().top;

        var space_top=0;
        // 跳转
        $('.train-left-can').on('click','li',function(){
            $('.train-know-this').removeClass('train-know-this');
            if(!$(this).hasClass('train-know-this')){
                $(this).addClass('train-know-this');
                var one_hand=$(this).attr('data-go');
                var top_go=0;
                switch (one_hand) {
                    case '1':
                        top_go=title_1-space_top;
                        break;
                    case '2':
                        top_go=title_2-space_top;
                        break;
                    case '3':
                        top_go=title_3-space_top;
                        break;
                    case '4':
                        top_go=title_4-space_top;
                        break;
                    case '5':
                        top_go=title_5-space_top;
                        break;
                    case '6':
                        top_go=title_6-space_top;
                        break;
                    case '7':
                        top_go=title_7-space_top;
                        break;
                    default:
                        break;
                }
                $('html,body').animate({
                    scrollTop: top_go+'px'
                }, 100);
            }
        })
        $(document).scroll(function(e){
            var top_go=$(window).scrollTop();
            changeLeft();
            if( top_go < title_2-space ){
                just_thisO(0)
            }
            if( top_go > title_2-space && top_go < title_3-space ){
                just_thisO(1)
            }
            if( top_go > title_3-space && top_go < title_4-space ){
                just_thisO(2)
            }
            if( top_go > title_4-space && top_go < title_5-space ){
                just_thisO(3)
            }
            if( top_go > title_5-space && top_go < title_6-space ){
                just_thisO(4)
            }
            if( top_go > title_6-space && top_go < title_7-space ){
                just_thisO(5)
            }
            if( top_go > title_7-space ){
                just_thisO(6)
            }
        })
    }

    // $('.banner-bg-run').on('click',function(e){
    //     var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
    //     var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
    //     console.log('left,top',xx,yy);
    // })
})
