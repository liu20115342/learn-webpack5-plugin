const Plugin1 = require('./buildPlugins/plugin');
const CopyWebpackPlugin = require('./buildPlugins/CopyPlugin');

module.exports = {
    mode: 'none',
    plugins: [
        new Plugin1(),
        new CopyWebpackPlugin({
            from: 'public',
            // to: '.',
            ignore: ['**/index.html']
        })
    ]
}
