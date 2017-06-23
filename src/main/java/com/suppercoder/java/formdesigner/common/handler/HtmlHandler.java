package com.suppercoder.java.formdesigner.common.handler;

import com.jfinal.handler.Handler;
import com.jfinal.render.RenderManager;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by chenxing on 2017-5-24.
 * 处理所有.html的模板渲染
 */
public class HtmlHandler extends Handler {
    public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
        response.setCharacterEncoding("UTF-8");
        if(target.endsWith(".html")){
            try {
                RenderManager.me().getEngine().getTemplate(target).render(null,response.getWriter());
                isHandled[0] = true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{
            next.handle(target,request,response,isHandled);
        }
    }
}
