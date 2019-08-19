var formidable = require('formidable');
var fs = require('fs');
exports.doAdd = function (req, res, next) {//对应前端请求的路径，请求方法
    var form = formidable.IncomingForm({
        encoding: 'utf-8',//上传编码
        uploadDir: "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions: true,//保留后缀
        maxFieldsSize: 2 * 1024 * 1024//byte//最大可上传大小
    });

    var allFile = [];
    form.on('progress', function (bytesReceived, bytesExpected) {//在控制台打印文件上传进度
        var progressInfo = {
            value: bytesReceived,
            total: bytesExpected
        };
        console.log('[progress]: ' + JSON.stringify(progressInfo));
        // res.write(JSON.stringify(progressInfo));
    })
        .on('field', function (name, value) {
         }) // 每当一个字段/值对已经收到时会触发该事件
        .on('file', function (filed, file) {
            allFile.push([filed, file]);//收集传过来的所有文件
        })
        .on('end', function () {
            // res.end('上传成功！');
        })
        .on('error', function (err) {
            console.error('上传失败：', err.message);
            next(err);
        })
        .parse(req, function (err, fields, files) {
            if (err) {
                console.log(err);
            }
            var dt = new Date();
            var ms = Date.parse(dt);
            var url;
            var nfn;
            allFile.forEach(function (file, index) {
                // var fieldName = file[0];
                var types = file[1].name.split('.');
                nfn = ""+ms + "." + String(types[types.length - 1]);
                url = form.uploadDir + "/" + nfn;
                fs.renameSync(file[1].path, url);    // 重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
            });
            res.send("http://www.stuacm.club/files/"+nfn);
        });
};