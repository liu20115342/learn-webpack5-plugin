import {Compiler} from 'webpack'
import fs from 'fs/promises'

const pluginName = 'Plugin1'

class Plugin1 {
    apply(compiler: Compiler) {
        compiler.hooks.environment.tap(pluginName, () => {
            console.log('初始化插件之后立即调用');
        })
        compiler.hooks.afterCompile.tap(pluginName, () => {
            console.log('初始化插件完成后立即调用')
        })
        compiler.hooks.run.tap(pluginName, (compiler) => {
            console.log('开始打包');
            console.log(compiler.options.context);
        })
        
    }
}

module.exports = Plugin1
