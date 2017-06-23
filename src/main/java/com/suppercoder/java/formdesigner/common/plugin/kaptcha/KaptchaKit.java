package com.suppercoder.java.formdesigner.common.plugin.kaptcha;

import com.google.code.kaptcha.Producer;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;

/**
 * Created by chenxing on 2017-3-7.
 */
public class KaptchaKit {

    private static Producer producer;
    private static String sessionKey;
    private static String sessionDate;

    protected static void setAll(Producer producer,String sessionKey,String sessionDate){
        KaptchaKit.producer = producer;
        KaptchaKit.sessionKey = sessionKey;
        KaptchaKit.sessionDate = sessionDate;
    }

    public static void renderCaptcha(HttpServletResponse resp,HttpSession session) throws IOException {
        resp.setHeader("Cache-Control", "no-store, no-cache");
        resp.setContentType("image/jpeg");
        String capText = KaptchaKit.producer.createText();
        BufferedImage bi = KaptchaKit.producer.createImage(capText);
        ServletOutputStream out = resp.getOutputStream();
        ImageIO.write(bi, "jpg", out);
        session.setAttribute(KaptchaKit.sessionKey, capText);
        System.out.println(session.getId());
        session.setAttribute(KaptchaKit.sessionDate, new Date());
    }

    public static boolean validateCaptcha(String coderText, HttpSession session){
        try {
            String sessionKeyValue = (String)session.getAttribute(KaptchaKit.sessionKey);
            if(sessionKeyValue!=null && !sessionKeyValue.equals("") && sessionKeyValue.equals(coderText)){
                return true;
            }
            resetCaptcha(session);
            return false;

        }catch (Exception e){
            return false;
        }

    }

    public static void resetCaptcha(HttpSession session){
        session.setAttribute(KaptchaKit.sessionKey,"");
    }

}
