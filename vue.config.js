const { DefinePlugin } = require('webpack');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: process.env.VUE_APP_PROXY,
    // port: 7000,
    // headers: { 'Access-Control-Allow-Origin': '*' },
  },

  pwa: {
  }
});
