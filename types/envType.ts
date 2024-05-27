// 项目业务环境
export interface BaseEnv {
  BASE_ENV: 'development' | 'test' | 'pre' | 'production'
}
// 区分是开发模式还是打包构建模式
export interface NodeEnv {
  NODE_ENV: 'development' | 'production'
}