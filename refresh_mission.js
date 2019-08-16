var codeforces_worker = require('./CODEFORCES_worker')
var sdut_worker = require('./SDUT_worker')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

function updateMission(acmer_id, mission) {
    updateSql = "UPDATE `acm`.`acmer` SET `mission` = '" + mission + "' WHERE (`acmer_id` = '" + acmer_id + "');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }else{
            console.log('success: '+acmer_id+" done!");
        }
    });
}

function dateFormat() {
    var date = new Date();
    var dateStr = date.getFullYear() + "-" + (parseInt(date.getMonth()) < 10 ? "0" : "") + (parseInt(date.getMonth()) % 12 + 1) + "-" + date.getDate();
    return dateStr;
}

exports.refresh = function () {
    // connection.connect();
    var sql = 'SELECT * FROM acmer';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
        } else {
            var now = dateFormat();
            for (var i in result) {    // 第i条记录
                var acmer_id = result[i].acmer_id;
                var codeforces_handle = result[i].codeforces;
                var sdut_handle = result[i].sdut;
                var tot_data;
                var mission = JSON.parse(result[i].mission);
                codeforces_worker.crawl(codeforces_handle).then((codeforces_data) => {
                    tot_data = codeforces_data;
                    return sdut_worker.crawl(sdut_handle)
                }).then((sdut_data) => {
                    tot_data = Object.assign(sdut_data, tot_data);

                    for (var j in mission) {    // 第i条记录里的第j个mission对象
                        var deadline = (mission)[j].deadline;
                        for (var k in (mission)[j].missions) {    // 第j个mission对象里的missions数组里的第K个任务
                            var url = ((mission)[j].missions)[k].url;

                            if (tot_data[url]) {
                                if (now <= deadline) {
                                    ((mission)[j].missions)[k].state0 = ((mission)[j].missions)[k].state1 = tot_data[url].verdict;
                                } else {
                                    ((mission)[j].missions)[k].state1 = tot_data[url].verdict;
                                }
                            }
                        }
                    }

                    return mission;
                }).then((newMission) => {
                    updateMission(acmer_id, JSON.stringify(newMission));
                })
            }
        }
    });
    // connection.end();
}

exports.append = function(newMission, type){
        // connection.connect();
        var sql = 'SELECT * FROM acmer WHERE type="' + type + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
            } else {
                for (var i in result) {    // 第i条记录
                    var acmer_id = result[i].acmer_id;
                    var mission = JSON.parse(result[i].mission);

                    mission.push(newMission);

                    updateMission(acmer_id, JSON.stringify(mission));
                }
            }
        });
        // connection.end();
}

exports.personalAppend = function(newMission, username, password){
    // connection.connect();
    var sql = 'SELECT * FROM acmer WHERE username="' + username + '" AND password="'+password+'"';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 'fail';
        } else {
            if(result.length==0){
                return 'no such user';
            }else{
                var acmer_id = result[0].acmer_id;
                var mission = JSON.parse(result[i].mission);
                mission.push(newMission);
                updateMission(acmer_id, JSON.stringify(mission));
            }
        }
    });
    // connection.end();
}

exports.add = function (username, password, mission, type) {
    // connection.connect();
    var urls = [];
    var mindmap = {
        "status": 200,
        "msg": "OK",
        "data": [
            [{
                "elementName": "ACM",
                "detail": {
                    "left_urls": [],
                    "right_urls": []
                },
                "childElements": [],
                "permissionValue": 1,
                "rootQNum": 1024,
                "isChange": 0
            }]
        ]
    };
    var folder = {
        "status": 200,
        "msg": "OK",
        "data": [
            [{
                "elementType": "folder",
                "elementName": "文件",
                "childElements": []
            }]
        ]
    };
    var profile = {
        "name": "...",
        "sign": "...",
        "codeforce_handle": "",
        "sdut_handle": "",
    }
    var promise = new Promise(function (resolve, reject) {
        var res = {}
        var addSql = 'INSERT INTO acmer(name,sign,codeforces,sdut,folder,mindmap,urls,mission,username,password,type) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
        var addSqlParams = [profile.name, profile.sign, profile.codeforce_handle, profile.sdut_handle, JSON.stringify(folder), JSON.stringify(mindmap), JSON.stringify(urls), mission, username, password,type];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.state = 'fail';
            } else {
                res.state = 'success';

            }
            resolve(res);
        });
    });
    return promise;
    // connection.end();
}