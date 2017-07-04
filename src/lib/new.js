$(function() {
  $(document).on('mousewheel DOMMouseScroll', function(e) {
    if ((e.originalEvent.wheelDelta || -e.originalEvent.detail) > 0) {
      Slider.slidePrev();
    } else {
      Slider.slideNext();
    }
  });
  $('#nav a').on('mousedown', function() {
    Slider.slideTo($(this).parent().index())
  });
  $("#top_nav .content>a").on('mousedown', function() {
    var index = $(this).attr('data-index');
    if(index > 0) {
      Slider.slideTo(index)
    }    
  });

  var Slider = (function() {
    var DURATION = 300;
    var count = $('#slider li').length;
    var current = 0;
    var animating = false;

    function slideTo(idx) {
      if (animating || idx == current) {
        return;
      }
      if (idx >= count) {
        return false;
      }
      var up = (idx > current) || (idx == current - count + 1);
      var $lis = $('#slider li');
      var $current = $lis.eq(idx);
      var $prev = $('#slider li.current');
      var offset = $current.height();
      animating = true;
      $current.show().css({
        top: up ? offset : -offset
      }).animate({
        top: 0
      }, DURATION, function() {
        $(this).addClass('current');
        $('#nav li').removeClass('current').eq(idx).addClass('current');
        animating = false;
      });
      $prev.animate({
        top: up ? -offset : offset
      }, DURATION, function() {
        $(this).removeClass('current').hide();
      });
      if (idx != 0) {
        $("#top_nav").addClass("page_nav");
      } else {
        $("#top_nav").removeClass("page_nav");
      }
      var $arrow = $('.arrow');
      if (idx == count - 1) {
        $arrow.hide();
      } else {
        $arrow.show();
      }
      current = idx;
    }
    return {
      slideTo: slideTo,
      slidePrev: function() {
       if (current == 0){ return};
       var videoPrev = '.video' + current;
       var video = '.video' + (current - 1);
       $(videoPrev)[0].pause();
       $(video).prev().prev().find('.play-img').show();
       // $(video)[0].play();
       slideTo(current - 1);
     },
     slideNext: function() {
      if(current >= 3){
       return;
     }
     var video = '.video' + current;
       // var index =  current  >= 3 ? 3 : (current + 1);
       var videoNext = '.video' + (current + 1);
       $(video)[0].pause();
       $(videoNext).prev().prev().find('.play-img').show();
       // $(videoNext)[0].play();
       slideTo(current + 1);


     }
   }

 })();

//  var video1 = $('.video0');
//  var video2 = $('.video1');
//  var video3 = $('.video2');
//  var video4 = $('.video3');
//  function ended(){
//   var video = ['.video0','.video1','.video2','.video3'];
//   for(var i = 0, len = video.length ; i < len ; i++){
//     if($(video[i])[0].onended){
//       $(video[i]).next('.title').find('.play-img').show();
//     }
//   }
// }
$('.video0')[0].onended = function(){
 $('.video0').prev().prev().find('.play-img').show();
}
$('.video1')[0].onended = function(){
 $('.video1').prev().prev().find('.play-img').show();
}
$('.video2')[0].onended = function(){
 $('.video2').prev().prev().find('.play-img').show();
}
$('.video3')[0].onended = function(){
 $('.video3').prev().prev().find('.play-img').show();
}

$('.play-img').click(function(event) {
  /* Act on the event */
  $(this).parent().next().next()[0].play();
  $(this).hide();
});

$('.nav-item li').on('click', function(e) {
  //取消事件的默认动作。
  e.preventDefault();
  if($(this).hasClass('defaultClick')) {
    return;
  }
  var i = $(this).attr('data-index');
  window.location.href="http://bozhushou.com/index.html?index=" + i;
});
$('.loading').fadeOut(400);
$('.loading-show').fadeIn(400);
//   $('#bg3').on('mousemove', function(e) {
//     var offsetX = e.clientX / window.innerWidth - 0.5,
//     offsetY = e.clientY / window.innerHeight - 0.5;
//     $('#bg3 .layer2').css('right', 58 - 30 * offsetX).css('top', 22 + 20 * offsetY);
//     $('#bg3 .layer3').css('right', 108 - 50 * offsetX).css('top', 226 + 30 * offsetY);
//     $('#bg3 .layer4').css('right', 69 - 50 * offsetX).css('top', 30 + 30 * offsetY);
//     $('#bg3 .layer5').css('right', 200 - 60 * offsetX).css('top', 535 + 60 * offsetY);
//   });
//   $('#bg4').on('mousemove', function(e) {
//     var offsetX = e.clientX / window.innerWidth - 0.5,
//     offsetY = e.clientY / window.innerHeight - 0.5;
//     $('#bg4 .layer2').css('left', -80 + 30 * offsetX).css('top', 55 + 20 * offsetY);
//     $('#bg4 .layer3').css('left', 31 + 50 * offsetX).css('top', 98 + 30 * offsetY);
//     $('#bg4 .layer4').css('left', 40 + 60 * offsetX).css('top', -1 + 40 * offsetY);
//     $('#bg4 .layer5').css('left', 410 + 60 * offsetX).css('top', -106 + 40 * offsetY);
//   });
//   (function() {
//     $('.arrow').on('click', function() {
//       Slider.slideNext();
//     });
//   })();
// });

// var video = $("#bgvideo")[0];
// $(".play_btn").click(function() {
//   if (video.paused) {
//     video.play();
//     $("#bg1").hide();
//     $("#off_btn").show();
//   } else {
//     video.pause();
//     video.currentTime = 0;
//     $("#bg1").show();
//     $("#off_btn").hide();
//   }
// });
// video.onended = function() {
//   $("#bg1").show();
//   $("#off_btn").hide();
// }
// var videoBo = $("#videoBo")[0];
// function player(){
//   if (videoBo.paused) {
//     isPlay = false;
//     $('.video_box').show();
//     videoBo.play();

//     // $("#bg7").hide();
//     // $("#off_btn").show();
//   } else {
//     videoBo.pause();
//     $('.video_box').hide();
//     videoBo.currentTime = 0;
//     // $("#bg7").show();
//     // $("#off_btn").hide();
//   }
// }
// videoBo.onended = function() {
//  $('.video_box').hide();
// };
// $('#videoBo').on('pause', function(event) {
//   if(videoBo.paused){
//     // videoBo.pause();
//     $('.video_box').hide();
//     videoBo.currentTime = 0;
//   }
// });

// $('.ad_video').click(function(event) {
//   if(videoBo.paused){
//     videoBo.play();
//   }else{
//     videoBo.pause();
//   }
// });

// function submitForm() {
//   $("#login_page").hide()
// }

// function goLogin() {
//   $("#login_page").show()
// }
// $('.ad_list>span').click(function(){
//   var index = $(this).index()*1 + 1;
//   $('.ad_video').attr('src','./images/ad_0' + index +'.mp4')
  // var delayTime = null;
  // var index = $(this).index()+1;
  // var src = $(this).find('img').attr('src');
  // var left = $(this).position().left;
  // var top = $(this).position().top;
  // if($(this).find('.move_img').length != 0){
  //   $(this).find('.move_img').removeClass('move').show();
  // }else {
  //   $(this).append($('<img class="move_img" src="'+ src +'" style="left: '+ left +'px; top: '+ top +'px">'));
  // }  
  // $(this).find('.move_img').addClass('move');
  // delayTime = setTimeout(function(){
  //   $('.move_img').removeClass('move').hide();
  //   $('.ad_info').attr('src','./images/ad_info_' + index + '.png')
  // },400);  
})

// $('.close_login').click(function(){
//   $("#login_page").hide()
// })