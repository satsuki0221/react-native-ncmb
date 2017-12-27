const path = require('path');

function srcPath(subdir) {
  return path.join(__dirname, 'src', subdir);
}

module.exports = {
  context: __dirname,
  entry: {
    application: './src/test.ts',
  },
  output: {
    path: __dirname,
    filename: 'index.web.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      types: srcPath('types/'),
      lib: srcPath('lib/'),
      utils: srcPath('utils/'),
      ncmb: srcPath('ncmb'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loaders: [
          'ts-loader',
        ],
      },
    ],
  },
};
