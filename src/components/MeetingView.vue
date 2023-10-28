<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import Meeting from '../types/Meeting'

const props = defineProps<{ meeting: Meeting }>();

const $emit = defineEmits(['save', 'remove']);

let editing = ref(false);

let editedMeeting = ref<Meeting>(props.meeting);

const inputFormattedDate = computed(() => {
    return `${props.meeting.date.getFullYear()}-${toTwoDigits(props.meeting.date.getMonth() + 1)}-${toTwoDigits(props.meeting.date.getDate())}T${toTwoDigits(props.meeting.date.getHours())}:${toTwoDigits(props.meeting.date.getMinutes())}`;
})

function editMeeting(e: Event) {
    console.log(inputFormattedDate.value)
    editing.value = true;
}

function handleRemoveClick(e: Event) {
    $emit('remove', props.meeting.id);
}

function handleSaveClicked(e: Event) {
    $emit('save', editedMeeting.value);
    editing.value = false;
}

function toTwoDigits(num: number) {
    return ("0" + num.toString()).slice(-2);
}

function handleDateInput(e: Event) {
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
            <button @click="handleRemoveClick($event)">Remove</button>
            <button @click="editMeeting($event)">Edit</button>
        </li>
        <li v-else>
            <h2>Edit Meeting</h2>
            <input type="text" v-model="editedMeeting.name" />
            <input type="datetime-local" :value="inputFormattedDate" @input="handleDateInput($event)" />
            <button @click="handleSaveClicked($event)">Save</button>
        </li>
    </main>
</template>

<style scoped>
</style>

