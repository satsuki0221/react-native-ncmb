module.exports = {
  context: __dirname,
  entry: {
    application: './lib/ncmb.js',
  },
  output: {
    path: __dirname,
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['flow', 'es2015'],
          plugins: ['transform-flow-strip-types'],
        },
      },
    ],
  },
};
