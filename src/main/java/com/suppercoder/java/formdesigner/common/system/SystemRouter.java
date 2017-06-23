package com.suppercoder.java.formdesigner.common.system;

import com.jfinal.config.Routes;
import com.suppercoder.java.formdesigner.common.system.upload.UploaderController;

/**
 * Created by chenxing on 2017-5-11.
 */
public class SystemRouter extends Routes {
    public void config() {
        //默认跳转
        add("/",IndexController.class);
        //上传
        add("/upload",UploaderController.class);

    }
}
