# anchorPosition
anchorPosition锚点导航
## 当页面滚动时，导航与对应的页面保持同步切换：
![image](https://github.com/xiaojiandong/anchorPosition/blob/master/img/anchor-view.png)

## 动态为每个页面赋值，并且计算其offset().top值：
```js
var singleComicTopArr = []; // 存储每个内容的top值
    // 遍历对象
    for(var index in comicListObj){
        var contentSlideObj = "<section class='slide-content-common js_slide_content_"+index+
            "' id='js_slide_content_"+index+"'>" +
            "进入 - " +comicListObj[index].comicName+" : 剧场版"+index+"</section>";
        contentWrapObj.append( contentSlideObj );
        var contentObj = $('.slide-content-common');
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
        $(value).before("<div class='top-absolute-wrap' id='js_top_absolute_wrap_"+index+"'></div>");
        singleComicTopArr[index] = $(value).offset().top;
        $('.js_slide_content_'+index).css('height',comicListObj[index].comicHeight);
    });
    // todo 其他逻辑
```
## 绑定窗口的滚动事件：
```js
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
    // todo 其他逻辑
```

