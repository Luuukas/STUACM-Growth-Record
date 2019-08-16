function updateName(){
    var name = prompt("请输入Name", "unknown");
    if (name != null && name != "") {
        $("#userName").text(name);
        $.ajax({
            url: '/updateName', /*接口域名地址*/
            type: 'post',
            data: JSON.stringify({
                "newName":name
            }),
            contentType: 'application/json',
            processData: false,
            success: function (res) {
                alert(res);
            }
        })
    }
}
function updateSign(){
    var name = prompt("请输入Sign", "unknown");
    if (name != null && name != "") {
        $("#userSign").text(name);
        $.ajax({
            url: '/updateSign', /*接口域名地址*/
            type: 'post',
            data: JSON.stringify({
                "newSign":name
            }),
            contentType: 'application/json',
            processData: false,
            success: function (res) {
                alert(res);
            }
        })
    }
}
function getProfile(){
    $.ajax({
        url: '/getProfile', /*接口域名地址*/
        type: 'post',
        contentType: false,
        processData: false,
        success: function (res) {
            $("#userName").text(res.name);
            $("#userSign").text(res.sign);
            $("#codeforces").val(res.codeforce_handle);
            $("#sdut").val(res.sdut_handle);
        }
    })
}
$(function () {
    getProfile();
});