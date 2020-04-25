module.exports = {
	devServer: {  // vue-cli4写法
	// 	host: 'localhost',
		// port: 9090,
	// 	https: false,  // 如果是https接口，需要配置这个参数
		open:true,  // 配置自动启动浏览器
	//  proxy: {		// 配置跨域代理-服务器欺骗
	//  	'/api':{		// 对所有以 '/api' 开头的url做处理
	//  		target:'http://localhost:3000',		// 目标主机目标端口
	//  		changeOrigin:true,  // 如果需要跨域
	//  		pathRewrite:{
	//  			'^/api':''		// 原url默认访问主机8080端口,此处默认被target替换,现转发到主机目标端口上
	//  		}
	//  	}
	//   }
		overlay: {  // 覆盖ESlint配置，解决不让打debugger断点问题，同时显示报错信息，但可以编译成功
			warnings: false,
			errors: false
		}
	},
	// 关闭Esline
	lintOnSave: false,
	configureWebpack: {
		resolve: {
			alias: {	// 路径别名
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'api': '@/api',
				'views': '@/views'
			}
		},
	},
	// chainWebpack: config => {
	// 	config.when(process.env.NODE_ENV === 'production', config => {  // 生产环境
	// 		config.entry('app').clear().add('./src/main-prod.js')  // 自定义打包入口
			
	// 		config.set('externals', {  // 使用CDN进行打包优化
	// 			vue: 'Vue',
	// 		})
			
	// 		// config.module.rule('images')
	// 		//       .test(/\.(gif|png|jpe?g|svg)$/i)
	// 		//       .use('image-webpack-loader')
	// 		//       .loader('image-webpack-loader')
	// 		//       .options({ bypassOnDebug: true, disable: true })

 //      config.plugin('html').tap(args => {  // 首页定制
 //        args[0].isProd = true
 //        return args
 //      })
	// 	})
	// 	config.when(process.env.NODE_ENV === 'development', config => {  // 开发环境
	// 		config.entry('app').clear().add('./src/main-dev.js')
			
	// 		config.plugin('html').tap(args => {
	// 		  args[0].isProd = false
	// 		  return args
	// 		})
	// 	})
	// },
}