const Plugin1 = require('./buildPlugins/plugin');


module.exports = {
    mode: 'none',
    plugins: [
        new Plugin1(),
    ]
}
