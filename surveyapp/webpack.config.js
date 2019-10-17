const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"]
              }
            ]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          "less-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [htmlPlugin, new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "app.js"
  }
};
