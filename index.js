var request = require('request');
var trim = require('./lib/trim');

/**
 * PullWord constructor
 *
 * @param {object}  options
 * @param {string}  options.url - pullword.com api url
 * @param {number}  options.threshold - 阀值(0-1)
 * @param {boolean} options.debug - 调式模式, 开启后会忽略array的值, 返回原始字符串
 * @param {boolean} options.array - 返回数组
 * @api public
 */
function PullWord(options) {
    this.settings = {
        url: 'http://api.pullword.com/post.php', /* api url */
        threshold: 0.5, /* 阀值 */
        debug: 0, /* 调式模式, 忽略array的值, 返回原始字符串 */
        array: 1 /* 返回数组 */
    };

    this.init(options);
};

/**
 * Init Settings
 *
 * @param options
 * @api private
 */
PullWord.prototype.init = function (options) {
    for (var attr in options) {
        this.settings[attr] = options[attr];
    }
};

/**
 * Send api request to split text
 *
 * @param {string} source
 * @param {function} callback
 * @api public
 */
PullWord.prototype.splitText = function (source, callback) {

    var self = this;

    if (!source) {
        source = self.settings.debug || !self.settings.array? '' : [];
        return callback(null, source);
    }

    var options = {
        url: self.settings.url,
        form: {
            source: source,
            param1: self.settings.threshold,
            param2: self.settings.debug? 1: 0 // support true/false
        }
    };

    request.post(options, function (err, response, result) {

        if (!err && response.statusCode == 200) {

            result = trim(result);

            if ((!self.settings.debug) && self.settings.array) {
                result = result.split('\r\n');
            }

        }

        callback(err, result);
    });
};

/**
 * Expose `PullWord`
 */
module.exports = PullWord;
