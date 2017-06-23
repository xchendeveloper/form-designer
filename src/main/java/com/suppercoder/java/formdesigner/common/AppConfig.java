package com.suppercoder.java.formdesigner.common;

import com.jfinal.config.*;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import com.jfinal.template.Engine;
import com.jfinal.upload.OreillyCos;
import com.suppercoder.java.formdesigner.common.handler.AccessControlAllowHandler;
import com.suppercoder.java.formdesigner.common.model._MappingKit;
import com.suppercoder.java.formdesigner.common.system.SystemRouter;
import com.suppercoder.java.formdesigner.common.system.upload.UploadFileRenamePolicy;
import com.suppercoder.java.formdesigner.designer.DesignerRouter;


public class AppConfig extends JFinalConfig {

	/**
	 * 配置常量
	 */
	public void configConstant(Constants constants) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		PropKit.use("default.properties");
		constants.setDevMode(PropKit.getBoolean("system.devMode", false));
		constants.setBaseUploadPath(PropKit.get("file.uploadPath"));
		constants.setEncoding("utf-8");
		//不设置默认使用jfinal模板引擎
		//constants.setViewType(ViewType.JFINAL_TEMPLATE);
	}
	
	/**
	 * 配置路由
	 */
	public void configRoute(Routes routes) {
		routes.add(new SystemRouter());
		routes.add(new DesignerRouter());
	}
	
	public void configEngine(Engine engine) {
		engine.setDevMode(true);

		/*engine.setBaseTemplatePath(PathKit.getWebRootPath()); 框架默认设置，不需要自己设置*/
		/*engine.addSharedFunction("/resource/include/_static_resource.html");*/
	}
	
	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins plugins) {

		//缓存插件
		plugins.add(new EhCachePlugin());

		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		plugins.add(druidPlugin);
		
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
		// 所有映射在 MappingKit 中自动化搞定
		_MappingKit.mapping(arp);
		plugins.add(arp);

	}
	
	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbc.url"), PropKit.get("jdbc.username"), PropKit.get("jdbc.password").trim());
	}
	
	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors interceptors) {

	}
	
	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers handlers) {
		handlers.add(new AccessControlAllowHandler());
		/*handlers.add(new HtmlHandler());*/

	}

	@Override
	public void afterJFinalStart() {
		OreillyCos.setFileRenamePolicy(new UploadFileRenamePolicy());
	}
}
