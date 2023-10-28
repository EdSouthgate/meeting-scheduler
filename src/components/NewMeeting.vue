<script setup lang="ts">
import { ref } from 'vue';
import type Meeting from '../types/Meeting';
import { v4 as uuidv4 } from 'uuid';

let addingMeeting = ref(false);

const $emit = defineEmits(['save']);

const todaysDate = new Date();

let editedMeeting = ref<Meeting>({
    id: uuidv4(),
    name: '',
    date: new Date()
});

const minInputFormattedDate = `${todaysDate.getFullYear()}-${toTwoDigits(todaysDate.getMonth() + 1)}-${toTwoDigits(todaysDate.getDate())}T${toTwoDigits(todaysDate.getHours())}:${toTwoDigits(todaysDate.getMinutes())}}`

const maxInputFormattedDate = `${todaysDate.getFullYear() + 1}-${toTwoDigits(todaysDate.getMonth() + 1)}-${toTwoDigits(todaysDate.getDate())}T${toTwoDigits(todaysDate.getHours())}:${toTwoDigits(todaysDate.getMinutes())}}`

function toTwoDigits(num: number): string {
    return ("0" + num.toString()).slice(-2);
}

function handleDateInput(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
        editedMeeting.value.date = new Date(e.target.value);
    }
}

function handleSaveClicked(): void {
    $emit('save', editedMeeting.value);
    addingMeeting.value = false;
    editedMeeting.value = {
        id: uuidv4(),
        name: '',
        date: new Date()
    };
}

</script>

<template>
    <main>
        <div v-if="!addingMeeting">
            <button @click="addingMeeting = true">Add Meeting</button>
        </div>
        <div v-else>
            <input type="text" v-model="editedMeeting.name" />
            <input type="datetime-local" @input="handleDateInput($event)" :min="minInputFormattedDate"
                :max="maxInputFormattedDate" />
            <button @click="handleSaveClicked()">Save</button>
        </div>
    </main>
</template>


