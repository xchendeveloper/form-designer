/**
 * Created by chenxing on 2017-6-16.
 */


//input控件
;(function (Designer) {

    var Input = function () {
        this.element;
        this._init();
    }

    Input.prototype = {

        //初始化
        _init: function () {

            this.element = this._generalHtmlElement();
            this._bindEvent(this.element);

        },

        //生成html
        _generalHtmlElement: function () {
            var itemId = Designer.util.generalWidgetId();
            var item = $('<div class="form-item-wrapper form-item-selected input-wrapper" id="' + itemId + '"><input name="input" class="form-item form-item-style" type="text" /></div>');
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


    Input.DEFAULTS = {}

    Designer.widgets.Input = Input;

    //将自身注册到Designer.database.TemplateWidgetList中
    var template = {
        id: 'Designer.widgets.Input',
        className: Designer.widgets.Input
    };

    Designer.database.TemplateWidgetList.put(template);


})(Designer);

