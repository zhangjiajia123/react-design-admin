const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      '@babel/preset-env',
      {
        // 明确指定浏览器兼容性列表以确保与项目需求一致
        targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'] },
        useBuiltIns: 'usage', // 按需引入Polyfill，减少打包体积
        corejs: {
          version: 3, // 指定CoreJS版本
          proposals: true // 开启对实验性特性支持的选项
        },
        loose: true // 采用宽松模式进行转换，视项目复杂度进行调整
      }
    ],
    // 为了确保与旧版React的兼容性，进行显式配置（假设项目中已确认不存在兼容问题）
    ['@babel/preset-react', { runtime: 'automatic', importSource: 'react' }],
    // 处理TypeScript语法
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    isDEV && require.resolve('react-refresh/babel')
  ].filter(Boolean) // 过滤空值
}
