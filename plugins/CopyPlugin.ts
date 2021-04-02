import path from 'path';
import { readFile } from 'fs/promises';
import {
    Compiler,
    sources
} from 'webpack'
import globby from "globby";
interface Options {
    from: string,
    to?: string,
    ignore?: string[]
}
const {RawSource} = sources;
const pluginName = 'CopyWebpackPlugin';
class CopyWebpackPlugin {
    options: Options;
    constructor(options: Options) {
        this.options = options;
    }
    apply(compiler: Compiler) {
        // 初始化compilation
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            // 添加资源的hooks
            compilation.hooks.additionalAssets.tapAsync(pluginName, async (cb) => {
                // 重from中的资源复制到to中，输出出去
                const {from, ignore, to = '.'} = this.options;
                // 1 读取from中的资源
                // context 是webpack配置
                const context = compiler.options.context;
                console.log(context, ignore);
                // 1.1 输入入境变成绝对路径
               const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context!, from);
                console.log(absoluteFrom);
                const paths = await globby(absoluteFrom, {
                    ignore
                })
                console.log(paths);
                // 读取paths的资源
                const files = await Promise.all(
                    paths.map(async (absolutePath) => {
                        // 读取文件
                        const data = await readFile(absolutePath);
                        // 文件名称
                        const relativePath = path.basename(absolutePath);
                        // 和to拼接
                        const filename = path.join(to, relativePath);
                        return {
                            data,
                            filename
                        }
                    })
                )
                const assets = files.map((file) => {
                    const source = new RawSource(file.data);
                    return {
                        source,
                        filename: file.filename
                    }
                })
                // 4 添加compilation中输出出去
                assets.forEach((asset) => {
                    compilation.emitAsset(asset.filename, asset.source);
                })
                cb();
            })
        })
    }
}

module.exports = CopyWebpackPlugin;
