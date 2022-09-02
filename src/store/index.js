import { reactive, inject } from 'vue'

export const createStore = () => {
    return {
        install(app) {
            // 创建根存储            
            const store = reactive({})
            app.provide('root_store', store)
            app.provide('setStore', (id, values) => {
                store[id] = values
            })
        }
    }
}

export const defineStore = (id, callback) => () => {
    const root = inject('root_store')
    // 如果没有创建过就创建,否则就找到返回
    if (!root[id]) {
        const values = callback()
        const store = reactive({
            ...values
        })
        const setStore = inject('setStore')
        setStore(id, store)
    }

    return root[id]
}