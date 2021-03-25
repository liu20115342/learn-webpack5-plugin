import {
    Compiler,
    sources
} from 'webpack'
import fs from 'fs/promises'

const pluginName = 'Plugin1'
const {RawSource} = sources
class Plugin1 {
    apply(compiler: Compiler) {
        // compiler.hooks.environment.tap(pluginName, () => {
        //     console.log('初始化插件之后立即调用');
        // })
        // compiler.hooks.afterCompile.tap(pluginName, () => {
        //     console.log('初始化插件完成后立即调用')
        // })
        // compiler.hooks.run.tap(pluginName, (compiler) => {
        //     console.log('开始打包');
        //     console.log(compiler.options.context);
        // })
        //
        // compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
        //     setTimeout(() => {
        //         console.log('emit.tap 1111')
        //         cb()
        //     }, 1000)
        // })
        //
        // compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
        //     console.log('afterEmit.tap 1111')
        // })
        //
        // compiler.hooks.done.tap(pluginName, (stats) => {
        //     console.log('done.tap 1111')
        // })
        compiler.hooks.thisCompilation.tap(pluginName,(compilation) => {
            // debugger
            compilation.hooks.additionalAssets.tapPromise(pluginName,async () => {
                const content = 'Hello plugin1'
                // @ts-ignore
                compilation.assets['a.txt'] = {
                    size(): number {
                        return content.length;
                    },
                    source(): string | Buffer {
                        return content;
                    }
                }
                return Promise.resolve();
            })

        })
    }
}

module.exports = Plugin1
