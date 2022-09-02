<template>
    <div>count is {{ count }}</div>
    <button @click="count++">add</button>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>