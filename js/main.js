/*
 * 自己的JS脚步
 * @Author: iceStone
 * @Date:   2015-12-12 10:59:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-02-06 13:31:57
 */

'use strict';
//入口函数 当文档加载完成才会执行
$(function(){

  
  // $("#main_ad> .corousel-inner > .item") 获取到的是多个元素 要遍历
  //if($(".item").length>0){console.log("存在");}else{console.log("不存在");}

    // $("#main_ad> .carousel-inner > .item").each(function(){
    //     if(this instanceof jQuery){
    //         console.log(1);
    //     }
    //     if($(this) instanceof jQuery)
    //     {
    //         console.log(2);
    //     }
    // });



function resize(){
    //获取屏幕的宽度
    var windowWidth=$(window).width();
    //判断屏幕属于大还是小
    var isSmallScreen = windowWidth<768;
    //根据大小为界面上的每一张轮播图设置背景
	  $("#main_ad> .carousel-inner > .item").each(function(i,item){


  	  var $item=$(item);//因为拿到的是DOM对象需要转换

  	  var imgSrc=$item.data(isSmallScreen? "image-xs":"image-lg") ;

          // jQuery方式
          // $element.data()
          // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
          // 函数的参数是我们要取得属性名称（abc）
          //
          // $element.attr('data-abc')
          //
          // JS中的写法
          // element.dataset['abc']
          //
          // element.getAttribute('data-abc')
          // element.setAttribute('data-abc','')

          $item.css("backgroundImage","url('"+imgSrc+"')");
          //原因我们需要小图时， 尺寸等比例变化，所以小图时我们使用img方式 其他方式使用background方式
          if (isSmallScreen){
              $item.html('<img src="'+imgSrc+'" alt="">');
          }else{
            $item.empty() ;  //设置成空 如果你用.html() 不管用 还是得用empty()
          }

  });
}

//初始化tooltip
//$('[data-toggle]').tooltip();

//控制标签容器的宽度
var $ulContainar = $('.nav-tabs');
// console.log($ulContainar);
//先设置一个宽度0 再进行累加 ,
//因为本身有paddingleft =20
  var lis_Width = 20;
  //遍历子元素
  // console.log($ulContainar.children()); 
  $ulContainar.children().each(function(index, element) {
     //console.log(element.clientWidth);
     //console.log($(element.width()));
     lis_Width+=element.clientWidth;
  });
  //此时width等于所有li宽度的总和
    // 判断ul的宽度 是否超出屏幕，如果超出那就显示横向滚动条
    if(lis_Width > $(window).width()){
    // console.log(lis_Width);
     $ulContainar.css('width',lis_Width)
         .parent().css('overflow-x','scroll');                       }



$(window).on("resize",resize).trigger("resize");



    //给a注册点击事件
    var $newTitle=$('.news-title');

    $('#news .nav-pills a').on('click',function(){
        //获取当前点击元素 dom转jquery
        var $this=$(this);
        //获取对应的title值
        var title=$this.data('title');
        //将title设置到相应的位置
        $newTitle.text(title);
    });



    //1.获取手指在轮播图元素上的一个滑动方向（左右）


    //获取界面上轮播图容器
    var $carousels=$('.carousel');
    var startX,endX;  //设置全局变量
    var offset=50;
    //注册滑动事件    这里的案例可以看X的偏移量 最开始按下的x点减去松手的X点 正数左滑，负数右滑
    $carousels.on('touchstart',function(e){
         //手指触摸开始时记录一下手指所在的坐标X1
        startX=e.originalEvent.touches[0].clientX;
        console.log(startX);
    });

    //$carousels.on('touchmove',function(e){
    //   //变量重复赋值
    //    endX=e.originalEvent.touches[0].clientX;
    //    console.log(endX);
    //});
    $carousels.on('touchmove', function(e) {
        // 变量重复赋值
        //endX = ;
         //console.log(e.originalEvent.touches[0]);
         endX=e.originalEvent.touches[0].clientX;
        //console.log(endX);
    });
    $carousels.on('touchend',function(e){
        //结束触摸的一瞬间记录最后手指所在的坐标X2
        console.log(endX);
        //控制精度
        //获取每次运动的距离，当距离大于一定值时认为是有方向的变化.(因为有可能是用户误触)
        var distance=Math.abs(startX-endX);  //获得绝对值
        if (distance>offset){
          //有方向的运动
          console.log(startX>endX? '向左':'向右');
          // 2.根据或得到的方向选择上一张或者下一张
      //-$('a').clinck();
    //-原生的carousel方法实现的 http://v3.bootcss.com/javascript/#carousel
         $(this).carousel(startX>endX? 'next':'prev')
        };
        

    });

    


});
