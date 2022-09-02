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