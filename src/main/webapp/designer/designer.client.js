/**
 * Created by chenxing on 2017-6-16.
 */

;(function (Designer) {

    var Client = function () {
        this._init();
    }

    var layer;
    layui.use('layer', function(){
        layer = layui.layer;
    });

    var f = {
        bindDragAndResizeEvent2Attr: function (element) {
            //定义双向绑定，数据修改时触发页面元素和属性栏变化
            Object.defineProperty(element, "displayName", {
                configurable: true,
                get: function(){
                    return element._displayName_value;
                },
                set: function (newValue) {
                    element._displayName_value = newValue;
                    $('#displayName').val(newValue);
                    $('#' + element.id +" label").text(newValue);
                }
            });

            Object.defineProperty(element, "name", {
                configurable: true,
                get: function(){
                    return element._name_value;
                },
                set: function (newValue) {
                    element._name_value = newValue;
                    $('#name').val(newValue);
                    $('#' + element.id).attr('name',newValue);
                }
            });

            Object.defineProperty(element, "width", {
                configurable: true,
                get: function(){
                    return element._width_value;
                },
                set: function (newValue) {
                    element._width_value = newValue;
                    $('#width').val(newValue);
                    $('#' + element.id).css('width', newValue);
                    var child = $('#' + element.id).children('.form-item');
                    child.css('width', newValue > 4 ? newValue - 4 : newValue);
                }
            });

            Object.defineProperty(element, "height", {
                configurable: true,
                get: function(){
                    return element._height_value;
                },
                set: function (newValue) {
                    element._height_value = newValue;
                    $('#height').val(newValue);
                    $('#' + element.id).css('height', newValue);
                    var child = $('#' + element.id).children('.form-item');
                    child.css('height', newValue> 4 ? newValue - 4 : newValue);
                }
            });

            Object.defineProperty(element, "top", {
                configurable: true,
                get: function(){
                    return element._top_value;
                },
                set: function (newValue) {
                    element._top_value = newValue;
                    $('#top').val(newValue);
                    $('#' + element.id).css('top', newValue);
                }
            });

            Object.defineProperty(element, "left", {
                configurable: true,
                get: function(){
                    return element._left_value;
                },
                set: function (newValue) {
                    element._left_value = newValue;
                    $('#left').val(newValue);
                    $('#' + element.id).css('left', newValue);
                }
            });

            Object.defineProperty(element, "fontSize", {
                configurable: true,
                get: function(){
                    return element._font_size_value;
                },
                set: function (newValue) {
                    element._font_size_value = newValue;
                    $('#fontSize').val(newValue);
                    $('#' + element.id).css('font-size', newValue+'px');
                }
            });

            Object.defineProperty(element, "color", {
                configurable: true,
                get: function(){
                    return element._color_value;
                },
                set: function (newValue) {
                    element._color_value = newValue;
                    if($('#' + element.id).hasClass("line-horizontal-wrapper") || $('#' + element.id).hasClass("line-vertical-wrapper")){
                        var child = $('#' + element.id).children('.form-item');
                        child.css('background',newValue);
                        return;
                    }
                    $('#' + element.id).css('color', newValue);
                }
            });

            Object.defineProperty(element, "fontWeight", {
                configurable: true,
                get: function(){
                    return element._font_weight_value;
                },
                set: function (newValue) {
                    element._font_weight_value = newValue;
                    $('#' + element.id).css('font-weight', newValue);
                }
            });
        },
        bindAttrChange2Element: function () {

            //显示名称设置
            $('#displayName').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.displayName = $(this).val();
            });

            $('#name').blur(function(e){
                var ele = f.getSelectedElementFromDatabase();
                ele.name = $(this).val();
            });

            $('#width').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.width = Designer.util.autoAline($(this).val());
            });

            $('#height').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.height = Designer.util.autoAline($(this).val());
            });

            $('#left').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.left = Designer.util.autoAline($(this).val());
            });

            $('#top').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.top = Designer.util.autoAline($(this).val());
            });

            $('#fontSize').blur(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.fontSize = $(this).val();
            });

            $('#color').change(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.color = $(this).val();
            });

            $('#fontWeight').change(function(){
                var ele = f.getSelectedElementFromDatabase();
                ele.fontWeight = $(this).val();
            });

        },
        getSelectedElementFromDatabase : function(id){
            if(!id){
                id = $('.form-item-selected').attr('id');
            }
            if(!id){
                return ;
            }
            return Designer.database.FormWidgetList.get(id);
        },
        renderAttr : function(data){
            $('#displayName').val(data.displayName);
            $('#name').val(data.name);
            $('#left').val(data.left);
            $('#top').val(data.top);
            $('#width').val(data.width);
            $('#height').val(data.height);
            $('#fontSize').val(data.fontSize);
            $('#color').val(data.color);
            $('#fontWeight').val(data.fontWeight);
        },
        getEleText:function(element){
            var text = $($(element).children()[0]).text();
            return text ?  text : '';
        },
        getEleName:function(element){
            return $($(element).children()[0]).attr('name');
        },
        getElement: function(element){
            var id = element.attr('id');
            var element = Designer.database.TemplateWidgetList.getFormObject(id);
            return element;
        },
        removeSelectedStatus: function(){
            $('.form-item-selected').removeClass('form-item-selected');
        },
        loadTemplate:function (id) {
            if(id){
                $.post('/formdesigner/loadTemplate',{id:id},function(data){
                    var widgets = eval('('+data.pageData+')');
                    for(var i=0;i<widgets.length;i++){
                        f.bindDragAndResizeEvent2Attr(widgets[i]);
                    }
                    var html = data.template;
                    Designer.database.FormWidgetList.clean();
                    Designer.database.FormWidgetList.addAll(widgets);
                    $('#page-container').empty();
                    $('#page-container').append(html);

                    //绑定widget自身的事件
                    for(var i=0;i<widgets.length;i++){
                        var id = widgets[i].id;
                        var element = $('#'+id);
                        widgets[i].widget._bindEvent(element);
                    }

                });
            }
        }
    }

    Client.prototype = {

        //初始化
        _init: function () {

            this._bindEvent();

        },

        _bindEvent: function () {

            var self = this;

            //初始化属性修改事件
            f.bindAttrChange2Element();

            //选中事件
            $(document).on('click','.form-item-wrapper',function(){
                if(!$(this).hasClass('form-item-selected')){
                    $('.form-item-selected').removeClass('form-item-selected');
                    $(this).addClass('form-item-selected');
                    var id = $(this).attr('id');
                    var ele = f.getSelectedElementFromDatabase(id);
                    f.renderAttr(ele);
                }
            });

            $('#page').click(function(){
                $('.form-item-selected').removeClass('form-item-selected');
            });


            $(window).keydown(function(event){
                //删除事件
                if(event.keyCode == 46){
                    var id = $('.form-item-selected').attr('id');
                    $('.form-item-selected').remove();
                    Designer.database.FormWidgetList.remove(id);
                }
                //移动元素事件
                else if(event.keyCode == 37){
                    var ele = f.getSelectedElementFromDatabase();
                    ele.left = ele.left - 1;
                }else if(event.keyCode == 38){
                    var ele = f.getSelectedElementFromDatabase();
                    ele.top = ele.top - 1;
                }else if(event.keyCode == 39){
                    var ele = f.getSelectedElementFromDatabase();
                    ele.left = ele.left + 1;
                }else if(event.keyCode == 40){
                    var ele = f.getSelectedElementFromDatabase();
                    ele.top = ele.top + 1;
                }
            });

            //调整空间位置


            //预览
            $('#preview').click(function () {
                window.open("form-preview.html", "表单预览");
            });

            //左侧按钮展开事件
            $('.panel_container .panel_title').click(function () {
                var container = $(this).parent();
                container.hasClass("panel_collapsed") ? container.removeClass("panel_collapsed") : container.addClass("panel_collapsed");
            });

            $('.tab-list .tab').click(function(){
                if(!$(this).hasClass("active")){
                    $(this).addClass('active');
                    $(this).siblings().removeClass("active");
                    if($(this).hasClass('tab_style')){
                        $('.tab_style_content').removeClass('no-visible');
                        $('.tab_service_content').addClass('no-visible');
                    }else {
                        $('.tab_style_content').addClass('no-visible');
                        $('.tab_service_content').removeClass('no-visible');
                    }
                }
            });

            //拖动事件
            $('.widget-list .widget-item').draggable({
                scroll: false,
                containment: "document",
                helper: 'clone',
                cursor: "move"
            });

            //放置事件
            $('#page').droppable({
                drop: function (event, ui) {
                    var source = ui.draggable;
                    if (source.hasClass('widget-item')) {
                        var widgetObj = f.getElement(source);
                        if (!widgetObj) {
                            alert('不存在这个元素！');
                            return;
                        }
                        var element = widgetObj.element;
                        element.css('position', 'absolute');
                        f.removeSelectedStatus();
                        $("#page-container").append(element);

                        //注册监听器
                        var data = {
                            id: element.attr('id'),
                            widget : widgetObj
                        };

                        f.bindDragAndResizeEvent2Attr(data);
                        var ele = Designer.database.FormWidgetList.put(data);

                        //触发默认监听事件
                        ele.displayName = f.getEleText(element);
                        ele.name = f.getEleName(element);
                        ele.color = $('#color').val();  //使用上一个元素设置的颜色，主要为了方便公文表单制作。（非公文项目可以去掉）
                        ele.top = Designer.util.autoAline(ui.position.top - $('#page').offset().top);
                        ele.left = Designer.util.autoAline(ui.position.left - $('#page').offset().left);
                        var width = element.css('width');
                        var height = element.css('height');
                        width = parseInt(width.substring(0, width.length - 2));
                        height = parseInt(height.substring(0, height.length - 2));
                        ele.width = width > 0 ? width : 1;
                        ele.height = height > 0 ? height : 1;

                    }
                }
            });

            $('#save').click(function(){
                layer.prompt({
                    shadeClose: true,
                    formType: 2,
                    value: '',
                    title: '输入表单名称'
                }, function(value, index, elem){
                    if(value){
                        //将表单信息保存
                        var pageData = JSON.stringify(Designer.database.FormWidgetList.list);
                        var htmlStr = $('#page-container').html();
                        var processId = $('#process-list').val();
                        $.post("/formdesigner/save",{template:htmlStr,pageData:pageData,processId:processId,pageName:value},function(data) {
                            if(data.status == 200){
                                alert("保存成功！");
                                layer.close(index);
                            }
                        });
                    }
                });
            });

            $('#import').click(function(){
                layer.open({
                    type: 2,
                    title: '选择要导入的模板',
                    shadeClose: true,
                    shade: 0.3,
                    area: ['600px', '400px'],
                    content: 'import-template.html', //iframe的url
                    btn: ['确认选择'],
                    yes: function ( index ,layero) {
                        var body = layer.getChildFrame('body', index);
                        var id = body.find('input[type="radio"]:checked').val();
                        if(id){
                            f.loadTemplate(id);
                            layer.close(index);
                        }
                    }
                });
            });
        }
    }

    Designer.client.Client = Client;

})(Designer);
