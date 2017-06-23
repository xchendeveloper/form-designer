package com.suppercoder.java.formdesigner.designer;

import com.jfinal.config.Routes;

/**
 * Created by chenxing on 2017-6-21.
 */
public class DesignerRouter extends Routes {
    public void config() {
        add("/formdesigner",DesignerController.class);
    }
}
