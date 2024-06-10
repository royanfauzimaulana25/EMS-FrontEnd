const path = require("path");
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
  },
  templateParameters: {
    brandName: 'Event Management System',
  },
};

module.exports = {
  entry: path.join(__dirname, "src/app.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: [/\.css$/, /\.(scss)$/],
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: () => [
                require('autoprefixer')
              ]
            }
          }
        },
        {
          loader: 'sass-loader'
        }
        ],
      },
    ],
  },
  plugins: [
    // Home Page
    new HtmlWebpackPlugin({
      title: 'Home Page',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/script/view/index.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Auth Page
    new HtmlWebpackPlugin({
      title: 'Login Page',
      filename: 'auth/login.html',
      template: path.resolve(__dirname, 'src/script/view/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Registration Page',
      filename: 'auth/registration.html',
      template: path.resolve(__dirname, 'src/script/view/auth/registration.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Registration Page
    new HtmlWebpackPlugin({
      title: 'Select Competition',
      filename: 'registration/competition-option.html',
      template: path.resolve(__dirname, 'src/script/view/registration/competition-option.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'Photography Registration',
      filename: 'registration/photography/photography-registration.html',
      template: path.resolve(__dirname, 'src/script/view/registration/photography/photography-registration.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'Photography Summary',
      filename: 'registration/photography/photography-summary.html',
      template: path.resolve(__dirname, 'src/script/view/registration/photography/photography-summary.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'Basketball Registration',
      filename: 'registration/basketball/basketball-registration.html',
      template: path.resolve(__dirname, 'src/script/view/registration/basketball/basketball-registration.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'Basketball Summary',
      filename: 'registration/basketball/basketball-summary.html',
      template: path.resolve(__dirname, 'src/script/view/registration/basketball/basketball-summary.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Payment Page
    new HtmlWebpackPlugin({
      title: 'Payment',
      filename: 'payment/index.html',
      template: path.resolve(__dirname, 'src/script/view/payment/index.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src/public"),
          to: path.join(__dirname, "dist"),
        }
      ]
    })
  ]
}
