function getAppInfo() {
    $.ajax({
        type: 'get',
        url: 'https://esign.yyyue.xyz/yyy/api/esignapp/lastVersion',
        // url: 'http://192.168.0.199:12000/yyy/api/esignapp/lastVersion',
        success: function (result, textStatus, jqXHR) {
            if (result.code == 0) {
                if ($("#appName")) {
                    var name = local(result.result.name);
                    $("#appName").text(name);
                }
                if ($("#appVersion")) {
                    $("#appVersion").text(result.result.version);
                }
                if ($("#appBundleId")) {
                    $("#appBundleId").text(result.result.bundleId);
                }

                if (result.result.plistUrl && $("#installDiv")) {
                    $('#installDiv').css('display', 'block');
                    $("#installButton").attr("href", result.result.plistUrl);
                }
                if (result.result.lzurl && $("#lzbutton")) {
                    $("#lzbutton").attr("href", result.result.lzurl);
                }
            } else {
                alert(local(result.msg));
            }
        },
        error: function (xhr) {
            alert(local("获取应用信息失败"));
        }
    })
}

function install() {
    var userAgent = navigator.userAgent
    var isWeixin = userAgent.toLowerCase().indexOf('micromessenger') !== -1 // 微信内
    // var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(userAgent)
    // if (isIOS == false) {
    //     alert(local("请在手机上使用Safari浏览器打开本页面"));
    //     return;
    // }

    if (isWeixin == true) {
        alert(local("请在手机上使用Safari浏览器打开本页面"));
        return;
    }

    showLoading(local("正在安装，请返回桌面查看安装进度。"));
    var url = 'itms-services://?action=download-manifest&url=https://esign.yyyue.xyz/yyy/api/esignapp/lastVersion/install';
    $("#description").text(local("正在安装，请返回桌面查看安装进度。"));
    location.href = url;
    setTimeout("hiddenLoading()", 1000)
}

function installYJB(arg) {
    var userAgent = navigator.userAgent
    var isWeixin = userAgent.toLowerCase().indexOf('micromessenger') !== -1 // 微信内
    // var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(userAgent)
    // if (isIOS == false) {
    //     alert(local("请在手机上使用Safari浏览器打开本页面"));
    //     return;
    // }

    if (isWeixin == true) {
        alert(local("请在手机上使用Safari浏览器打开本页面"));
        return;
    }

    showLoading(local("正在安装，请返回桌面查看安装进度。"));
    var url = 'itms-services://?action=download-manifest&url=https://esign.yyyue.xyz/yyy/api/esignapp/arm64e/install';
    if (arg == 2) {
        url = 'itms-services://?action=download-manifest&url=https://esign.yyyue.xyz/yyy/api/esignapp//arm64/install';
    }
    $("#description").text(local("正在安装，请返回桌面查看安装进度。"));
    location.href = url;
    setTimeout("hiddenLoading()", 1000)
}

/*页面执行加载执行*/
$(function () {
    getAppInfo();
});