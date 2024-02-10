import path from 'path';


export default {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path:  path.resolve(process.cwd(), 'lib'),
    filename: 'index.js',
    library: 'anyback-react',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

    ],
  },
};
