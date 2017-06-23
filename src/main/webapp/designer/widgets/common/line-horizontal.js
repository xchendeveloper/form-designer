/**
 * Created by chenxing on 2017-6-16.
 */


// line-horizontal (横线) 控件
;(function (Designer) {

    var LineHorizontal = function () {
        this.element;
        this._init();
    }

    LineHorizontal.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindResizeable(this.element);
            this._bindDraggable(this.element)

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected line-horizontal-wrapper" style="padding: 10px 0;" id="' + itemId + '"><div name="line-horizontal" class="form-item line-horizontal"></div></div>');
            return item;
        },

        //绑定事件
        _bindEvent: function () {

        },

        _bindResizeable: function (element) {

            element.resizable({
                autoHide: true,
                stop: function (event, ui) {
                    var width = Designer.util.autoAline(ui.size.width);
                    var height = ui.size.height;
                    ui.element.css('width', width);
                    var child = ui.element.children('.form-item');
                    child.css('width', width);
                }
            });

        },

        _bindDraggable : function(element){
            Designer.widgets.Widget.bindDraggable(element);
        }


    }


    LineHorizontal.DEFAULTS = {}

    Designer.widgets.LineHorizontal = LineHorizontal;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.LineHorizontal',
        className: Designer.widgets.LineHorizontal
    };
    Designer.database.TemplateWidgetList.put(template);

})(Designer);

