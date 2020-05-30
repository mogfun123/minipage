
const { override, overrideDevServer, addLessLoader, addPostcssPlugins, fixBabelImports } = require('customize-cra');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 打包配置
const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置
    config.output.path = __dirname + '../dist/mini/';
    config.output.publicPath = './mini';
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024,
      }),
    )
  }
  return config;
}
// 跨域配置
const devServerConfig = () => config => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        // target: 'http://47.56.176.252:8890',
        target: 'http://47.244.3.193:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api',
        },
      }
    }
  }
}
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    //addLessLoader(),
    // addPostcssPlugins([require('postcss-pxtorem')({ rootValue: 75, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })]),
    //addCustomize(),
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}
