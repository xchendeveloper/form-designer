/**
 * Created by chenxing on 2017-6-16.
 */

;(function(Designer){

    //生成widget id
    Designer.util.generalWidgetId = function(){
        var oDate = new Date(); //实例一个时间对象；
        var id = 'widget_' + oDate.getFullYear() +
            (oDate.getMonth() + 1) +
            oDate.getDate() +
            oDate.getHours() +
            oDate.getMinutes() +
            oDate.getSeconds() +
            oDate.getMilliseconds();
        return id;
    }

    //自动对齐
    Designer.util.autoAline = function (x) {
        return Math.round(parseInt(x)/ 2) * 2;
    }

})(Designer);
