package com.suppercoder.java.formdesigner.common.plugin.kaptcha;

import com.google.code.kaptcha.util.Config;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.IPlugin;

import javax.imageio.ImageIO;
import java.util.Properties;

/**
 * Created by chenxing on 2017-3-7.
 */
public class KaptchaPlugin extends KaptchaKit implements IPlugin {

    private boolean isStarted = false;
    private Properties props = new Properties();
    private String propFile = null;
    String[] properties = new String[]{
            "kaptcha.border",
            "kaptcha.border.color",
            "kaptcha.border.thickness",
            "kaptcha.producer.impl",
            "kaptcha.textproducer.impl",
            "kaptcha.textproducer.char.string",
            "kaptcha.textproducer.char.length",
            "kaptcha.textproducer.font.names",
            "kaptcha.textproducer.font.size",
            "kaptcha.textproducer.font.color",
            "kaptcha.textproducer.char.space",
            "kaptcha.noise.impl",
            "kaptcha.noise.color",
            "kaptcha.obscurificator.impl",
            "kaptcha.word.impl",
            "kaptcha.background.impl",
            "kaptcha.background.clear.from",
            "kaptcha.background.clear.to",
            "kaptcha.image.width",
            "kaptcha.image.height",
            "kaptcha.session.key",
            "kaptcha.session.date"
    };

    public KaptchaPlugin(){
    }

    public KaptchaPlugin(String propFile){
        this.propFile = propFile;
    }


    public boolean start() {
        if(this.isStarted) {
            return true;
        }
        if(propFile != null){
            Prop prop = PropKit.use(propFile);
            ImageIO.setUseCache(false);

            for (String property : properties){
                String value = prop.get(property,"");
                if(!value.equals("")){
                    this.props.put(property, value);
                }
            }
        }

        Config config = new Config(this.props);
        setAll(config.getProducerImpl(),config.getSessionKey(),config.getSessionDate());

        this.isStarted = true;
        return true;
    }

    public boolean stop() {
        return true;
    }

}
