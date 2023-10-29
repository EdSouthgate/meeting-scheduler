import { defineStore } from 'pinia';
import type Meeting from '../types/Meeting';


type StateShape = {
  meetings: Meeting[]
}

export const useMeetingsStore = defineStore('MeetingsStore', {
  state: (): StateShape => ({
    meetings:   [],
  }),
  getters: {
    todaysMeetings(): Meeting[] {
      return this.meetings.filter((meeting) => {
        const today = new Date()
        return meeting.date.getDate() === today.getDate() &&
          meeting.date.getMonth() === today.getMonth() &&
          meeting.date.getFullYear() === today.getFullYear()
      })
    },
    thisWeeksMeetings(): Meeting[] {
      const today = new Date()
      const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
      return this.meetings.filter((meeting) => {
        return meeting.date.getTime() >= today.getTime() &&
          meeting.date.getTime() <= nextWeek.getTime()
      })
    },
  },
  actions: {
    orderMeetingsByDate() {
      this.meetings = this.meetings.sort((a, b) => a.date.getTime() - b.date.getTime())
    },
    saveToLocalStorage() {
      const meetingsWithStringDates = this.meetings.map((meeting) => {
        return {
          ...meeting,
          date: meeting.date.toString(),
        }
      });
      this.orderMeetingsByDate();
      localStorage.setItem('meetings', JSON.stringify(meetingsWithStringDates))
    },
    loadFromLocalStorage() {
      const meetings = localStorage.getItem('meetings');
      if (meetings) {
        const meetingsWithDates = JSON.parse(meetings).map((meeting: any) => {
          return {
            ...meeting,
            date: new Date(meeting.date),
          }
        });
        this.meetings = meetingsWithDates
      }
    },
    addMeeting(meeting: Meeting) {
      this.meetings.push(meeting)
      this.orderMeetingsByDate();
      this.saveToLocalStorage();
    },
    deleteMeeting(id: string) {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== id)
      this.orderMeetingsByDate();
      this.saveToLocalStorage();
    },
    updateMeeting(meeting: Meeting) {
      const index = this.meetings.findIndex((m) => m.id === meeting.id)
      this.meetings[index] = meeting
      this.orderMeetingsByDate();
      this.saveToLocalStorage();
    },
  }
})
