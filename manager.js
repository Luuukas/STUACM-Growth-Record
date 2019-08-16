var express = require("express");
var app = express();
var refresher = require('./refresh_mission.js');
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);    // 让options请求快速返回
    }
    else {
        next();
    }
});

app.get('/refreshMissions', function (req, res) {
    refresher.refresh();
    res.send("refreshing");
})

app.post('/appendMissions', function (req, res) {
    var newMission = req.body.newMission;
    var type = req.body.type;
    refresher.append(JSON.parse(newMission),type);
    res.send("appending");
})

// app.post('/appendPersonalMission', function (req, res) {
//     var newMission = req.body.newMission;
//     var username = req.body.username;
//     var password = req.body.password;
//     refresher.personalAppend(JSON.parse(newMission),username,password);
//     res.send("appending");
// })

app.post('/addAcmer', function (req, res) {
    var username = req.body.username;
    var type = req.body.type;
    var password = req.body.password;
    var mission = req.body.mission;
    refresher.add(username,password,mission,type).then((info)=>{
        res.send(info.state);
    })
})

var manager = app.listen(8081, function () {
    var host = manager.address().address;
    var port = manager.address().port;

    console.log("Address: http://%s:%s", host, port)

})