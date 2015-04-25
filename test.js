var should = require('should');
var API = require('./index.js');
var trim = require('./lib/trim.js');

describe('lib', function() {
    describe('#trim', function () {

        it('should trim', function(done) {
            trim(' foo ').should.equal('foo');
            done();
        });

        it('should trim more whitespaces', function(done) {
            trim('    foo     ').should.equal('foo');
            done();
        });

        it('should trim newlines', function(done) {
            trim('   \r\n foo    \r\n').should.equal('foo');
            done();
        });

        it('trim number should throw error', function(done) {
            (function() {
                trim(123);
            }).should.throw();
            done();
        });

        it('trim empty string should return empty string', function(done) {
            trim('').should.equal('');
            done();
        });

        it('trim null should return empty string', function(done) {
            trim(null).should.equal('');
            done();
        });

        it('trim undefined should return empty string', function(done) {
            trim(undefined).should.equal('');
            done();
        });
    })
})

describe('api', function () {
    var defaultOptions = {
        url: 'http://api.pullword.com/post.php', /* api url */
        threshold: 0.5, /* 阀值 */
        debug: 0, /* 调式模式, 忽略array的值, 返回原始字符串 */
        array: 1 /* 返回数组 */
    };

    describe('#default', function () {
        it('should return "hello"', function (done) {
            var api = new API();
            api.splitText('Hello', function (err, res) {
                should(res[0]).equal('hello');
                done();
            });
        });
    });

    describe('#custom', function () {
        it('should return array', function (done) {
            var api = new API({
                debug: 0,
                array: 1
            });
            api.splitText('Hello', function (err, res) {
                should(res).be.instanceof(Array).and.lengthOf(1);
                done();
            });
        });

        it('should return string', function (done) {
            var api = new API({
                debug: 0,
                array: 0
            });
            api.splitText('Hello', function (err, res) {
                should(res).be.instanceof(String);
                done();
            });
        });

        it('should ignore array value and return string', function (done) {
            var api = new API({
                debug: 1,
                array: 1
            });
            api.splitText('Hello', function (err, res) {
                should(res).be.instanceof(String);
                done();
            })
        });
    })
});

