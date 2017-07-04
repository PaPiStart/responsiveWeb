/* 
 * @Author: may
 * @Date:   2017-06-12 17:23:47
 * @Last Modified time: 2017-07-04 12:02:06
 */
 'use strict';
 var app = {};
 (function(app) {
 	function initSwiper(index) {
 		var mySwiper = new Swiper('.swiper-container', {
 			pagination: '.swiper-pagination',
 			direction: 'vertical',
 			mousewheelControl: true,
 			paginationClickable: true,
 			onSlideChangeEnd: function() {
 				var j = mySwiper.activeIndex;
 				var page = '.page' + (j + 1);
 				$(page).find('.animate-box').addClass('animate-show');
				if(j != 1) { //第一屏
					$('.play-img').show();
					$('#video')[0].pause();
				}
			}
		});
 		$('.nav-item li').on('click', function(e) {
			//取消事件的默认动作。
			e.preventDefault();
			swiperClick($(this).attr('data-index'),$(this));
		});
 		$('.img-list').on('click', 'div', function(event) {
 			event.preventDefault();
 			swiperClick($(this).attr('data-index'),$(this));
 		});
 		if(index){
 			swiperClick(index);
 		}

 		function swiperClick(index,dom) {
 			if(index){
 				index = parseInt(index)
 			}
 			var page = '.page' +index;
 			$(page).find('.animate-box').addClass('animate-show');
 			$('#bzs-nav').find('.list').addClass('out');
 			$('.mask').hide(100);
 			if($(dom).hasClass('defaultClick')) {
 				return;
 			}
 			mySwiper.slideTo(index, 500, false);
 		};
 	}
 		//监控视频是否播放完毕
 		$('#video')[0].onended = function() {
 			$("#video").hide();
 			$('.play-img').show();
 		};
	//监控视频是否播放完毕
	$('#video')[0].onpause = function() {
		$('.play-img').show();
	};

	$('.page1').on('click', '.play-img', function(event) {
		event.preventDefault();
		$('.play-img').hide();
		$("#video").show();
		$('#video')[0].play();
	});
//判断当前设备
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		// $('.download').hide();
		// $('.download-img').hide();
	} else {
		$('.download').show();
	}
}
app.bozhushou = {
	initSwiper: initSwiper,
	browserRedirect: browserRedirect
};
})(app);

var init = function() {
	var dataIndex = 0;
	if(window.location.search &&window.location.search.indexOf('?index=') !=-1 ){
		dataIndex =window.location.search.substr(window.location.search.indexOf('?index=') +7 ,1);
	}
	app.bozhushou.initSwiper(dataIndex);
	app.bozhushou.browserRedirect();
 	$('.loading').fadeOut(400);
 	$('.loading-show').fadeIn(400);
 };

 init();