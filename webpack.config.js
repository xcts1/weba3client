var config = {
   entry: './main.js',

   output: {
      // path: '/',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080,
      historyApiFallback: true,
      historyApiFallback: { index: './index.html' },
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         }
      ]
   }
}

module.exports = config;