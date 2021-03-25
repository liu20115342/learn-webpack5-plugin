import {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook,
    Hook,
    UnsetAdditionalOptions,
} from 'tapable'

interface Hooks {
    go: SyncHook<string, void, UnsetAdditionalOptions>,
    leave: AsyncSeriesHook<any, UnsetAdditionalOptions>
}

class Lesson {
    hooks: Hooks;
    constructor() {
        this.hooks = {
            go: new SyncHook(['address']),
            // 并行钩子
            leave: new AsyncSeriesHook(['name', 'age'])
        }
    }

    tap() {
        this.hooks.go.tap('class0318', (address) => {
            console.log('class0318', address)
        })
        this.hooks.go.tap('class0320', (address) => {
            console.log('class0320', address)
        })

        this.hooks.leave.tapPromise('class0510', (name, age) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('class0510', name, age)
                    resolve()
                }, 2000)
            })

        })
        this.hooks.leave.tapPromise('class0610', (name, age) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('class0610', name, age)
                    resolve()
                }, 1000)
            })

        })
    }
    start() {
        // 触发钩子
        this.hooks.go.call('c318')
        this.hooks.leave.callAsync('jack', '123')
    }
}

const l = new Lesson()
l.tap()
l.start()
