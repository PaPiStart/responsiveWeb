   $(window).on('scroll', function () {
     var st = $(document).scrollTop()
     if (st > 600) {
       $('.go-top').fadeIn(400)
     } else {
       $('.go-top').fadeOut(400)
     }
   })
   $('.go-top').on('click', function () {
     $('html,body').animate({
       'scrollTop': 0
     }, 500)
   })
   $(function () {
     $('.left').load('course-left.html', function (event) {
       $('.right').css('display', 'block')
       updateSelected()
     })
     $('.right').load('course-load.html', function (event) {})
   })

   function updateRightWebHandler (evt, target) {
     $('#demo-list>li a').each(function (index, item) {
       if ($(item).hasClass('selected-color')) {
         $(item).removeClass('selected-color')
       }
     })
     if (!$(evt.target).hasClass('selected-color')) {
       $(evt.target).addClass('selected-color')
     }
     $('.right').load(target, function (event) {})
   }

   function updateSelected () {
     var indexArr = getMenuIndexNum(window.location.pathname)
     if (indexArr == undefined) {
       indexArr = [0, 0]
     }
     if (indexArr) {
       console.log('indexArr', indexArr)
       var submenu = $('.submenu').eq(indexArr[0])
       $(submenu).hide().show()
       $(submenu).parent().children('a').css('background-color', '#ffffff')
       $(submenu).find('li').eq(indexArr[1]).css('background-color', '#d0d0d0')
       $(submenu).find('a').eq(indexArr[1]).css('background-color', '#d0d0d0')
     }
     $('#demo-list>li').each(function () {
       $(this).click(function () {
         menuHide()
         $(this).find('.submenu').show()
       })
     })
     $($('#demo-list>li').get(indexArr[0])).find('a').addClass('selected-color')
   }

   function getMenuIndexNum (str) {
     var menuNameList = [
           ['index'],
           ['course-login1'],
           ['course-template1'],
           ['course-config1'],
           ['course-live1'],
           ['course-fun1'],
           ['course-app-config1'],
           ['course-dmzs1'],
           ['course-app1'],
           ['course-user1'],
           ['course-title1'],
           ['course-state1'],
           ['course-main-menu1'],
           ['course-faq1']
     ]
     var menuNameListLen = menuNameList.length
     for (var i = 0; i < menuNameListLen; i++) {
       var mlen = menuNameList[i].length
       for (var n = 0; n < mlen; n++) {
         if (str.indexOf(menuNameList[i][n] + '.html') != -1) {
           return [i, n]
         }
       }
     }
   }

   function menuHide () {
     $('.submenu').hide()
   }
