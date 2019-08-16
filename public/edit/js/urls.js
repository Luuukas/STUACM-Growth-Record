function initUrls(urls) {
    for (var i in urls) {
        appendUrl(urls[i]);
    }
}
function appendUrl(url) {
    var $ul = $("#urls");
    var $li = $('<li class="urls_li"></li>');
    var $a = $('<a href="' + url.url + '">' + url.name + '</a>');
    var $rmi = $('<i class="remove-btn"></i>');
    var $rni = $('<i class="rename-btn"></i>');
    $rmi.on('click', function (obj) {
        $li = $($(obj.target).parent()[0]);
        $li.remove();
    })
    $rni.on('click', function (obj) {
        var name = prompt("请为url重命名", "unknown");
        var $url = $($(obj.target).prev());
        if (name != null && name != "") {
            $url.text(name);
        }
    })
    $li.append($a);
    $li.append($rni);
    $li.append($rmi);
    $ul.append($li);
}
function addUrl() {
    var name = prompt("请输入url", "unknown");
    if (name != null && name != "") {
        var url = {
            "name": "unknown",
            "url": name
        }
        appendUrl(url);
    }
}
function urlstoJson() {
    var urls = $("#urls").find("a");
    var urls_arr = [];
    for (var i = 0; i < urls.length; i++) {
        urls_arr.push({
            "name": $(urls[i]).text(),
            "url": $(urls[i]).attr('href')
        })
    }
    return urls_arr;
}
function getUrls() {
    $.ajax({
        url: '/getUrls', /*接口域名地址*/
        type: 'post',
        contentType: false,
        processData: false,
        success: function (res) {
            // console.log(res);
            initUrls(res);
        }
    })
}
function updateUrls() {
    var urls = JSON.stringify(urlstoJson());
    console.log(urls);
    $.ajax({
        url: '/updateUrls', /*接口域名地址*/
        type: 'post',
        data: urls,
        contentType: 'application/json',
        processData: false,
        success: function (res) {
            alert(res);
        }
    })
}
$(function () {
    getUrls();
});