const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: "http://192.168.0.101/",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});
