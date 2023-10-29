<script setup lang="ts">
    import { useMeetingsStore } from '@/stores/MeetingsStore';

    const meetingsStore = useMeetingsStore();
    meetingsStore.loadFromLocalStorage();

    const dailyMeetingsCount = meetingsStore.dailyMeetingsCount;
    const weeklyMeetingsCount = meetingsStore.weeklyMeetingsCount;

</script>

<template>
    <nav class="p-4 flex justify-evenly bg-gray-800 text-gray-50">
        <router-link to="/"><button class="bg-gray-400 p-4 rounded">🏠 Home</button></router-link>
        <router-link to="/daily"><button class="bg-gray-400 p-4 rounded relative">☀️ Today <div v-if="dailyMeetingsCount > 0" class="bg-red-700 rounded-full w-8 h-8 flex justify-center content-center text-center absolute -top-4 -right-4 text-sm leading-7">{{ dailyMeetingsCount }}</div></button></router-link> 
        <router-link to="/weekly"><button class="bg-gray-400 p-4 rounded relative">💼 This Week <div v-if="weeklyMeetingsCount > 0" class="bg-red-700 rounded-full w-8 h-8 flex justify-center content-center text-center absolute -top-4 -right-4 text-sm leading-7">{{ weeklyMeetingsCount }}</div></button></router-link>
    </nav>
</template>

<style>
</style>

