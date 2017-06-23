/**
 * Created by chenxing on 2017-6-16.
 *
 * widget 和 client 交互  client 统一处理 页面显示 和 数据存储
 *
 */

;(function(win,$){

    var Designer = win.Designer || {};
    win.Designer = Designer;

    Designer.util = {};  //工具
    Designer.database = {}; //数据存储
    Designer.widgets = {};  //widgets
    Designer.client = {};  //客户端方法

})(window,window.jQuery);


$(function(){
    //框架高度
    var height = $(window).height() - 41;
    $('.framework-left,.framework-middle,.framework-right').css("height",height);

});
