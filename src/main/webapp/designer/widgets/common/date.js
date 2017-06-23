/**
 * Created by chenxing on 2017-6-16.
 */


//input控件
;(function (Designer) {

    var Date = function () {
        this.element;
        this._init();
    }

    Date.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindEvent(this.element);

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected date-wrapper" id="' + itemId + '"><input name="date" class="form-item form-item-style" type="date" /></div>');
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


    Date.DEFAULTS = {}

    Designer.widgets.Date = Date;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.Date',
        className: Designer.widgets.Date
    };
    Designer.database.TemplateWidgetList.put(template);


})(Designer);

