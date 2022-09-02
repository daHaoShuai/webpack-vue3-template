# webpack手动搭建vue3开发环境

安装依赖

```
pnpm add @vue/compiler-sfc clean-webpack-plugin css-loader friendly-errors-webpack-plugin html-webpack-plugin style-loader vue vue-loader webpack webpack-cli webpack-dev-server
```

```
{
    "scripts": {
        "dev": "webpack-dev-server",
        "build": "webpack"
    },
    "dependencies": {
        "@vue/compiler-sfc": "^3.2.38",
        "clean-webpack-plugin": "^4.0.0",
        "css-loader": "^6.7.1",
        "friendly-errors-webpack-plugin": "^1.7.0",
        "html-webpack-plugin": "^5.5.0",
        "style-loader": "^3.3.1",
        "vue": "^3.2.38",
        "vue-loader": "^17.0.0",
        "webpack": "^5.74.0",
        "webpack-cli": "^4.10.0",
        "webpack-dev-server": "^4.10.1"
    }
}
```

webpack.config.js

```
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 解析html的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 解析.vue文件的插件
const { VueLoaderPlugin } = require('vue-loader/dist/index')
// 自定义一些打印信息
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    // 打包模式
    mode: 'production',
    // 入口文件
    entry: './src/main.js',
    module: {
        // 配置解析规则
        rules: [
            // 解析.vue文件
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // 解析css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // 打包后的文件
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // 配置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.vue', '.js']
    },
    stats: 'errors-only',
    devServer: {
        port: 9090
    },
    plugins: [
        // 清除上一次打包目录中的文件
        new CleanWebpackPlugin(),
        // 自定义一些打印信息
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['服务启动了,请访问: http://localhost:9090']
            }
        }),
        // 解析html文件
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        // 解析.vue文件
        new VueLoaderPlugin()
    ],
    // 不打包一些依赖,使用cdn
    externals: {
        vue: 'Vue'
    }
}
```