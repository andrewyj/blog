'use strict'

const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.VUE_APP_STATIC_PATH,
    outputDir: 'dist',
    assetsDir: process.env.VUE_APP_ASSETS_DIR,
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
      port: 9527,
      open: true,
      overlay: {
        warnings: false,
        errors: true
      },
    },
    configureWebpack: {
        //    @路径走src文件夹
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
}