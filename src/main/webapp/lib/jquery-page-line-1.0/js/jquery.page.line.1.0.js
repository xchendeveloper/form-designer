/**
 * Created by chenxing on 2017-6-19.
 */
;(function ($) {
    $.pageLine = function (params) {
        params = params || {};
        if (!params.parentDOM) params.parentDOM = 'body';

        var top, left,parentDOMTop,parentDOMLeft,relativeFlag;

        function calc(params) {
            if ($(params.parentDOM).css('position') == 'relative' || $(params.parentDOM).css('position') == 'absolute') {
                top = 0;
                left = 0;
                parentDOMLeft = $(params.parentDOM).offset().left;
                parentDOMTop = $(params.parentDOM).offset().top;
                relativeFlag = true;
            } else {
                left = $(params.parentDOM).offset().left;
                top = $(params.parentDOM).offset().top;
                parentDOMLeft = 0;
                parentDOMTop = 0;
                relativeFlag = false;
            }
        }

        calc(params);

        var horizontalRuler = $('<div id="horizontal-ruler"></div>').css('left', left).css('top', top);
        var verticalRuler = $('<div id="vertical-ruler"></div>').css('left', left).css('top', top);

        var f = {
            /*创建水平参考线*/
            newH: function () {
                var hl = $('<div class="_horizontal_line"></div>');
                $(params.parentDOM).append(hl);
                return hl;
            },
            dashH: function(h1){
                $(document).bind("mousemove",function(e){
                    h1.css("left", 0);
                    if(relativeFlag){
                        h1.css("top", e.pageY - parentDOMTop);
                    }else{
                        h1.css("top", e.pageY);
                    }
                });
            },
            /*创建垂直参考线*/
            newV: function () {
                var vl = $('<div class="_vertical_line"></div>');
                $(params.parentDOM).append(vl);
                return vl;
            },
            dashV: function(v1){
                $(document).bind("mousemove",function(e){
                    v1.css("top", 0);
                    if(relativeFlag){
                        v1.css("left", e.pageX - parentDOMLeft);
                    }else{
                        v1.css("left", e.pageX);
                    }
                });
            }
        };

        horizontalRuler.bind("mousedown", function (e) {
            var h1 = f.newH();
            f.dashH(h1);
        });

        verticalRuler.bind("mousedown", function (e) {
            var v1 = f.newV();
            f.dashV(v1);
        });

        $(document).mouseup(function(e){
            $(this).unbind('mousemove');
        });

        $(document).on('mousedown','._horizontal_line',function(e){
            var hl = $(this);
            f.dashH(hl);
        });

        $(document).on('mousedown','._vertical_line',function(e){
            var vl = $(this);
            f.dashV(vl);
        });

        $(window).resize(function(e){
            calc(params);
        });

        $(params.parentDOM).append(horizontalRuler).append(verticalRuler);
    }
})(jQuery);
