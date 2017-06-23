/**
 * Created by chenxing on 2017-6-16.
 */


//input控件
;(function (Designer) {

    /*存放模板
     * element 数据结构
     * {
     *   id : 'xxxx',
     *   className : Designer.widgets.Xxxx
     * }
     * */
    var widgetTemplateList = {
        list: [],
        put: function (element) {
            this.list.push(element)
        },
        get: function (id) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == id) {
                    return this.list[i].className;
                }
            }
        },
        getFormObject: function (id) {
            var ClassName = this.get(id);
            if (ClassName) {
                return new ClassName();
            }
        },
        remove: function (id) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == id) {
                    this.list.splice(i, 1);
                    break;
                }
            }
        }
    }

    /*存放表单上的对象集合*/
    var formWidgetList = {
        list: [],
        put: function (element) {
            this.list.push(element);
            return element;
        },
        get: function (id) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == id) {
                    return this.list[i];
                }
            }
        },
        remove: function (id) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == id) {
                    this.list.splice(i, 1);
                    break;
                }
            }
        },
        clean: function(){
            this.list.splice(0,this.list.length);

        },
        addAll:function(arr){
            this.list = this.list.concat(arr);
        }

    }


    Designer.database.FormWidgetList = formWidgetList;
    Designer.database.TemplateWidgetList = widgetTemplateList;

})(Designer);

