/**
 * Created by chenxing on 2017-6-16.
 */


//input控件
;(function (Designer) {

    var Textarea = function () {
        this.element;
        this._init();
    }

    Textarea.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindEvent(this.element);

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected textarea-wrapper" id="' + itemId + '"><textarea name="textarea" class="form-item form-item-style"></textarea></div>');
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


    Textarea.DEFAULTS = {}

    Designer.widgets.Textarea = Textarea;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.Textarea',
        className: Designer.widgets.Textarea
    };
    Designer.database.TemplateWidgetList.put(template);


})(Designer);

