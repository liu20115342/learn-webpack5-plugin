import {
    Compiler
} from 'webpack'

const pluginName = 'Plugin1'
class Plugin1 {
    apply(compiler: Compiler) {

    }
}

module.exports = Plugin1
