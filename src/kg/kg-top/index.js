//返回顶部组件
//by 剑平
var Node = require('node');
var $ = Node.all;
var Base = require('base');
var Anim = require('anim');
var VcGotoTop = Base.extend({
    initializer:function(){
        var self = this;
        var showPos = self.get('showPos');
        //响应窗口的改变，改变按钮出现的高度
        if(showPos === 0){
            $(window).on('resize',function(ev){
                self.set('showPos',$(window).height());
            })
        }
    },
    //创建DOM节点
    _create: function(){
        var self = this;
        var tpl = self.get('tpl');
        var $target = $(tpl);
        self.set('$target',$target);
        $('body').append($target);
        $target.on('click',function(ev){
            ev.preventDefault();
            self.run();
        });
        return $target;
    },
    //运行
    render: function(){
        var self = this;
        var showPos = self.get('showPos');
        var $target = self.get('$target');
        $(window).on('scroll',function(ev){
            if ($(window).scrollTop() > showPos) {
                //不存在目标节点，使用模板创建个
                if(!$target.length){
                    $target = self._create();
                }
                S.later(function(){
                    self.set('visible',true);
                });
            } else {
                self.set('visible',false);
            }
        });
        $target.length && $target.on('click',function(ev){
            ev.preventDefault();
            self.run();
        });
    },
    //触发动画滚动
    run: function(){
        var self = this;
        var scrollSpeed = self.get('scrollSpeed');
        $('body').animate({scrollTop: 0},scrollSpeed,'swing');
    }
},{
    ATTRS:{
        //目标元素
        $target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        },
        //指定什么位置出现top元素
        //默认为0，一屏外
        showPos:{
            value:0,
            getter: function(v){
                if(v>0) return v;
                return $(window).height();
            }
        },
        //模板
        tpl:{
            value:'<div class="J_Top goto-top"><div class="top-bg"></div><span class="vc-iconfont top-icon">&#xe600;</span></div>'
        },
        //是否处于显示状态
        visible:{
            value: false,
            setter: function(v){
                var self = this;
                var $target = self.get('$target');
                var showClass = self.get('showClass');
                $target[v && 'addClass' || 'removeClass'](showClass);
                return v;
            }
        },
        //滚动速度
        scrollSpeed:{
            value:1
        },
        //显示的class名
        showClass:{value:'top-show'}
    }
});

module.exports = VcGotoTop;