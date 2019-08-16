var express = require("express");
var app = express();
var path = require('path')
var handler = require("./handle.js")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var data = require('./data.js')

app.use(cookieParser());
app.use(session({
    secret: '',
    // name:'11,
    cookie: { maxAge: 2*3600*1000 },
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use('/edit/index.html', function (req, res, next) {
    if (req.session.username) {
        data.sea(req.session.username).then((info) => {
            if (info.state == "MATCHED") {
                req.session.username = req.session.username;
                next();
            } else {
                return res.send('非法用户');
            }
        });
    } else {
        return res.send('非法请求');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

//allow custom header and CORS
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

app.post('/upload', function (req, res, next) {
    handler.doAdd(req, res, next);
})

app.post('/getFolder', function (req, res) {
    var username;
    if (req.session.username) {
        req.session.username = req.session.username;
        username = req.session.username;
    } else {
        username = req.body.username;
    }
    data.sea(username).then((info) => {
        res.send(JSON.parse(info.data.folder));
    })
})
app.post('/updateFolder', function (req, res) {
    var folder = {
        "status": 200,
        "msg": "OK",
        "data": [
            [req.body]
        ]
    };
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateFolder(req.session.username, JSON.stringify(folder));
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/getMissions', function (req, res) {
    var username;
    if (req.session.username) {
        req.session.username = req.session.username;
        username = req.session.username;
    } else {
        username = req.body.username;
    }
    data.sea(username).then((info) => {
        res.send(JSON.parse(info.data.mission));
    }).catch((reason) => {
        console.log(reason);
    })
})
app.post('/getUrls', function (req, res) {
    var username;
    if (req.session.username) {
        req.session.username = req.session.username;
        username = req.session.username;
    } else {
        username = req.body.username;
    }
    data.sea(username).then((info) => {
        res.send(JSON.parse(info.data.urls));
    }).catch((reason) => {
        console.log(reason);
    })
})
app.post('/updateUrls', function (req, res) {
    var urls = req.body;
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateUrls(req.session.username, JSON.stringify(urls));
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/getMindmap', function (req, res) {
    var username;
    if (req.session.username) {
        req.session.username = req.session.username;
        username = req.session.username;
    } else {
        username = req.body.username;
    }
    data.sea(username).then((info) => {
        res.send(JSON.parse(info.data.mindmap));
    }).catch((reason) => {
        console.log(reason);
    })
})
app.post('/updateMindmap', function (req, res) {
    var mindmap = {
        "status": 200,
        "msg": "OK",
        "data": [
            [req.body]
        ]
    };
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateMindmap(req.session.username, JSON.stringify(mindmap));
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/updateName', function (req, res) {
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateName(req.session.username, req.body.newName);
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/updateSign', function (req, res) {
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateSign(req.session.username, req.body.newSign);
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/updateHandle', function (req, res) {
    if (req.session.username) {
        req.session.username = req.session.username;
        data.updateHandle(req.session.username, req.body);
        res.send("请求成功");
    } else {
        res.send("非法请求");
    }
})
app.post('/getProfile', function (req, res) {
    var username;
    if (req.session.username) {
        req.session.username = req.session.username;
        username = req.session.username;
    } else {
        username = req.body.username;
    }
    data.sea(username).then((info) => {
        res.send(info.data.profile);
    })
})

app.get('/', function (req, res) {
    if (req.session.username) {
        req.session.username = req.session.username;
        res.redirect("/edit/index.html");
    } else {
        res.redirect("/login.html");
    }
})

app.post('/isExits', function (req, res, next) {
    data.isExits(req.body.username).then((info) => {
        res.send(info);
    });
})

app.post('/login', function (req, res, next) {
    data.match(req.body.username, req.body.password).then((state) => {
        if (state == "CORRECT") {
            req.session.username = req.body.username;
        }
        res.send(state);
    });
})

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Address: http://%s:%s", host, port)

})