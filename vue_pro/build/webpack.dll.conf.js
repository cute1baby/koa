var path = require('path')
var webpack = require('webpack')

var context = path.join(__dirname, '..')

module.exports = {
  entry: {
    vendor: ['./src/vendor.js'] // entry 以项目根目录为起始路径
  },
  output: {
    // 将打包后的 js 放到 static 目录下，build的时候会copy到dist目录
    path: path.join(context, 'static/js'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(context, '[name].manifest.json'),
      name: '[name]',
      context: context
    }),
    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: { // 删除打包后的注释
        comments: false
      }
    })
  ]
}
