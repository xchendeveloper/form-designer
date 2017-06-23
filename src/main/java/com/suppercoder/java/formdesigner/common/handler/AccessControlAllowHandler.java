package com.suppercoder.java.formdesigner.common.handler;

import com.jfinal.handler.Handler;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by chenxing on 2017-3-27.
 */
public class AccessControlAllowHandler extends Handler {

    Prop prop = PropKit.use("default.properties");
    String[] originArr = prop.get("access.control.allow.origin").replaceAll("\\s*", "").split(",");

    @Override
    public void handle(String s, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, boolean[] booleans) {
        String accessOrigin = isAllowOrigin(httpServletRequest);
        if (accessOrigin != null) {
            httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, User-Agent");
            httpServletResponse.setHeader("Access-Control-Allow-Origin", accessOrigin);
            httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
        }

        next.handle(s, httpServletRequest, httpServletResponse, booleans);
    }

    private String isAllowOrigin(HttpServletRequest httpServletRequest) {

        String origin = httpServletRequest.getHeader("Origin");

        for (String temp : originArr) {
            if (temp.equals(origin)) {
                return temp;
            }
        }
        return null;

    }
}
