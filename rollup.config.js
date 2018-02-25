import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";

export default {
  input: "lib/index.js",
  output: [
    {
      file: "bundle/bundle.umd.js",
      format: "umd",
      name: "sentiment"
    },
    {
      file: "bundle/bundle.cjs.js",
      format: "cjs",
      name: "sentiment"
    },
    {
      file: "bundle/bundle.es.js",
      format: "es",
      name: "sentiment"
    }
  ],
  plugins: [nodeResolve(), json(), commonjs(), uglify()]
};
