module.exports = {
  entry: './src/js/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/assets/js',
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ]
  }
}