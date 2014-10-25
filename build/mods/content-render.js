KISSY.add('bee-demo/mods/content-render',["./content","kg/xtemplate/3.3.3/runtime"],function(S ,require, exports, module) {


var tpl = require("./content");
var XTemplateRuntime = require("kg/xtemplate/3.3.3/runtime");
var instance = new XTemplateRuntime(tpl);
module.exports = function(){
return instance.render.apply(instance,arguments);
};
});