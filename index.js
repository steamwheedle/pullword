var request = require('request');
var trim = require('./lib/trim');
var extend = require('util')._extend;

/**
 * PullWord constructor
 *
 * @param {object}  [options] - 默认配置项
 * @param {string}  options.url - pullword.com 接口地址
 * @param {number}  options.threshold - 阀值(0-1)
 * @param {boolean} options.debug - 调式模式
 * @param {boolean} options.array - 返回数组
 * @api public
 */
function PullWord(options) {
    this.defaultSettings = {
        url: 'http://api.pullword.com/post.php', /* api url */
        threshold: 0.5, /* 阀值 */
        debug: 0, /* 调式模式 */
        array: 1 /* 返回数组 */
    };

    this.init(options);
};

/**
 * Init Default Settings
 *
 * @param options
 * @api private
 */
PullWord.prototype.init = function (options) {
    extend(this.defaultSettings, options);
};

/**
 * Send api request to pull word
 *
 * @param {string} source
 * @param {object} [options] - custom settings
 * @param {function} callback
 * @api public
 */
PullWord.prototype.pullword = function (source, options, callback) {
    var self = this;

    /* support overload */
    if (typeof options === 'function') {
        callback = options;
    }

    var settings = extend({}, self.defaultSettings);

    if (typeof options === 'object') {
        extend(settings, options);
    }

    if (!source) {
        source = settings.debug || !settings.array ? '' : [];
        return callback(null, source);
    }

    var params = {
        url: settings.url,
        form: {
            source: source,
            param1: settings.threshold,
            param2: settings.debug ? 1 : 0 // support true or false
        }
    };

    request.post(params, self.wrap(settings, callback));
};

/**
 * wrap the request callback function
 *
 * @param {object} settings - custom settings
 * @param {function} callback
 * @returns {function}
 * @api private
 */
PullWord.prototype.wrap = function (settings, callback) {
    return function (err, response, result) {
        if (err) return callback(err);

        result = trim(result);

        if (settings.array) {
            result = result.split('\r\n');

            if (settings.debug) {
                result = result.map(function (v) {
                    v = v.split(':');
                    v[1] = Number(v[1]);
                    return v;
                });
            }
        }

        callback(err, result);
    }
};


/**
 * Export PullWord Instance
 */
module.exports = function (options) {
    return new PullWord(options);
}

/**
 * Expose PullWord
 */
module.exports.PullWord = PullWord;
