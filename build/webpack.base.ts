import { Configuration } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
const path = require("path");
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
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  // plugins 的配置
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      // 压缩html资源
      minify: {
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
      },
    }),
  ]
};
export default baseConfig