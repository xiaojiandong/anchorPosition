
// http://apitest.yourdream.cc/a/activity/160320/?disFlags=0&activityKey=promotion320-SET

$(function(){
   var mySwiper;
   initTabSwiper();
   function initTabSwiper(){
       var that = this;
       mySwiper = new Swiper('.swiper-container', {
           pagination: '.swiper-pagination',
           slidesPerView: 'auto',
           paginationClickable: true,
           //spaceBetween: 20,
           watchSlidesProgress : true,
           onTransitionEnd: function(swiper){
               console.log('swiper过度结束');
           }
       });
   }
   var swiperWrapperObj = $('.js_swiper_wrapper');
   var contentWrapObj = $('.js_content_wrap');
   var comicListObj = {
         0 : {
             'comicName' : '死神',
             'comicHeight' : '600px'
         },
         1 : {
             'comicName' : '秦时明月',
             'comicHeight' : '980px'
         },
         2: {
             'comicName' : '火影忍者',
             'comicHeight' : '1200px'
         },
         3: {
             'comicName' : '海贼王',
             'comicHeight' : '1100px'
         },
         4: {
             'comicName' : '妖精的尾巴',
             'comicHeight' : '750px'
         },
         5: {
             'comicName' : '名侦探柯南',
             'comicHeight' : '1050px'
         },
         6: {
             'comicName' : '头文字D',
             'comicHeight' : '1340px'
         },
         7: {
             'comicName' : '家庭教师',
             'comicHeight' : '640px'
         },
         8: {
             'comicName' : '银魂',
             'comicHeight' : '640px'
         },
         9: {
             'comicName' : '画江湖',
             'comicHeight' : '1240px'
         }
        };
    var singleComicTopArr = []; // 存储每个内容的top值
    // 遍历对象
    for(var index in comicListObj){
        var contentSlideObj = "<section class='slide-content-common js_slide_content_"+index+
            "' id='js_slide_content_"+index+"'>" +
            "进入 - " +comicListObj[index].comicName+" : 剧场版"+index+"</section>";
        contentWrapObj.append( contentSlideObj );
        var contentObj = $('.slide-content-common');
//        contentObj.css({
//           'height' : comicListObj[index].comicHeight
//        });
        if(index % 2 == 0){
            contentObj.eq(index).css({
               'background-color' : 'rgba(250,250,100,0.4)'
            });
        }else{
            contentObj.eq(index).css({
                'background-color' : 'rgba(0,0,100,0.4)'
            });
        }
    }

    $('.slide-content-common').wrap("<div class='outer-relative-wrap'></div>"); // 用于相对定位
    $('.slide-content-common').each(function(index , value ){
//        $('.js_slide_content_'+index).before("<div class='top-absolute-wrap' id='js_top_absolute_wrap_"+index+"'></div>");
        $(value).before("<div class='top-absolute-wrap' id='js_top_absolute_wrap_"+index+"'></div>");
        singleComicTopArr[index] = $(value).offset().top;
        $('.js_slide_content_'+index).css('height',comicListObj[index].comicHeight);
    });

    // 点击单个子tab，切换对应的内容
    $('.js_tab_slide').on('click' , function(e){
      var currentTabSlideObj = $(e.currentTarget);
        $('.js_tab_slide').removeClass('active-tab');
        currentTabSlideObj.addClass('active-tab');
      var currentTabSlideIndex = $(this).index();
//        $('.js_slide_content_'+currentTabSlideIndex);
        window.location.replace( '#js_top_absolute_wrap_'+currentTabSlideIndex);

        console.log(currentTabSlideIndex);
    $('.js_split_block').show();
        mySwiper1 = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            //spaceBetween: 20,
            watchSlidesProgress : true,
            onTransitionEnd: function(swiper){
                console.log('swiper过度结束');
            }
        });
//        setTabActiveItem(currentTabSlideIndex);
        mySwiper1.slideTo(currentTabSlideIndex, 600, false);
    });

    var tabNavWrapScrollTop = $('.js_tab_nav_wrap').offset().top;
    var activeIndex = 0;
    var LONG_HEIGHT = 40;
    // 绑定窗口滚动事件，tab-nav-wrap悬浮置顶
    $(window).on('scroll' , function(){
      var currentWinScrollTop = $(window).scrollTop();
      if(currentWinScrollTop >= tabNavWrapScrollTop){
          $('.js_split_block').show();
          $('.js_tab_nav_wrap').addClass('fixed-top');
      }else{
          $('.js_split_block').hide();
          $('.js_tab_nav_wrap').removeClass('fixed-top');
      }
        // 遍历当前每个内容的offset().top值
        singleComicTopArr.forEach(function(value ,index){
           if(index == 0){
               setTabActiveItem(0);
               mySwiper.slideTo(0, 600, false);
           }
           if(index >=1 && currentWinScrollTop + LONG_HEIGHT > value ){
               activeIndex = index;
               setTabActiveItem(activeIndex);
               mySwiper.slideTo(activeIndex, 600, false);
           }
        });
    });
//    console.log(singleComicTopArr);

    // 设置当前高亮的子导航
    function setTabActiveItem(activeIndex){
      var tabSlideList = $('.js_tab_slide');
        tabSlideList.removeClass('active-tab');
        tabSlideList.eq(activeIndex).addClass('active-tab');
//        console.log('setTabActiveItem : ' + activeIndex);
    }

 });

