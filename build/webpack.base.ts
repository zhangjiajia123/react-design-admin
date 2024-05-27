import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as dotenv from "dotenv";
const path = require("path");

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
        test: /\.(css|less|sass|scss)$/, // 匹配文件名
        use: [
          "style-loader",
          "css-loader",
        ], // 使用的loader，从右向左
      }
    ],
  },
  // 性能相关的配置
  // performance: {
  //   hints: 'error', // 提示但不阻止构建
  //   maxAssetSize: process.env.MAX_ASSET_SIZE, // 设置最大资源大小警告阈值
  //   maxEntrypointSize: process.env.MAX_ENTRYPOINT_SIZE, // 设置最大入口文件大小警告阈值
  //   assetFilter: function(assetFilename: string) {
  //     // 扩展过滤器条件以包含其他可能影响性能的文件类型
  //     return assetFilename.endsWith('.js') || assetFilename.endsWith('.css') || assetFilename.endsWith('.png') || assetFilename.endsWith('.jpg');
  //   }
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "../src"),
      // "@assets": path.join(__dirname, "../src/assets"),
      // "@components": path.join(__dirname, "../src/components"),
      // "@pages": path.join(__dirname, "../src/pages"),
      // "@utils": path.join(__dirname, "../src/utils"),
      // "@store": path.join(__dirname, "../src/store"),
    },
    // modules: [path.resolve(__dirname, "../node_modules")]
  },
  // plugins 的配置
  plugins: [
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
  ]
}
export default baseConfig