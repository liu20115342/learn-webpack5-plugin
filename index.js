const webpackConfig = require('./webpack.config');

const webpack = require('webpack')

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
    if (err) {
        console.log('错误: ', err);
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.log('构建失败: ', info.errors);
    } else {
        console.log('构建成功');
    }
})
