import { Configuration, sources } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";

import baseConfig from "./webpack.config";
import path from "path";

const prodConfig: Configuration = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../build"),
          filter: (sources) => !sources.includes("index.html"),
        },
      ],
    }),
  ],
});

export default prodConfig;
