import { reactive } from 'vue'
import { defineStore } from '../index'

export const useUserStore = defineStore('user', () => {

    const userInfo = reactive({
        name: 'admin',
        nickName: '管理员'
    })

    return {
        userInfo
    }
})