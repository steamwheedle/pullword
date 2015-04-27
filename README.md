# Pullword

A NodeJS package for [pullword.com](http://pullword.com)

## Install

```
npm install pullword
```

## Usage and API

```
var defaultOptions = {
    url: 'http://api.pullword.com/post.php', /* api url */
    threshold: 0.5, /* must be [0-1] */
    debug: 0, /* debug=1, debug mode in on(show all probabilities of each word) */
    array: 1 /* array=0, return raw-string */
};


var api = new require('pullword')(defaultOptions);


api.pullword('老板来碗牛肉面，不要香菜。', function (err, result) {
    console.log(result);
});

// ['老板', '牛肉', '牛肉面', '不要', '香菜']


api.pullword('老板来碗牛肉面，不要香菜。', { debug: 1}, function (err, result) {
    console.log(result);
});

//[ [ '老板', 1 ],
//    [ '牛肉', 0.778223 ],
//    [ '牛肉面', 0.966055 ],
//    [ '不要', 1 ],
//    [ '香菜', 1 ] ]

```
