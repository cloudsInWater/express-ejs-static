$(function(){
    //判断是否每一个必填的内容是否都已经填了
    var name=false,company=false,city=false,products=false,number=false,emailF=true;
    function canSubmitJ(a,b,c,d,e,f){
        if(a && b && c && d && e && e!='guess' && f){//can-submit 意味着可以提交了
            if(!$('.when-I-submit').hasClass('can-submit')){
                $('.when-I-submit').addClass('can-submit')
            }
        }else{
            if($('.when-I-submit').hasClass('can-submit')){
                $('.when-I-submit').removeClass('can-submit')
            }
        }
    }
    // 增加错误状态 或者除去错误状态
    // 产品
    function itemShow(item){
        if(item && item.length>0 ){
            if($('.offer-some-choice-can-outer').hasClass('wrong-enter')){
                $('.offer-some-choice-can-outer').removeClass('wrong-enter');
                $('.offer-some-choice-can-outer').parent().find('.must-be-input').removeClass('must-be-input-indeed');
            }
            products=true
        }else{
            if(!$('.offer-some-choice-can-outer').hasClass('wrong-enter')){
                $('.offer-some-choice-can-outer').addClass('wrong-enter');
                $('.offer-some-choice-can-outer').parent().find('.must-be-input').addClass('must-be-input-indeed');
            }
            products=false
        }
    }
    // input
    function wrongShow(input,a,rain){
        var notice=''
        if(a==1){
            notice='此处内容不能为空'
        }
        if(a==2){
            notice='输入的手机号码有误！'
        }
        if(a==3){
            notice='文字内容不超过300字'
        }
        if(a==4){
            notice='请检查填写的邮件是否正确'
        }
        if(!rain){
            if(!input.hasClass('wrong-enter')){
                input.parent().prev().text(notice)
                input.parent().find('.must-be-input').addClass('must-be-input-indeed')
                input.addClass('wrong-enter')
            }
            return;
        }else{
            if(input.hasClass('wrong-enter')){
                input.parent().prev().text('')
                input.parent().find('.must-be-input').removeClass('must-be-input-indeed')
                input.removeClass('wrong-enter')
            }
            return;
        }
    }
    // 输入校验
    function whenEnter(input){
        var who=input.attr('name')
        var value=input.val();
        switch(who){
            case 'name':
                if(value && value.length>0 && value.length<150){
                    name=true;
                }else{
                    name=false;
                }
                wrongShow(input,1,name)
                break;
            case 'company':
                if(value && value.length>0 && value.length<150){
                    company=true;
                }else{
                    company=false;
                }
                wrongShow(input,1,company)
                break;
            case 'city':
                if(value && value.length>0 && value.length<150){
                    city=true;
                }else{
                    city=false;
                }
                wrongShow(input,1,city)
                break;
            case 'number':
                input.val(value.replace(/[^0-9]/ig,''));
                if(value && value.length<20){
                    var parsest=parseInt(value);
                    if(value.match(/^1[3456789]\d{9}$/)){
                        number=true;
                        if(parsest==0 ){
                            number=false;
                        }
                    }else{
                        number='guess';
                    }
                }else{
                    number=false;
                }
                wrongShow(input,2,number)
                break;
            case 'email':
                var rule=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
                if(!value || (value && rule.test(value)) ){
                    emailF=true;
                }
            default:
                break;
        }
        canSubmitJ(name,company,city,products,number,emailF)
    }
    // 添加或者移除选项
    function optionsDR(input,method){
        var call_id=input.attr('data-id');
        if(method==1){//添加
            if($('.offer-some-choice-items').text()!=='' && $('.offer-some-choice-item').length<1){
                $('.offer-some-choice-items').text('')
            }
            var call_value=input.find('p').text();
            var svg_=$('#want-consult').attr('data-svg');
            var html="<div class='offer-some-choice-item' data-id='"+call_id+"'><span>"+call_value+"</span><div class='want-this-gone'>"+svg_+"</div></div>"
            $('.offer-some-choice-items').append(html)
        }if(method==2){
            $('.offer-some-choice-item').each(function(){
                if($(this).attr('data-id')==call_id){
                    $(this).remove()
                }
            })
            if($('.offer-some-choice-items').text()==''&& $('.offer-some-choice-item').length<1){
                $('.offer-some-choice-items').text(' ')
            }
        }else if(method==3){
            call_id=input.parent().attr('data-id')
            $('.offer-some-choice-can-come li').each(function(){
                if($(this).find('span').hasClass('want-this-up') && $(this).attr('data-id')==call_id){
                    $(this).find('span').removeClass('want-this-up');
                    input.parent().remove()
                }
            })
            if($('.offer-some-choice-items').text()==''&& $('.offer-some-choice-item').length<1){
                $('.offer-some-choice-items').text(' ')
            }
        }
        itemShow($('.offer-some-choice-item'))
        canSubmitJ(name,company,city,products,number,emailF)
    }
    $('.where-you-input').find('input').on('input',function(e){
        whenEnter($(this))
    })
    $('.where-you-input').find('input').on('blur',function(e){
        whenEnter($(this))
        if($(this).attr('name')=='number'){
            if(!($(this).val() && $(this).val().match(/^1[3456789]\d{9}$/))){
                number=false;
                wrongShow($(this),2,number)
            }
        }
        if($(this).attr('name')=='email'){
            var rule=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            var value=$(this).val();
            if(!value || (value && rule.test(value)) ){
                emailF=true;
            }else if(value && !rule.test(value)){
                emailF=false;
            }
            wrongShow($(this),4,emailF)
        }
    })
    $(".text-eare").on('input',function(){
        if($(this).val().length>499){
            $(this).val($(this).val().slice(0,499))
            wrongShow($(this),3,false)
        }else{
            wrongShow($(this),3,true)
        }
    })
    // 出现
    $('.offer-some-choice-can-outer').on('click',function(e){
        e.stopPropagation();
        if($('.offer-some-choice-item').length<1){
            if(!$('.offer-some-choice-can-come').hasClass('offer-some-choice-can-come-show')){
                $('.offer-some-choice-can-come').addClass('offer-some-choice-can-come-show')
                $('.offer-some-choice-close').addClass('offer-some-choice-open')
                return 0;
            }else{
                $('.offer-some-choice-can-come').removeClass('offer-some-choice-can-come-show')
                $('.offer-some-choice-close').removeClass('offer-some-choice-open')
                return 0;
            }
        }
    })
    $('.offer-some-choice-close').on('click',function(e){
        e.stopPropagation();
        if(!$('.offer-some-choice-can-come').hasClass('offer-some-choice-can-come-show')){
            $('.offer-some-choice-can-come').addClass('offer-some-choice-can-come-show')
            $('.offer-some-choice-close').addClass('offer-some-choice-open')
            return 0;
        }else{
            $('.offer-some-choice-can-come').removeClass('offer-some-choice-can-come-show')
            $('.offer-some-choice-close').removeClass('offer-some-choice-open')
            return 0;
        }
    })
    $(document).click(function(e){
        var _con = $('.offer-some-choice-div');
        e.stopPropagation();
        if(!_con.is(e.target) && _con.has(e.target).length === 0 && $('.offer-some-choice-can-come').hasClass('offer-some-choice-can-come-show') ){
            $('.offer-some-choice-can-come').removeClass('offer-some-choice-can-come-show')
            $('.offer-some-choice-close').removeClass('offer-some-choice-open')
        }
      });
    // 选择
    $('.offer-some-choice-can-come li').on('click',function(e){
        e.stopPropagation();
        if(!$(this).find('span').hasClass('want-this-up')){
            $(this).find('span').addClass('want-this-up');
            optionsDR($(this),1)
            return ;
        }else{
            $(this).find('span').removeClass('want-this-up');
            optionsDR($(this),2)
            return ;
        }
    })
    // 删除
    $('.offer-some-choice-can').on('click','.want-this-gone',function(e){
        optionsDR($(this),3)
    })
    // 提交
    $('.when-I-submit').on('click',function(){
        if(!$(this).hasClass('can-submit')){
            $('.where-you-input').find('input').each(function(){
                whenEnter($(this))
            })
            if(number=="guess"){
                wrongShow($(".where-you-input input[name='number']"),2,false)
            }
            itemShow($('.offer-some-choice-item'));
            return;
        }else{
            var what='';
            $('.offer-some-choice-item').each(function(){
                what=what+'-'+$(this).find('span').text();
            })
            var data={
                'city':$(".where-you-input input[name='city']").val(),
                'name': $(".where-you-input input[name='name']").val(),
                'phone': $(".where-you-input input[name='number']").val(),
                'company':$(".where-you-input input[name='company']").val(),
                'email':$(".where-you-input input[name='email']").val() || '没有填写',
                'what':what,
                'entry_word':$('.contact-us-can-column').attr('data-word'),
                'entry_wei':$('.contact-us-can-column').attr('data-go-from'),
                'entry_m':$('.contact-us-can-column').attr('data-show-m'),
                'other':$(".where-you-input textarea").val().toString() || 'TA 没有填写内容...',
            }
            $(this).removeClass('can-submit')
            var add_this=$(this);
            $.ajax({
                method:'POST',
                url:'/api/v1/question',
                data:data,
            }).done(function(res){
                add_this.addClass('can-submit')
                if(res.success){
                    if($(".go-index").length>0){
                        var href=window.location.href.replace('consult','');
                        window.location.href=href;
                    }else{
                        if(!$('.info-back-tell-can').hasClass('contact-layout-can-show')){
                            $('.info-back-tell-bottom p').text('已收到您的信息')
                            $('.info-back-tell-bottom h2').text('谢谢,')
                            $('.info-back-tell-can').addClass('contact-layout-can-show');
                        }
                        $('.offer-some-choice-item').remove();
                        $('.where-you-input').find('input').val('');
                        $(".text-eare").val('');
                        $('.offer-some-choice-items').text(' ');
                        $('.want-this-up').removeClass('want-this-up');
                    }
                }else{
                    if(!$('.info-back-tell-can').hasClass('contact-layout-can-show')){
                        $('.info-back-tell-bottom h2').text('对不起，发生错误')
                        $('.info-back-tell-bottom p').text('请重试')
                        $('.info-back-tell-can').addClass('contact-layout-can-show');
                    }
                }
            }).fail(function(jqXHR, textStatus){
                add_this.addClass('can-submit')
            })
        }
    })
})

