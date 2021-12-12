const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const TerserPlugin = require('terser-webpack-plugin')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.less$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true
      },
    },
  },],
});

// plugins.push({
//     "libraryName": "antd",
//     "libraryDirectory": "lib",   // default: lib
//     "style": true
// })

module.exports = {
  target: 'electron-renderer',
  module: {
    rules,
  },
  plugins: plugins,
  externals: ['canvas'],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          keep_classnames: true,
          keep_fnames: true,
          compress: true
        }
      })
    ]
  },
  resolve: {
    // fallback:{
    //   "path": false,  
    //   "assert": false
    // },
    alias: {
      "react/jsx-runtime": require.resolve("react/jsx-runtime")
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
