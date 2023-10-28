<script setup lang="ts">
import MeetingView from '../components/MeetingView.vue';
import NewMeeting from '../components/NewMeeting.vue';
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
    console.log('handleRemoveMeeting', meetingId)
    meetingsStore.deleteMeeting(meetingId);
}

</script>

<template>
    <main>
        <div>
            <h1>View all meetings</h1>
            <ul>
                <MeetingView v-for="meeting in meetings" v-bind:meeting="meeting" :key="meeting.id"
                    @save="handleSaveEvent($event)" @remove="handleRemoveMeeting($event)" />
            </ul>
        </div>
        <div>
            <NewMeeting @save="handleSaveNewMeeting($event)" />
        </div>
    </main>
</template>
