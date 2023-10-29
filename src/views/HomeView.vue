<script setup lang="ts">
import MeetingView from '../components/MeetingComponent.vue';
import NewMeeting from '../components/NewMeetingComponent.vue';
import type Meeting from '../types/Meeting';
import { useMeetingsStore } from '../stores/MeetingsStore';
import { storeToRefs } from 'pinia';


const meetingsStore = useMeetingsStore();
meetingsStore.loadFromLocalStorage();

const {meetings} = storeToRefs(meetingsStore);

function handleSaveEvent(meeting: Meeting) {
    meetingsStore.updateMeeting(meeting);
}

function handleSaveNewMeeting(meeting: Meeting) {
    meetingsStore.addMeeting(meeting);
}

function handleRemoveMeeting(meetingId: string) {
    meetingsStore.deleteMeeting(meetingId);
}

</script>

<template>
    <main class="bg-gray-800 h-screen w-full flex justify-center">
        <div class="bg-gray-500 w-1/2 rounded">
            <h2 class="text-2xl font-sans text-gray-50 p-4 border-b-2 border-black">All meetings</h2>
            <ul>
                <template v-if="meetings.length > 0">
                <MeetingView v-for="meeting in meetings" v-bind:meeting="meeting" :key="meeting.id"
                    @save="handleSaveEvent($event)" @remove="handleRemoveMeeting($event)" />
                </template> 
                <li v-else>No meetings to view, please add some meetings to get started.</li>
            </ul>
            <div>
                <NewMeeting @save="handleSaveNewMeeting($event)" />
            </div>
        </div>
    </main>
</template>
