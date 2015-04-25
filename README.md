# pullword-api

PullWord API Module for NodeJS

## Usage and API

```
var api = new require('pullword-api')();

api.splitText('老板来碗牛肉面，不要香菜。', function (err, result) {
    console.log(result);
});

// ['老板', '牛肉', '牛肉面', '不要', '香菜']
```
