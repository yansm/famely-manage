const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'src/www');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  //Entry point to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.jsx'),
  ],
  //Webpack config options on how to obtain modules
  resolve: {
    //When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.jsx', '.md', '.txt'],
    alias: {
    },
    //Modules will be searched for in these directories
    modulesDirectories: [
      // We need /docs/node_modules to be resolved before /node_modules
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
      path.resolve(__dirname, 'src/app'),
      path.resolve(__dirname, 'src/www'),
    ],
  },
  //Configuration for dev server
  devServer: {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    historyApiFallback:true,
    port: 3000,
  },
 
  devtool: 'eval',
  //Output file config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',  //Name of output file
  },
  plugins: [
    //Used to include index.html in build folder
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/src/www/index.html'),
    }),
    //Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    //Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
  ],
  externals: {
    fs: 'js', // To remove once https://github.com/benjamn/recast/pull/238 is released
  },
  module: {
    //eslint loader
    //Allow loading of non-es
    loaders: [
      {
        test: /\.jsx$/,
        loaders: [
          'react-hot',
          'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins[]=transform-decorators-legacy',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader',
      },
      {
        test: /\.(jpg|png|svg|otf|ttf)$/, 
        loader: "url?limit=8192|file?name=[path][name].[ext]",
      },
    ],
  },
  eslint: {
    configFile: './.eslintrc',
  },
};

module.exports = config;
