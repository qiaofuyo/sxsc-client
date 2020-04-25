/**
 * esline规则
 * */
module.exports = {
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境不允许有console
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
	// 解析器选项
	"parserOptions": {
		"ecmaVersion": 6, // ESLint默认为ES5语法检查。您将要覆盖到最新的受支持的JavaScript版本。
		"sourceType": "module"
	},

	"env": {
		"es6": true
	},

}
