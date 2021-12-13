const CopyPlugin = require("copy-webpack-plugin");
const plugins =[]
plugins.push(new CopyPlugin({
  patterns: [
    { from: "./drivers",to:"./drivers" },
  ],
}))
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  target:'electron-main',
  entry: './src/index.ts',
  plugins: plugins,
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
};