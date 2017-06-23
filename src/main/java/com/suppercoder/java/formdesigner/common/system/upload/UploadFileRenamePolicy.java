package com.suppercoder.java.formdesigner.common.system.upload;

import com.jfinal.core.JFinal;
import com.oreilly.servlet.multipart.FileRenamePolicy;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Created by chenxing on 2017-5-19.
 */
public class UploadFileRenamePolicy implements FileRenamePolicy {

    Random random = new Random();

    public File rename(File f) {
        // 用户设置的默认上传目录
        String saveDir = JFinal.me().getConstants().getBaseUploadPath();
        // 添加时间作为目录
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

        StringBuilder newFileName = new StringBuilder(saveDir)
                .append(File.separator)
                .append(dateFormat.format(new Date()))
                .append(File.separator)
                .append(dateFormat.format(new Date()) + System.currentTimeMillis() + random.nextInt())
                .append(getFileExt(f.getName()));

        File dest = new File(newFileName.toString());
        // 创建上层目录
        File dir = dest.getParentFile();
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return dest;
    }

    /**
     * 获取文件后缀
     *
     * @param @param  fileName
     * @param @return 设定文件
     * @return String 返回类型
     */
    public static String getFileExt(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'), fileName.length());
    }
}
