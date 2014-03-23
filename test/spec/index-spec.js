KISSY.add(function (S,require) {
    var index = require('bee-demo/index');
    describe('bee-demo index', function () {
        it('index init',function(){
            expect(index).toBeTruthy();
        })
    });

});