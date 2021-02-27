const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
    ],
  },
  // resolve: {
  //   alias: {
  //     config$: './configs/app-config.js',
  //     react: './vendor/react-master',
  //   },
  //   extensions: ['', 'js', 'jsx'],
  //   modules: [
  //     'node_modules',
  //     'bower_components',
  //     'shared',
  //     '/shared/vendor/modules',
  //   ],
  // },
};
