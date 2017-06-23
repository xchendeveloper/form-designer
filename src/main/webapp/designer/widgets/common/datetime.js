/**
 * Created by chenxing on 2017-6-16.
 */


//input控件
;(function (Designer) {

    var Datetime = function () {
        this.element;
        this._init();
    }

    Datetime.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindEvent(this.element);

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected datetime-wrapper" id="' + itemId + '"><input  type="datetime" name="datetime" class="form-item form-item-style"/></div>');
            return item;
        },

        //绑定事件
        _bindEvent: function (element) {
            this._bindResizeable(element);
            this._bindDraggable(element);
        },

        _bindResizeable: function (element) {

            Designer.widgets.Widget.bindResizeable(element);

        },

        _bindDraggable: function (element) {

            Designer.widgets.Widget.bindDraggable(element);

        }


    }


    Datetime.DEFAULTS = {}

    Designer.widgets.Datetime = Datetime;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.Datetime',
        className: Designer.widgets.Datetime
    };
    Designer.database.TemplateWidgetList.put(template);


})(Designer);

