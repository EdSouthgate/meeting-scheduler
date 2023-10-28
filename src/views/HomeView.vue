<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import MeetingView from '../components/MeetingView.vue';
import NewMeeting from '../components/NewMeeting.vue';
import type Meeting from '../types/Meeting';
import { v4 as uuidv4 } from 'uuid';

var meetings: Ref<Meeting[]> = ref([{ id: uuidv4(), name: 'Standup', date: new Date('December 17, 1995 03:24:00') }, { id: uuidv4(), name: 'Planning', date: new Date('December 17, 1995 03:24:00') }, { id: uuidv4(), name: 'Retrospective', date: new Date('January 16, 2024 07:23:00') }]);

function handleSaveEvent(meeting: Meeting) {
    meetings.value = meetings.value.map((m) => {
        if (m.id === meeting.id) {
            return meeting;
        }
        return m;
    });
}

function handleSaveNewMeeting(meeting: Meeting) {
    meetings.value = [...meetings.value, meeting];
}

function handleRemoveMeeting(meetingId: string) {
    meetings.value = meetings.value.filter((m) => m.id !== meetingId);
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
