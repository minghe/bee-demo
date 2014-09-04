KISSY.add("bee-demo/index", ["node"], function(S ,require, exports, module) {
var node = require("node");
/*
Thu Sep 04 2014 16:30:11 GMT+0800 (CST)
combined files by KMD:

src/index.js
src/mods/header.js
src/mods/article.js
*/
var beeDemoModsHeader, beeDemoModsArticle, beeDemoIndex;
beeDemoModsHeader = function (exports) {
  exports = {};
  var $ = node.all;
  exports = {
    init: function () {
      S.log('header init');
      $('header').html('this is header');
    }
  };
  return exports;
}();
beeDemoModsArticle = function (exports) {
  exports = {};
  var $ = node.all;
  exports = {
    init: function () {
      S.log('article init');
      $('article').html('this is article');
    }
  };
  return exports;
}();
beeDemoIndex = function (exports) {
  exports = {};
  var header = beeDemoModsHeader;
  header.init();
  var article = beeDemoModsArticle;
  article.init();
  return exports;
}();
module.exports = beeDemoIndex;
});