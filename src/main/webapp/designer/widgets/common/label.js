/**
 * Created by chenxing on 2017-6-16.
 */


//label控件
;(function (Designer) {

    var Label = function () {
        this.element;
        this._init();
    }

    Label.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindResizeable(this.element);
            this._bindDraggable(this.element);

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected label-wrapper" id="' + itemId + '"><label name="label" class="form-item form-item-style">标签名:</label></div>');
            return item;
        },

        //绑定事件
        _bindEvent: function () {

        },

        _bindResizeable: function (element) {

            Designer.widgets.Widget.bindResizeable(element);

        },

        _bindDraggable : function (element){

            Designer.widgets.Widget.bindDraggable(element);

        }


    }


    Label.DEFAULTS = {}

    Designer.widgets.Label = Label;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.Label',
        className: Designer.widgets.Label
    };
    Designer.database.TemplateWidgetList.put(template);

})(Designer);

