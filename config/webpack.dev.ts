import path from "path";
import { merge } from "webpack-merge";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

import baseConfig from "./webpack.config";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

const devConfig: Configuration = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    host, // 地址
    port, // 端口
    open: true, // 是否自动打开，关闭
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
    },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});

export default devConfig;
