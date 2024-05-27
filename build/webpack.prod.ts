import { Configuration } from "webpack"
import { merge } from "webpack-merge"
import CopyPlugin from "copy-webpack-plugin"
import baseConfig from "./webpack.base"
const path = require("path")

console.log('----------------', process.env);
const prod: Configuration = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => !source.includes("index.html"), // 忽略index.html
        }
      ]
    })
  ]
})

export default prod
