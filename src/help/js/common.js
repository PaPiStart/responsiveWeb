/**
 * Created by zzy on 2015/7/22.
 */
//获取url参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
//		return unescape(r[2]);
		return r[2];
	return null; //返回参数值
}

function formatNum(number) {
	var num = number + "";
	num = num.replace(new RegExp(",", "g"), "");
	// 正负号处理
	var symble = "";
	if (/^([-+]).*$/.test(num)) {
		symble = num.replace(/^([-+]).*$/, "$1");
		num = num.replace(/^([-+])(.*)$/, "$2");
	}

	if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
		var num = num.replace(new RegExp("^[0]+", "g"), "");
		if (/^\./.test(num)) {
			num = "0" + num;
		}

		var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
		var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");

		var re = /(\d+)(\d{3})/;

		while (re.test(integer)) {
			integer = integer.replace(re, "$1,$2");
		}
		return symble + integer + decimal;

	} else {
		return number;
	}
} //
//pc or mobile
var os = function() {
	var ua = navigator.userAgent,
		isWindowsPhone = /(?:Windows Phone)/.test(ua),
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
		isAndroid = /(?:Android)/.test(ua),
		isFireFox = /(?:Firefox)/.test(ua),
		isChrome = /(?:Chrome|CriOS)/.test(ua),
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,
		isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;

	return {
		isTablet: isTablet,
		isPhone: isPhone,
		isAndroid: isAndroid,
		isPc: isPc
	};
}();

function getSys() {
	if (os.isPhone) {
		return 'ios';
	} else if (os.isAndroid) {
		return 'android';
	} else if (os.isPc) {
		return 'pc';
	} else if (os.isTablet) {
		return 'tablet';
	} else {
		return 'default';
	}
}

//get url parammeter    myvar = getURLParameter('myvar');
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

//判断是否安装
function openIos(url, callback) {
	if (!url) {
		return;
	}
	var node = document.createElement('iframe');
	node.style.display = 'none';
	var body = document.body;
	var timer;
	var clear = function(evt, isTimeout) {
		(typeof callback === 'function') && callback(isTimeout);
		window.removeEventListener('pagehide', hide, true);
		window.removeEventListener('pageshow', hide, true);
		if (!node) {
			return;
		}

		node.onload = null;
		body.removeChild(node);
		node = null;

	};
	var hide = function(e) {
		clearTimeout(timer);
		clear(e, false);
	};
	window.addEventListener('pagehide', hide, true);
	window.addEventListener('pageshow', hide, true);
	node.onload = clear;
	node.src = url;
	body.appendChild(node);
	var now = +new Date();
	//如果事件失败，则1秒设置为空
	timer = setTimeout(function() {
		timer = setTimeout(function() {
			var newTime = +new Date();
			if (now - newTime > 1300) {
				clear(null, false);
			} else {
				clear(null, true);
			}

		}, 1200);
	}, 60);
}

function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

//手机端分享下载download
function ckdownload() {
	if (os.isAndroid) {
		window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.CKKJ.ckkjvideo';
	} else {
		if (is_weixin()) {
			window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.CKKJ.ckkjvideo&g_f=991653';
		} else {
			window.location.href = 'https://itunes.apple.com/cn/app/ci-ke-gen-wo-yi-qi-kan-live/id1031847512?mt=8';
		}
	}
	return;
}

/**
 * 复制内容到粘贴板
 * @param {String} buttonIdStr	按钮ID的字符串
 * @param {String} copyContent	要复制的文本
 */
function copyToClipboard(buttonIdStr, copyContent) {
	var clip = new ZeroClipboard.Client();
	clip.setHandCursor(true);
	clip.setText(copyContent);
	clip.addEventListener("mouseUp", function(client) {
		alert("复制成功！");
	});
	clip.glue(buttonIdStr);
	clip = null;
	return;
}

/**
 * 字符串是否合法,匹配中文 数字 字母 下划线
 */
function nickMatchStr(str) {
	var patrn = /^[\w\u4e00-\u9fa5]+$/gi;
	if (patrn.test(str)) { //不含非法字符串，即字符串合法
		return true;
	}
	return false; //含非法字符串，即字符串非法
}
/**
 * 字符是否合法
 * @param {Object} str
 */
function matchStr(str) {
	var data = false;
	var patrn = /[~\<\>#$%\^\*&\\\|]/;
	var sqlMatch = /select|update|delete|truncate|join|union|exec|insert|drop|count|’|"|;|>|<|%/i;
	if (!patrn.test(str) && !sqlMatch.test(str)) { //合法
		data = true;
	}
	return data; //非法
}

/***
 * 获取取出空格空白符后字符串长度
 * @param {Object} str
 */
function getStrLength(str) {
	return str.replace(/\s+/g, "").length;
}
/**
 * javascript的html编码函数 (htmlspecialchars-处理特殊字符)
 * @param {Object} str
 */
function htmlspecialchars(str) {
	var s = "";
	if (str.length == 0) return "";
	for (var i = 0; i < str.length; i++) {
		switch (str.substr(i, 1)) {
			case "<":
				s += "&lt;";
				break;
			case ">":
				s += "&gt;";
				break;
			case "&":
				s += "&amp;";
				break;
			case " ":
				if (str.substr(i + 1, 1) == " ") {
					s += " &nbsp;";
					i++;
				} else s += " ";
				break;
			case "\"":
				s += "&quot;";
				break;
			case "\n":
				s += "<br>";
				break;
			default:
				s += str.substr(i, 1);
				break;
		}
	}
	return s;
}