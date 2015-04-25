var request = require('request');
var trim = require('./lib/trim');

function PullWord(opt) {
    this.setting = {
        url: 'http://api.pullword.com/post.php', /* api url */
        threshold: 0.5, /* 阀值 */
        debug: 0, /* 调式模式, 忽略array的值, 返回原始字符串 */
        array: 1 /* 返回数组 */
    };

    this.init(opt);
};

PullWord.prototype.init = function (opt) {
    for (var attr in opt) {
        this.setting[attr] = opt[attr];
    }
};

PullWord.prototype.splitText = function (source, callback) {

    var self = this;

    if (!source) return  self.setting.debug || !self.setting.array? '' : [];

    var options = {
        url: self.setting.url,
        form: {
            source: source,
            param1: self.setting.threshold,
            param2: self.setting.debug
        }
    };

    request.post(options, function (err, response, result) {
        if (!err && response.statusCode == 200) {

            if ((!self.setting.debug) && self.setting.array) {
                result = trim(result).split('\r\n');
            }
        }

        callback(err, result);
    });
};

module.exports = PullWord;

