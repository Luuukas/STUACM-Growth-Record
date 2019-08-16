var superagent = require("superagent"),
    cheerio = require("cheerio")

var standingsSearch1 = 'https://acm.sdut.edu.cn/onlinejudge2/index.php/Home/User/standings?username=';
var standingsSearch2 = '&nickname=&major=&class=';
function getUid(sdut_handle) {
    var p = new Promise(function (resolve, reject) {
        superagent.get(standingsSearch1 + sdut_handle + standingsSearch2).end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }
            var $ = cheerio.load(ares.text);
            var $sa = $($($("tbody")[0]).find("a")[0]);
            if ($sa.attr('href')) {
                resolve($sa.attr('href').substr(43));
            } else {
                resolve(-1);
            }
        })
    })
    return p;
}

var delay = parseInt((Math.random() * 30000000) % 1000, 10);
function getInfo(url, page, infoArray) {
    var p = new Promise(function (resolve, reject) {
        superagent.get(url + page + '.html').end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text);
            var atable = $("#status-table").children("tbody")[0];
            var trs = $(atable).children("tr");

            var submissionsNum = trs.length;    // how many submissions in this page

            for (var i = 0; i < submissionsNum; i++) {
                var problem = $($($(trs[i]).children("td")[2]).children("a")[0]).text();
                var problemurl = "https://acm.sdut.edu.cn" + $($($(trs[i]).children("td")[2]).children("a")[0]).attr("href");
                var result = $($(trs[i]).children("td")[3]).text();
                if (infoArray[problemurl] == undefined) {
                    infoArray[problemurl] = {
                        "problem": problem,
                        "verdict": result
                    }
                }
            }

            resolve(submissionsNum);


        })
        setTimeout(function () { }, 300);
    }).then(function (data) {
        if (data > 0) {
            getInfo(url, page + 1, infoArray);
        }
    })
}

exports.crawl = function (sdut_handle) {
    var promise = new Promise(function (resolve, reject) {
        if (sdut_handle != "") {
            var infoArray = {};
            getUid(sdut_handle).then((uid) => {
                if (uid == -1) {
                    resolve({});
                } else {
                    getInfo("https://acm.sdut.edu.cn/onlinejudge2/index.php/Solution/status/username/" + sdut_handle + "/uid/" + uid + "/p/", 1, infoArray);
                    setTimeout(function () {
                        resolve(infoArray);
                    }, 20000);
                }
            })
        } else {
            resolve({});
        }
    })
    return promise;
}