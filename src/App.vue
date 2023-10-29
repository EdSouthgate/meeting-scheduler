<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavigationComponent.vue'

</script>

<template>
    <Navbar />
    <header class="bg-black text-gray-50 p-4 justify-center flex w-full relative">
            <h1 class="text-3xl font-bold font-sans">📅 Meeting Scheduler</h1>
    </header>
    <RouterView />
</template>

<style scoped>
</style>
