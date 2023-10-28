<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import type Meeting from '../types/Meeting'

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

function toTwoDigits(num: number): string {
    return ("0" + num.toString()).slice(-2);
}

function handleDateInput(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
        editedMeeting.value.date = new Date(e.target.value);
    }
}

</script>


<template>
    <main>
        <li v-if="!editing">
            <h2>{{ meeting.name }}</h2>
            <p>Date : {{ meeting.date.getDate() }}/{{ meeting.date.getMonth() + 1 }}/{{ meeting.date.getFullYear() }}</p>
            <p>Time : {{ meeting.date.getHours() }}:{{ meeting.date.getMinutes() }}</p>
            <button @click="handleRemoveClick()">Remove</button>
            <button @click="editMeeting()">Edit</button>
        </li>
        <li v-else>
            <input type="text" v-model="editedMeeting.name" />
            <input type="datetime-local" :value="inputFormattedDate" @input="handleDateInput($event)"
                :min="minInputFormattedDate" :max="maxInputFormattedDate" />
            <button @click="handleSaveClicked()">Save</button>
        </li>
    </main>
</template>

<style scoped>
</style>

