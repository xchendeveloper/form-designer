/**
 * Created by chenxing on 2017-6-16.
 */


// line-vertical (竖线) 控件
;(function (Designer) {

    var LineVertical = function () {
        this.element;
        this._init();
    }

    LineVertical.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindResizeable(this.element);
            this._bindDraggable(this.element)

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected line-horizontal-wrapper" style="padding: 0 10px;" id="' + itemId + '"><div name="line-vertical" class="form-item line-vertical"></div></div>');
            return item;
        },

        //绑定事件
        _bindEvent: function () {

        },

        _bindResizeable: function (element) {

            element.resizable({
                autoHide: true,
                stop: function (event, ui) {
                    var height = Designer.util.autoAline(ui.size.height);
                    ui.element.css('height', height);
                    var child = ui.element.children('.form-item');
                    child.css('height', height);
                }
            });

        },

        _bindDraggable : function(element){
            Designer.widgets.Widget.bindDraggable(element);
        }


    }


    LineVertical.DEFAULTS = {}

    Designer.widgets.LineVertical = LineVertical;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.LineVertical',
        className: Designer.widgets.LineVertical
    };
    Designer.database.TemplateWidgetList.put(template);

})(Designer);

