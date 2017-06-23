/**
 * Created by chenxing on 2017-6-16.
 */


// 控件 公共区域
;(function (Designer) {

    var Widget = {//初始化

        bindResizeable : function(element){
            element.resizable({
                autoHide: true,
                stop: function (event, ui) {
                    var width = Designer.util.autoAline(ui.size.width);
                    var height = Designer.util.autoAline(ui.size.height);
                    var id = element.attr('id');
                    var ele = Designer.database.FormWidgetList.get(id);
                    ele.width = width;
                    ele.height = height;
                }
            })
        },

        bindDraggable : function (element){
            element.draggable({
                scroll: false,
                cursor: "move",
                addClass: false,
                stop: function (event, ui) {
                    var top = Designer.util.autoAline(ui.position.top);
                    var left = Designer.util.autoAline(ui.position.left);
                    var id = element.attr('id');
                    var ele = Designer.database.FormWidgetList.get(id);
                    ele.top = top;
                    ele.left = left;
                }
            });
        }
    }

    Designer.widgets.Widget = Widget;

})(Designer);

