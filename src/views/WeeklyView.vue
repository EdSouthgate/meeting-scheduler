<script setup lang="ts">
import MeetingView from '../components/MeetingComponent.vue';
import type Meeting from '../types/Meeting';
import { useMeetingsStore } from '../stores/MeetingsStore';
import NewMeetingComponent from '@/components/NewMeetingComponent.vue';

const meetingsStore = useMeetingsStore();
meetingsStore.loadFromLocalStorage();

const thisWeeksMeetings = meetingsStore.thisWeeksMeetings;

function handleSaveEvent(meeting: Meeting) {
    meetingsStore.updateMeeting(meeting);
}

function handleRemoveMeeting(meetingId: string) {
    meetingsStore.deleteMeeting(meetingId);
}

function handleSaveNewMeeting(meeting: Meeting) {
    meetingsStore.addMeeting(meeting);
}


</script>
<template>
    <main class="bg-gray-800 h-screen w-full flex justify-center">
        <div class="bg-gray-500 w-1/2 rounded">
            <h2 class="text-2xl font-sans text-gray-50 p-4 border-b-2 border-black">Today</h2>
            <ul>
                <template v-if="thisWeeksMeetings.length > 0">
                <MeetingView v-for="meeting in thisWeeksMeetings" v-bind:meeting="meeting" :key="meeting.id"
                    @save="handleSaveEvent($event)" @remove="handleRemoveMeeting($event)" />
                </template> 
                <li v-else>No meetings scheduled today, please add some meetings to get started.</li>
            </ul>
            <div>
                <NewMeeting @save="handleSaveNewMeeting($event)" />
            </div>
        </div>
    </main>
</template>