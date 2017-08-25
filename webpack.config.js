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
    extensions: [".ts", ".tsx", ".js", ".json"]
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
