KISSY.add('bee-demo/mods/header',["node"],function(S ,require, exports, module) {
var $ = require('node').all;
module.exports = {
    init:function(){
        S.log('header init');
        $('header').html('this is header');
    }
}
});