var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

exports.isExits = function (username) {
    // connection.connect();
    var promise = new Promise(function (resolve, reject) {
        var res = {};
        var sql = 'SELECT * FROM acmer WHERE username="' + username + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                // console.log('[SELECT ERROR] - ', err.message);
                res.state = 'ERROR';
            } else {
                if (result.length == 0) {
                    res.state = 'ISNTEXITS';
                } else {
                    res.state = 'EXITS';
                }
            }
            resolve(res);
            // console.log('--------------------------SELECT----------------------------');
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');
        });
    })
    return promise;
    // connection.end();
}

// search a record in the appropriate table.
exports.match = function (username, password) {
    // connection.connect();
    var promise = new Promise(function (resolve, reject) {
        var sql = 'SELECT * FROM acmer WHERE username="' + username + '" AND password="'+password+'"';
        connection.query(sql, function (err, result) {
            if (err) {
                // console.log('[SELECT ERROR] - ', err.message);
                resolve('ERROR');
            } else {
                if(result.length==0){
                    resolve('WRONG');
                }else{
                    resolve('CORRECT');
                }
            }
            // console.log('--------------------------SELECT----------------------------');
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');
        });
    })
    return promise;
    // connection.end();
}

exports.sea = function (username) {
    // connection.connect();
    var promise = new Promise(function (resolve, reject) {
        var res = {};
        var sql = 'SELECT * FROM acmer WHERE username="' + username + '"';
        connection.query(sql, function (err, result) {
            if (err) {
                // console.log('[SELECT ERROR] - ', err.message);
                res.state = 'ISNTEXITS';
            } else {
                res.state = 'MATCHED';
                res.data = {
                    'profile' : {}
                };
                res.data.profile.codeforce_handle = result[0].codeforces;
                res.data.profile.sdut_handle = result[0].sdut;
                res.data.profile.name = result[0].name;
                res.data.profile.sign = result[0].sign;
                res.data.folder = result[0].folder;
                res.data.mindmap = result[0].mindmap;
                res.data.mission = result[0].mission;
                res.data.urls = result[0].urls;
            }
            resolve(res);
            // console.log('--------------------------SELECT----------------------------');
            // console.log(result);
            // console.log('------------------------------------------------------------\n\n');
        });
    })
    return promise;
    // connection.end();
}

exports.updateName = function (username,name) {
    updateSql = "UPDATE `acm`.`acmer` SET `name` = '"+name+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}

exports.updateSign = function (username,sign) {
    updateSql = "UPDATE `acm`.`acmer` SET `sign` = '"+sign+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}

exports.updateHandle = function (username,handle) {
    updateSql = "UPDATE `acm`.`acmer` SET `codeforces` = '"+handle.codeforces+"', `sdut` = '"+handle.sdut+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}

exports.updateFolder = function (username,folder) {
    updateSql = "UPDATE `acm`.`acmer` SET `folder` = '"+folder+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}

exports.updateUrls = function (username,urls) {
    updateSql = "UPDATE `acm`.`acmer` SET `urls` = '"+urls+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}

exports.updateMindmap = function (username,mindmap) {
    updateSql = "UPDATE `acm`.`acmer` SET `mindmap` = '"+mindmap+"' WHERE (`username` = '"+username+"');";
    connection.query(updateSql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
    });
}