import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from "webpack"
import { BuildOptionsT } from "./types"

function buildRules({isDev}:BuildOptionsT): webpack.RuleSetRule[] {

  const tsRule =  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const scssRule = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath: string)=> resourcePath.indexOf('.module.') !== -1,
            localIdentName: isDev ? "[name]__[path]--[hash:base64:5]" : "[hash:base64:5]",
          },
        }
      },
      "sass-loader"
    ],
  }

  return [
    tsRule,
    scssRule,
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
      loader: "url-loader",
      options: { limit: false },
    },
  ]

}

export default buildRules