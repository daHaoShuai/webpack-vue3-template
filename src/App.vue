<template>
    <div>
        {{ name }}
    </div>
    <div>
        {{ nickName }}
    </div>
</template>
<script setup>
import { toRefs } from 'vue'
import { useUserStore } from './store/modules/user'

const userStore = useUserStore()
const { name, nickName } = toRefs(userStore.userInfo)
</script>