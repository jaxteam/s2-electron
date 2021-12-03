const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  target:'electron-renderer',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    // fallback:{
    //   "path": false,  
    //   "assert": false
    // },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
