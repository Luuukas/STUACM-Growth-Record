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
    function folder_initNode(node) {
        if (node.elementType == "folder") {
            var $li = $('<li class="folder_li"></li>');
            var $flip = $('<div class="flip"></div>');
            var $lable = $('<label class="folder_lora">' + node.elementName + '</lable>');
            $flip.append($lable);
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
            var $div = $('<div class="flip"></div>');
            var $a = $('<a class="folder_lora" href="' + node.fileUrl + '" target="previewFile"></a>');
            $a.on('click', function () {
                document.getElementById('mindmap_block').style.display = "none";
                document.getElementById('iframe_block').style.display = "block";

            })
            $a.text(node.elementName);
            $div.append($a);
            $li.append($div);
            return $li;
        }
    }
})(jQuery);

function getFolder(acmer) {
    $.ajax({
        url: '/getFolder', /*接口域名地址*/
        type: 'post',
        data: JSON.stringify({
            "username": acmer
        }),
        contentType: 'application/json',
        processData: false,
        success: function (res) {
            console.log(res);
            $('#folder_container').folder({
                data: res.data
            });
        }
    })
}