var mission_div = document.getElementById('mission_background');
var mission_close = document.getElementById('mission_close-button');

mission_close.onclick = function close() {
    mission_div.style.display = "none";
    document.getElementById('mindmap').style.display = "block";
}

window.onclick = function close(e) {
    if (e.target == mission_div) {
        mission_div.style.display = "none";
        document.getElementById('mindmap').style.display = "block";
    }
}

function initMaterial(materials) {
    $("#material_urls").empty();
    for (var m in materials) {
        var $a = $('<li class="urls_li"><a href="' + materials[m] + '">' + m + '</a></li>');
        $("#material_urls").append($a);
    }
}

function initMission(missions) {
    $("#mission_table").empty();
    $("#mission_table").append('<tr>\
                                    <td rowspan="2" class="btgn">实战例题</td>\
                                    <td colspan="2" class="btgn">解题状态</td>\
                                </tr>\
                                <tr>\
                                    <td class="btgn" style="width: 80px">截止状态</td>\
                                    <td class="btgn" style="width: 80px">目前状态</td>\
                                </tr>');
    for (var i in missions) {
        var mission = missions[i];
        var $tr = $('<tr>\
                        <td><a href="'+ mission["url"] + '">' + mission["title"] + '</a></td>\
                        <td class="'+ mission["state0"] + '">' + mission["state0"] + '</td>\
                        <td class="'+ mission["state1"] + '">' + mission["state1"] + '</td>\
                    </tr>');
        $("#mission_table").append($tr);
    }
}

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

function viewMission(obj) {
    var id_str = $(obj).attr("id");
    var id_str = id_str.substr(8);
    var id_int = parseInt(id_str);
    if (isEmptyObject(missions[id_int].materials)) {
        console.log("emm");
        document.getElementById('material').style.display = "none";
    } else {
        initMaterial(missions[id_int].materials);
        document.getElementById('material').style.display = "block";
    }
    if (missions[id_int].missions.length == 0) {
        document.getElementById('mission').style.display = "none";
    } else {
        initMission(missions[id_int].missions);
        document.getElementById('mission').style.display = "block";
    }
    mission_div.style.display = "block";
    document.getElementById('mindmap').style.display = "none";
};

function appendMission(title, deadline, id) {
    $mission_container = $("#mission_container");
    $div = $('<div class="counter-item">\
                <h3>'+ title + '</h3>\
                <p>deadline: '+ deadline + '</p>\
            </div>');
    $div.attr('id', "mission_" + id);
    $div.on('click', function (obj) {
        try{
        viewMission(obj.target);
        }catch{
            viewMission($(obj.target).parent()[0]);
        }
    })
    $mission_container.append($div);
}

var missions;
function initMissions(missions){
    for(var i=0;i<missions.length;i++){
        appendMission(missions[i].name,missions[i].deadline,i);
    }
}

function getMissions(){
    $.ajax({
        url: '/getMissions', /*接口域名地址*/
        type: 'post',
        contentType: false,
        processData: false,
        success: function (res) {
            // console.log(res);
            missions = res;
            initMissions(res);
        }
    })
}

$(function () {
    getMissions();
});