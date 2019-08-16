function initUrls(urls) {
    for (var i in urls) {
        appendUrl(urls[i]);
    }
}
function appendUrl(url) {
    var $ul = $("#urls");
    var $li = $('<li class="urls_li"></li>');
    var $a = $('<a href="' + url.url + '">' + url.name + '</a>');
    $li.append($a);
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
function getUrls(acmer) {
    $.ajax({
        url: '/getUrls', /*接口域名地址*/
        type: 'post',
        data: JSON.stringify({
            "username": acmer
        }),
        contentType: 'application/json',
        processData: false,
        success: function (res) {
            // console.log(res);
            initUrls(res);
        }
    })
}