package com.suppercoder.java.formdesigner.common.system;

import com.jfinal.core.Controller;

/**
 * Created by chenxing on 2017-5-5.
 */
public class IndexController extends Controller{

    public void index(){
        render("/form-designer.html");
    }

}
