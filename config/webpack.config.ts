import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const path = require("path");

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);
console.log("__dirname", path.resolve(__dirname, "../node_modules"));

const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"),

  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "../build"),
    clean: true,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: "babel-loader",
      },
      {
        test: /.css$/, //匹配 css 文件
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    // 依次匹配添加文件后缀
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.join(__dirname, "../src"),
      pages: path.join(__dirname, "../src/pages"),
      components: path.join(__dirname, "../src/components"),
    },
    // 查找第三方模块只在本项目的node_modules中查找
    // 可能有坑，启动时候会报一些依赖没有安装，只需要安装这些依赖就可以解决
    modules: [path.resolve(__dirname, "../node_modules")],
    // [path.resolve(__dirname, "../node_modules"),"node_modules"] 会一层层向上找
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      inject: true,
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
    }),

    // 定义开发环境变量
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};

export default baseConfig;
