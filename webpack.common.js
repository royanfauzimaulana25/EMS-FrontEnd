const path = require("path");
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

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
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"), 
    },
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
    
    // Administrator
    new HtmlWebpackPlugin({
      title: 'Administrator',
      filename: 'admin/index.html',
      template: path.resolve(__dirname, 'src/script/view/admin/index.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Penanggung Jawab
    new HtmlWebpackPlugin({
      title: 'Penanggung Jawab - Single',
      filename: 'pj/single-pj.html',
      template: path.resolve(__dirname, 'src/script/view/pj/single-pj.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Penanggung Jawab - Team',
      filename: 'pj/team-pj.html',
      template: path.resolve(__dirname, 'src/script/view/pj/team-pj.html'),
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
      title: 'single Registration',
      filename: 'registration/single/single-registration.html',
      template: path.resolve(__dirname, 'src/script/view/registration/single/single-registration.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'single Summary',
      filename: 'registration/single/single-summary.html',
      template: path.resolve(__dirname, 'src/script/view/registration/single/single-summary.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'team Registration',
      filename: 'registration/team/team-registration.html',
      template: path.resolve(__dirname, 'src/script/view/registration/team/team-registration.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      title: 'team Summary',
      filename: 'registration/team/team-summary.html',
      template: path.resolve(__dirname, 'src/script/view/registration/team/team-summary.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Payment Page
    new HtmlWebpackPlugin({
      title: 'Payment',
      filename: 'payment/index.html',
      template: path.resolve(__dirname, 'src/script/view/payment/index.html'),
      ...htmlWebpackPluginConfig,
    }),
    
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
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
