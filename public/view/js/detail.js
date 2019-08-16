var detail_div = document.getElementById('detail_background');
var detail_close = document.getElementById('detail_close-button');

detail_close.onclick = function close() {
    detail_div.style.display = "none";
    document.getElementById('mindmap').style.display = "block";
}

window.onclick = function close(e) {
    if (e.target == detail_div) {
        detail_div.style.display = "none";
        document.getElementById('mindmap').style.display = "block";
    }
}

var DETAIL;

function detail_initUrls(obj, urls) {
    $("#" + obj).empty();
    for (var i in urls) {
        detail_appendUrl(urls[i], obj);
    }
}
function detail_appendUrl(url, obj) {
    var $ul = $("#" + obj);
    var $li = $('<li></li>');
    var $a = $('<a href="' + url.url + '">' + url.name + '</a>');
    $li.append($a);
    $ul.append($li);
}
function detail_addUrl(obj) {
    var name = prompt("请输入url", "unknown");
    if (name != null && name != "") {
        var newUrl = {
            "name": "unknown",
            "url": name
        };
        var isExited = DETAIL[obj].find(function (elem) {
            return elem.url == name || elem.url == (name + '/');
        })
        if (isExited != undefined) {
            alert("" + name + "已经存在，\n不能重复保存。");
            return;
        }
        DETAIL[obj].push(newUrl)
        detail_appendUrl(newUrl, obj);
    }
}
var currentNode;
function viewDetail(detailObj, nodeId) {
    DETAIL = detailObj;
    currentNode = nodeId;
    detail_initUrls('left_urls', detailObj.left_urls);
    detail_initUrls('right_urls', detailObj.right_urls);
    detail_div.style.display = "block";
    document.getElementById('mindmap').style.display = "none";
}