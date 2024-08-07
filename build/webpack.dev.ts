import path from 'path'
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const publicPath = path.join(__dirname, '../public')

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin() // 添加热更新插件
  ],
  devServer: {
    host,
    port,
    open: true, // 是否自动打开
    compress: true, // gzip压缩, 开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    static: {
      directory: publicPath // 托管静态资源public文件夹
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
})

export default devConfig
