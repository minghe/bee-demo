KISSY.add('bee-demo/index',["./mods/header","./mods/article"],function(S ,require, exports, module) {
//初始化header模块
var header = require('./mods/header');
header.init();

//初始化article模块
var article = require('./mods/article');
article.init();
});