package com.suppercoder.java.formdesigner.designer;

import com.jfinal.core.Controller;
import com.suppercoder.java.formdesigner.common.model.ResultMessage;
import com.suppercoder.java.formdesigner.common.model.Template;
import com.xiaoleilu.hutool.json.JSONUtil;

import java.util.List;

/**
 * Created by chenxing on 2017-6-21.
 */
public class DesignerController extends Controller {

    public void save(){
        Template template = getBean(Template.class,"");
        System.out.println(JSONUtil.toJsonPrettyStr(template));
        if(template.save()){
            renderJson(new ResultMessage(200));
        }else{
            renderJson(new ResultMessage(500,"保存失败！"));
        }
    }

    public void templateList(){
        List<Template> list = Template.dao.find(" select * from t_template ");
        renderJson(list);
    }

    public void loadTemplate(){
        String id = getPara("id");
        Template template = Template.dao.findById(id);
        renderJson(template);
    }

}
