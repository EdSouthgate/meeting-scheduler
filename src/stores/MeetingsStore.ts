import { defineStore } from 'pinia';
import Meeting from '../types/Meeting';
import { Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const ls = <T>(id: string, defaultValue: T): Ref<T> => useLocalStorage(id, defaultValue);

type StateShape = {
  meetings: Meeting[]
}

export const useMeetingsStore = defineStore('MeetingsStore', {
  state: (): StateShape => ({
    meetings:   [],
  }),
  getters: {},
  actions: {
    saveToLocalStorage() {
      const meetingsWithStringDates = this.meetings.map((meeting) => {
        return {
          ...meeting,
          date: meeting.date.toString(),
        }
      });
      localStorage.setItem('meetings', JSON.stringify(meetingsWithStringDates))
    },
    loadFromLocalStorage() {
      const meetings = JSON.parse(localStorage.getItem('meetings'));
      const meetingsWithDates = meetings.map((meeting) => {
        return {
          ...meeting,
          date: new Date(meeting.date),
        }
      });
      if (meetings) {
        this.meetings = meetingsWithDates
      }
    },
    addMeeting(meeting: Meeting) {
      this.meetings.push(meeting)
      this.saveToLocalStorage();
    },
    deleteMeeting(id: string) {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== id)
      this.saveToLocalStorage();
    },
    updateMeeting(meeting: Meeting) {
      const index = this.meetings.findIndex((m) => m.id === meeting.id)
      this.meetings[index] = meeting
      this.saveToLocalStorage();
    },
  }
})
