KISSY.add('bee-demo/mods/article',['node'], function(S,require){
    var $ = require('node').all;
    return {
        init:function(){
            S.log('article init');
            $('article').html('use bee-demo/mods/article');
        }
    }
});