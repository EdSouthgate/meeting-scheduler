<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/NavigationComponent.vue'

</script>

<template>
    <Navbar />
    <header>
        <h1>Meeting Scheduler 📅</h1>
    </header>
    <RouterView />
</template>

<style scoped>
</style>
