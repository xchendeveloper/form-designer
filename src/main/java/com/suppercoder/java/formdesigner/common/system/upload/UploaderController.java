package com.suppercoder.java.formdesigner.common.system.upload;

import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by chenxing on 2017-5-19.
 */
public class UploaderController extends Controller {

    public void index(){
        UploadFile file = getFile();
        String uploadPath = file.getUploadPath();
        uploadPath = uploadPath.replace("/",File.separator);
        String originalFileName = file.getOriginalFileName();
        String fileName = file.getFileName();
        //解 com.oreilly.servlet 设置重命名策略后 getAbsolutePath() 存在的bug。
        String parentDir = fileName.substring(0,8);
        String filePath = uploadPath + File.separator + parentDir + File.separator + fileName;
        Map<String,String> result = new HashMap<String, String>();
        result.put("fileName",originalFileName);
        result.put("filePath",filePath);
        renderJson(result);
    }

}
