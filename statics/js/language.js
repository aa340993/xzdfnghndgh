/**
 * cookie操作
 */
var setCookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    }
};

var getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function() {
    if (navigator.appName == "Netscape") {
        var navLanguage = navigator.language;
        return navLanguage;
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */
var execI18n = function() {
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    };

    var name = $('meta[name="i18n_file"]').attr("content")
    if (!name) {
        name = 'common';
    }

    if (getCookie("userLanguage")) {
        i18nLanguage = getCookie("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                setCookie("userLanguage", navLanguage);
            };
        } else {
            console.log("not navigator");
        }
    }

    /*
    这里需要进行i18n的翻译
     */
    jQuery.i18n.properties({
        name: name, //资源文件名称
        path: 'statics/i18n/', //资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值 'both'
        language: i18nLanguage,
        callback: function() { //加载成功后设置显示内容
            var insertEle = $(".i18n");
            insertEle.each(function() {
                var dataType = $(this).attr('data-ptype');
                if (dataType) {
                    var dataTypeArr = dataType.split('/');
                    for (var i = 0; i < dataTypeArr.length; i++) {
                        if ($.trim(dataTypeArr[i]) == 'html') {
                            $(this).html($.i18n.prop($.trim($(this).html())));
                        } else if ($.trim(dataTypeArr[i]) == 'text') {
                            $(this).text($.i18n.prop($.trim($(this).text())));
                        } else if ($.trim(dataTypeArr[i]) == 'value') {
                            $(this).val($.i18n.prop($.trim($(this).val())));
                        } else if ($.trim(dataTypeArr[i]) == 'placeholder') {
                            $(this).attr('placeholder', $.i18n.prop($.trim($(this).attr('placeholder'))));
                        };

                    };
                } else {
                    var html = $(this).html();
                    if (html) {
                        $(this).html($.i18n.prop($.trim(html)));
                    } else {
                        console.log(insertEle);
                    }
                }
            });
        }
    });
}

function changeLanguage(language) {
    setCookie("userLanguage", language);
    location.reload();
}

function local(key) {
    return $.i18n.local(key);
}

/*页面执行加载执行*/
$(function() {
    /*执行I18n翻译*/
    execI18n();
    if (i18nLanguage == "zh-CN") {
        $("#nav_zh").addClass('active');
    } else {
        $("#nav_en").addClass('active');
    }
});