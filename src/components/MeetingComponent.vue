<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import type Meeting from '../types/Meeting'
import { toTwoDigits } from '../utils/utils';

const props = defineProps<{ meeting: Meeting }>();

const $emit = defineEmits(['save', 'remove']);

let editing = ref(false);

let editedMeeting = ref<Meeting>(props.meeting);

const todaysDate = new Date();

const minInputFormattedDate = `${todaysDate.getFullYear()}-${toTwoDigits(todaysDate.getMonth() + 1)}-${toTwoDigits(todaysDate.getDate())}T${toTwoDigits(todaysDate.getHours())}:${toTwoDigits(todaysDate.getMinutes())}}`

const maxInputFormattedDate = `${todaysDate.getFullYear() + 1}-${toTwoDigits(todaysDate.getMonth() + 1)}-${toTwoDigits(todaysDate.getDate())}T${toTwoDigits(todaysDate.getHours())}:${toTwoDigits(todaysDate.getMinutes())}}`

const inputFormattedDate = computed(() => {
    return `${props.meeting.date.getFullYear()}-${toTwoDigits(props.meeting.date.getMonth() + 1)}-${toTwoDigits(props.meeting.date.getDate())}T${toTwoDigits(props.meeting.date.getHours())}:${toTwoDigits(props.meeting.date.getMinutes())}`;
})

function editMeeting(): void {
    editing.value = true;
}

function handleRemoveClick(): void {
    $emit('remove', props.meeting.id);
}

function handleSaveClicked(): void {
    $emit('save', editedMeeting.value);
    editing.value = false;
}


function handleDateInput(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
        editedMeeting.value.date = new Date(e.target.value);
    }
}

</script>


<template>
    <li v-if="!editing" class="bg-white border-b-2 border-black p-4 flex justify-evenly relative">
        <div class="w-2/3">
            <h3 class="text-2xl">{{ meeting.name }}</h3>
            <p v-if="meeting.date">Date : {{ meeting.date.getDate() }}/{{ meeting.date.getMonth() + 1 }}/{{
                meeting.date.getFullYear() }}</p>
            <p v-if="meeting.date">Time : {{ toTwoDigits(meeting.date.getHours()) }}:{{
                toTwoDigits(meeting.date.getMinutes()) }}</p>
        </div>
        <div class="w-1/3 flex justify-evenly content-center h-100 items-center">
            <button @click="editMeeting()" class="w-32 py-0 h-16 bg-slate-800 rounded text-gray-50">✏️ Edit</button>
            <button @click="handleRemoveClick()" class="w-32 h-16 bg-slate-800 rounded text-gray-50">🗑️ Remove</button>
        </div>
    </li>
    <li v-else class="bg-gray-400 border-b-2 border-black p-4">
        <form class="flex flex-col h-56 justify-evenly w-100 items-start">
            <label for="name">Meeting name :</label>
            <input id="name" placeholder="Name" class="p-1 rounded w-64 text-base text-gray-800" type="text"
                v-model="editedMeeting.name" />
            <label for="date">Date and time :</label>
            <input id="date" class="p-1 rounded w-64 text-gray-800" type="datetime-local" :value="inputFormattedDate"
                @input="handleDateInput($event)" :min="minInputFormattedDate" :max="maxInputFormattedDate" />
            <div>
                <button class="w-32 h-8 bg-slate-800 rounded text-gray-50" @click="handleSaveClicked()">Save</button>
            </div>
        </form>
    </li>
</template>

<style scoped>
</style>

