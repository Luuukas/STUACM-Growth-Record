/*
 * mind-map  v2.1.2
 * Copyright (c) 2018 hongfajing bmsoft
 * Licensed same as jquery - MIT License
 * Date: 2018-08-20
 */ 
(function ($) {
  var nodeCnt = 0;
  var details = {};
  'use strict';
  var defaultOpts = {
    auth: false,
    url: '',
    method: '',
    onSelect: function (resp, rr) {
      console.log(resp);
    }
  };
  var currentNodeLevel = 0;
  var _options = undefined;
  var $body = undefined;

  $.fn.mindMap = function (opts) {
    var $tree = this;
    $tree.empty();
    _options = $.extend(true, {}, defaultOpts, opts);

    // 点击空白处 收缩节点功能菜单
    $body = $('body');
    $body.off('hide-node').on('hide-node', function (e) {
      var $menusEle = $(this).find('.isSpread');
      var $nodeDetail = $(this).find('.active');

      if ($menusEle) {
        $menusEle.removeClass('isSpread');
        $menusEle.parent().next().hide(200);
      }
      if ($nodeDetail) {
        $nodeDetail.removeClass('active');
        $nodeDetail.parent().parent().next().hide(200);
      }
    });

    $body.on('click', function (event) {
      $(this).trigger('hide-node');
    });

    var $factorTypeContainer = $('<div class="factor-type-container"></div>');

    for (var j in _options.data) {
      for (var k in _options.data[j]) {
        _options.data[j][k].root = true;
        currentNodeLevel = 0
      }

      $factorTypeContainer.clone().append(mindmap_initTree(_options.data[j])).appendTo($tree);
    }
  };

  //初始化树
  function mindmap_initTree(data, isChanged) {
    var $ul = $('<ul class="branch-node-container"></ul>');
    var $li;
    currentNodeLevel++;
    if (currentNodeLevel > 2 && !isChanged) {
      $ul.addClass('hidden')
    }
    for (var i in data) {
      if (data[i].root) {
        $ul.addClass('trunk-node');
      } else {
        $ul.addClass('child-node');
      }

      $li = mindmap_initNode(data[i]);
      //消除单节点 最后多出来的竖线
      if (data.length == 1) {
        $li.addClass('only-one-child-node')
      }
      $li.appendTo($ul);
    }
    return $ul;
  }

  //生成单个节点
  function mindmap_initNode(node) {
    var $li = $('<li class="leaf-node-container"></li>');
    var $nodeContainer = $('<div class="node-container"></div>');
    $nodeContainer.attr('id', "node_" + nodeCnt);
    details['node_' + nodeCnt] = node.detail;
    ++nodeCnt;
    var $nodeTitleContainer = $('<div class="node-title-container"></div>');
    var $em = $('<em></em>');
    var $nodeDropContentBody = $('<div></div>');

    var $nodeTitleName = $('<div class="title-name layui-elip"></div>');
    var $tAEle = $('<a class="layui-elip" title="' + node.elementName + '" class="mindmap-link"></a>');
    $tAEle.text(node.elementName);

    var $unfoldBtn = $('<i class="unfold-btn"></i>');
    //生成当前节点的权限功能菜单

    var $menusIcon = $('<i class="menus-btn"></i>');

    //处理标题的titlev
    $nodeTitleName.append($unfoldBtn).append($tAEle).append($menusIcon);

    $nodeTitleContainer.append($nodeTitleName);
    $nodeContainer.append($nodeTitleContainer);

    //处理内容content
    if (node.root) {
      $nodeContainer.addClass('root');
    }

    $nodeContainer.appendTo($li);

    //为查看节点详情icon 绑定事件
    $tAEle.on('click', function (obj) {
      event.stopPropagation();
      var $container = $($($($(obj.target).parent()[0]).parent()[0]).parent()[0]);
      var nodeId = $container.attr('id');
      viewDetail(details[nodeId],nodeId);
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $nodeDropContentBody.empty();
      } else {
        $body.trigger('hide-node');
        $(this).addClass('active');
      }
    });
    //树形节点折叠功能
    $unfoldBtn.on('click', function (event) {
      event.stopPropagation();
      var $that = $(this);
      $body.trigger('hide-node');
      var $currentNodeTitleContainer = $(this).parent().parent();

      if (!$currentNodeTitleContainer.hasClass('remove-end-line')) {
        $currentNodeTitleContainer.addClass('remove-end-line');
        $that.addClass('isFold');
      } else {
        $currentNodeTitleContainer.removeClass('remove-end-line');
        $that.removeClass('isFold');
      }
      $currentNodeTitleContainer.parent().next().animate({
        height: 'toggle'
      });
      var left = $(this).offset().left;
      console.log(left);

      if (left > 400) {
        $('html .layui-body').animate({
          scrollLeft: left + 150
        }, 500);
      }
    });


    //节点的功能菜单

    if (!isEmptyArr(node.childElements)) {
      //根据需求默认展开前两个节点
      if (currentNodeLevel >= 2 && !node.isChange) {
        $nodeTitleContainer.addClass('remove-end-line');
        $unfoldBtn.addClass('isFold');
      }

      var $ul = mindmap_initTree(node.childElements, node.isChange);

      //判断当前树的节点是否超过两级  超过两级的部分收缩

      $ul.appendTo($li);

    } else {
      $li.addClass('no-child-node');
      (node.isChange && _options.method) && $nodeTitleContainer.addClass('focus-node');
    }
    return $li;
  }

  //判断当前值是否为数组和空数组
  function isEmptyArr(array) {
    return (array === undefined || array.length === 0);
  }
})(jQuery);

var menusListArr = [
  {
    key: 'add-child',
    name: '添加子节点'
  }, {
    key: 'rename',
    name: '重命名'
  }, {
    key: 'delete',
    name: '删除'
  }
];

function getMindmap(acmer) {
  $.ajax({
    url: '/getMindmap', /*接口域名地址*/
    type: 'post',
    data: JSON.stringify({
      "username":acmer
    }),
    contentType: 'application/json',
    processData: false,
    success: function (res) {
      console.log(res);
      $('#mindmap').mindMap({
        data: res.data,
        nodeMenus: menusListArr,
        onSelect: onSelect,
      });
    }
  })
}

function onSelect(resp) {
  console.log(resp);
}

function gotoMindmap(){
  document.getElementById('iframe_block').style.display = "none";
  document.getElementById('mindmap_block').style.display = "block";
}