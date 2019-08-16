(function ($) {
    'use strict';
    $.fn.folder = function (opts) {
        var $fd = this;
        $fd.empty();
        var $ul = $('<ul></ul>');
        console.log(opts.data[0][0]);
        $ul.append(folder_initNode(opts.data[0][0]));
        $fd.append($ul);
    }
    function postData(obj) {
        var $ul = $($($($(obj).parent()[0]).next()[0]).children("ul")[0]);

        var formData = new FormData();
        var file = obj.files[0];
        if (file == undefined) return;
        console.log(file);
        formData.append("file", file);
        $.ajax({
            url: '/upload', /*接口域名地址*/
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                $ul.append(folder_initNode({
                    "elementType": "file",
                    "elementName": file.name,
                    "fileUrl": "https://view.officeapps.live.com/op/view.aspx?src=" + res
                }));
            }
        })
    }
    function folder_initNode(node) {
        if (node.elementType == "folder") {
            var $li = $('<li class="folder_li"></li>');
            var $flip = $('<div class="flip"></div>');
            var $input = $('<input type="file" style="display:none">');
            $input.on('change', function (obj) {
                postData(obj.target);
            })
            var $deleteIcon = $('<i class="remove-btn"></i>');
            $deleteIcon.on('click', function (obj) {
                var $li = $($(obj.target).parent()[0]).parent()[0];
                $li.remove();
            })
            var $addFolderIcon = $('<i class="add-folder-btn"></i>');
            $addFolderIcon.on('click', function (obj) {
                $ul = $($($($(obj.target).parent()[0]).next()[0]).children("ul")[0]);
                $ul.append(folder_initNode({
                    "elementType": "folder",
                    "elementName": "unknown",
                    "childElements": []
                }))
            })
            var $addFileIcon = $('<i class="add-file-btn"></i>');
            $addFileIcon.on('click', function () {
                $input.click();
            })
            var $renameIcon = $('<i class="rename-btn"></i>');
            $renameIcon.on('click', function (obj) {
                var name = prompt("请为文件夹命名", "unknown");
                var $label = $($(obj.target).prev()[0]);
                if (name != null && name != "") {
                    $label.text(name);
                }
            })
            var $lable = $('<label class="folder_lora">' + node.elementName + '</lable>');
            $flip.append($lable);
            $flip.append($renameIcon);
            $flip.append($input);
            $flip.append($addFolderIcon);
            $flip.append($addFileIcon);
            $flip.append($deleteIcon);
            var $panel = $('<div class="panel"></div>');
            $lable.on('click', function () {
                $panel.toggle();
            })
            $li.append($flip);
            var $ul = $('<ul></ul>');
            for (var i in node.childElements) {
                $ul.append(folder_initNode(node.childElements[i]));
            }
            $panel.append($ul);
            $li.append($panel);
            return $li;
        } else {
            var $li = $('<li class="file_li"></li>');
            var $deleteIcon = $('<i class="remove-btn"></i>');
            $deleteIcon.on('click', function (obj) {
                var $li = $($(obj.target).parent()[0]).parent()[0];
                $li.remove();
            })
            var $div = $('<div class="flip"></div>');
            var $a = $('<a class="folder_lora" href="' + node.fileUrl + '" target="previewFile"></a>');
            $a.on('click', function () {
                document.getElementById('mindmap_block').style.display = "none";
                document.getElementById('iframe_block').style.display = "block";

            })
            $a.text(node.elementName);
            $div.append($a);
            $div.append($deleteIcon);
            $li.append($div);
            return $li;
        }
    }

    function folder_toJson(liObj) {
        var $flip = $($(liObj).children("div")[0]);
        var panel = $(liObj).children("div")[1];
        var fileUrl, elementName;
        var node = {};
        if (panel == undefined) {
            elementName = $($flip.children("a")[0]).text();
            fileUrl = $($flip.children("a")[0]).attr('href');

            node["elementType"] = "file";
            node["elementName"] = elementName;
            node["fileUrl"] = fileUrl;
        } else {
            elementName = $($flip.children("label")[0]).text();

            node["elementType"] = "folder";
            node["elementName"] = elementName;
            node["childElements"] = [];

            var lis = $($(panel).find("ul")[0]).children();
            for (var i = 0; i < lis.length; i++) {
                node.childElements.push(folder_toJson(lis[i]));
            }
        }
        return node;
    }

    $.fn.folder_serializeJson = function () {
        var liObj = this.find("li")[0];
        return folder_toJson(liObj);
    };
})(jQuery);

function getFolder() {
    $.ajax({
        url: '/getFolder', /*接口域名地址*/
        type: 'post',
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            $('#folder_container').folder({
                data: res.data
            });
        }
    })
}
function updateFolder() {
    var folder = JSON.stringify($('#folder_container').folder_serializeJson());
    console.log(folder);
    $.ajax({
        url: '/updateFolder', /*接口域名地址*/
        type: 'post',
        data: folder,
        contentType: 'application/json',
        processData: false,
        success: function (res) {
            alert(res);
        }
    })
}
$(function () {
    getFolder();
});