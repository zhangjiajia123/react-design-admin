
const path = require("path")
import * as dotenv from "dotenv"
import WebpackBar from 'webpackbar'
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, DefinePlugin } from 'webpack'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

const envConfig = dotenv.config({
  path: path.resolve(__dirname, "../.env." + process.env.BASE_ENV),
})
const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
    assetModuleFilename: 'images/[hash][ext][query]', // 这里自定义输出文件名的方式是，将某些资源发送到指定目录
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 匹配文件名
        loader: "babel-loader", // 使用的loader
        exclude: /node_modules/, // 排除node_modules文件
        options: {
          cacheDirectory: true, // 启用缓存，提升性能
        },
      },
      {
        test: /\.(css|less)$/, // 匹配文件名
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              },
            }
          },
          "postcss-loader"
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/images/[hash][ext][query]', // 文件输出目录和命名
        },
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  // plugins 的配置
  plugins: [
    new WebpackBar({
      color: "#85d",  // 默认green，进度条颜色支持HEX
      basic: false,   // 默认true，启用一个简单的日志报告器
      profile: false,  // 默认false，启用探查器
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, "../node_modules"),
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(envConfig.parsed),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // 持久化缓存
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  }
}
export default baseConfig