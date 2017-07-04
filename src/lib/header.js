 'use strict';

 $(function(){
  var checkInput = checkInput;
  var joinMe = function(checkInput){
   var innerHtml =	'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
   <div class="modal-dialog" role="document">\
   <div class="modal-content">\
   <div class="modal-header">\
   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
   <h4 class="modal-title" id="myModalLabel">商务合作</h4>\
   </div>\
   <div class="modal-body">\
   <form class="form-horizontal"  id="form" action="http://bozhushou.com/save.php" method="post">\
   <div class="form-group ">\
   <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>\
   <div class="col-sm-10">\
   <input type="text" class="form-control " id="name" placeholder="您的称呼">\
   <span class="help-block has-error" style="display: none;">请填上您美美的姓名,让小播能更快联系你哦~</span>\
   </div>\
   </div>\
   <div class="form-group">\
   <label for="inputPassword3" class="col-sm-2 control-label">电话</label>\
   <div class="col-sm-10">\
   <input type="text" class="form-control" id="phone" placeholder="留下您的联系方式,让我们能更快的联系您">\
   <span class="help-block has-error" style="display: none;">号码都不给人家,人家怎么找到你嘛~</span>\
   </div>\
   </div>\
   <div class="form-group">\
   <label for="inputPassword3" class="col-sm-2 control-label">公司</label>\
   <div class="col-sm-10">\
   <input type="text" class="form-control" id="inputPassword3" placeholder="您所属的公司,可不填">\
   </div>\
   </div>\
   <div class="text-align-right">\
   <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\
   <button type="submit" class="btn btn-primary save" >保存</button>\
   </div>\
   </form>\
   </div>\
   </div>\
   </div>\
   </div>' 
   $('body').append(innerHtml);
 }

 joinMe();

 $('#form')[0].onsubmit = function(){
  return checkInput();
};

var checkName = false;
var checkPhone = false;
var checkInput = function() {
 $('#name').blur();
 $('#phone').blur();
 if(checkName && checkPhone) {
  return true;
} else {
  return false;
}
}
$('#name').blur(function() {
 if(!$('#name').val()) {
  $('#name').parents('.form-group').addClass('has-error');
  $('#name').next().show();
  checkName = false;
} else if($('#name').val().length < 2 || $('#name').val().length > 10) {
  $('#name').parents('.form-group').addClass('has-error');
  $('#name').next().text('姓名应该在2-10字之间哦~').show();
  checkName = false;
} else {
  $('#name').parents('.form-group').removeClass('has-error');
  $('#name').next().hide();
  checkName = true;
}
}).keyup(function() {
 $(this).triggerHandler('blur');
}).focus(function() {
 $(this).triggerHandler('blur');
});
$('#phone').blur(function() {
 if(!$('#phone').val()) {
  $('#phone').parents('.form-group').addClass('has-error');
  $('#phone').next().show();
  checkPhone = false;
} else if(!(/^1[3|5][0-9]\d{8}$/.test($('#phone').val()))) {
  $('#phone').parents('.form-group').addClass('has-error');
  $('#phone').next().text('您给人家留的手机号码好像不正确呢~').show();
  checkPhone = false;
} else {
  $('#phone').parents('.form-group').removeClass('has-error');
  $('#phone').next().hide();
  checkPhone = true;
}
}).keyup(function() {
 $(this).triggerHandler('blur');
}).focus(function() {
 $(this).triggerHandler('blur');
});

$('#bzs-nav').on('click', '.showBtn', function(event) {
 event.preventDefault();
 $('#bzs-nav').find('.list').removeClass('out').addClass('in');
 $('.mask').show();
});
$('#bzs-nav').on('click', '.mask', function(event) {
 event.preventDefault();
 $('.removeIcon').click();
});
$('.removeIcon').on('click', function(event) {
 event.preventDefault();
 $('#bzs-nav').find('.list').addClass('out');
 $('.mask').hide(100);
});
$(window).resize(function(event) {
  // console.log($(window).width());
  if($(window).width() > 600) {
    $('#bzs-nav').find('.list').removeClass('out in');
    $('.mask').hide(100);
  }
});
})