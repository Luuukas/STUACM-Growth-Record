var superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async")

function submissionPage(url) {
    return new Promise(function (resolve, reject) {
        superagent.get(url).end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text);
            if ($("title").text() == "Codeforces") {
                resolve(-1);
            } else {
                var pageli = $(".pagination ul li");
                var lilen = pageli.length;
                var lasta = $($(pageli[lilen - 2]).children("span")[0]).children("a")[0];
                var pageNum = parseInt($(lasta).text());    // number of submissions pages
                resolve(pageNum);
            }
        })
    })
}

var delay = parseInt((Math.random() * 30000000) % 1000, 10);
function getInfo(url, cnt, tot, infoArray) {
    if (cnt > tot)
        return;
    var p = new Promise(function (resolve, reject) {
        superagent.get(url + cnt).end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text);
            var atable = $(".status-frame-datatable tbody tr");

            var submissionsNum = atable.length - 1;    // how many submissions in this page

            for (var j = 1; j <= submissionsNum; j++) {
                var atr = $(atable[j]).children("td");
                var problem = $($(atr[3]).children("a")[0]).text();    // name of a problem
                problem = problem.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                var problemurl = "https://codeforces.com" + $($(atr[3]).children("a")[0]).attr("href")    // url of a problem
                var verdict = $($(atr[5]).children("span")[0]).attr("submissionverdict");    // state of the submission

                if (infoArray[problemurl] == undefined) {
                    infoArray[problemurl] = {
                        "problem": problem,
                        "verdict": verdict
                    }
                }
            }
        })
        setTimeout(function () { }, 300);
        resolve(cnt + 1);
    }).then((nextPage) => {
        getInfo(url, nextPage, tot, infoArray);
    })
}

exports.crawl = function (codeforces_handle) {
    var p = new Promise(function (resolve, reject) {
        if (codeforces_handle != "") {
            var infoArray = {};
            var baseUrl = "https://codeforces.com/submissions/" + codeforces_handle;

            submissionPage(baseUrl).then(function (data) {
                if (data == -1) {
                    resolve({});
                } else {
                    getInfo(baseUrl + "/page/", 1, data, infoArray);
                    setTimeout(function () {
                        resolve(infoArray);
                    }, 20000);
                }
            });
        }
        else {
            resolve({});
        }
    })
    return p;
}