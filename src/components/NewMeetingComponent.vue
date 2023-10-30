<script setup lang="ts">
import { ref } from 'vue';
import type Meeting from '../types/Meeting';
import { v4 as uuidv4 } from 'uuid';
import { toTwoDigits } from '@/utils/utils';

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

const errors = ref<string[]>([]);

function handleDateInput(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
        editedMeeting.value.date = new Date(e.target.value);
    }
}

function handleSaveMeeting($event: Event): void {
    errors.value = [];
    $event.preventDefault();
    if (!editedMeeting.value.name) {
        errors.value.push('Name is required');
    }
    if (!editedMeeting.value.date) {
        errors.value.push('Date is required');
    }
    if (editedMeeting.value.date < todaysDate) {
        errors.value.push('Date must be in the future');
    }
    if (editedMeeting.value.name.length > 50) {
        errors.value.push('Name must be less than 50 characters');
    }
    if (editedMeeting.value.name.length < 3) {
        errors.value.push('Name must be more than 3 characters');
    }
    if (errors.value.length > 0) {
        return;
    }
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
        <div v-if="!addingMeeting" class="w-100 flex justify-end p-8">
            <button class="w-64 h-16 bg-slate-800 rounded text-gray-50" @click="addingMeeting = true">➕ Add Meeting</button>
        </div>
        <form v-else @submit="handleSaveMeeting($event)" class="flex justify-around p-8">
            <p v-for="error in errors" :key="error">{{ error }}</p>
            <label class="text-gray-50 text-1xl font-bold" for="name">Meeting name :
                <input id="name" placeholder="Name" type="text" v-model="editedMeeting.name"
                    class="w-64 rounded p-1 text-gray-800" />
            </label>
            <label class="text-gray-50 text-1xl font-bold" for="date">Meeting date and time:
                <input id="date" type="datetime-local" class="w-64 rounded p-1 text-gray-800"
                    @input="handleDateInput($event)" :min="minInputFormattedDate" :max="maxInputFormattedDate" />
            </label>
            <button class="w-32 h-8 bg-slate-800 rounded text-gray-50" type="submit">Save</button>
        </form>
    </main>
</template>


