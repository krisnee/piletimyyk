<template>
  <div>
    <h2>Event Management</h2>
    <EventForm @event-added="fetchEvents" />
    <EventsTable :events="events" @edit-event="editEvent" />
  </div>
</template>

<script>
import EventForm from '../event/EventForm.vue'; // Kui EventManagement.vue on admin kaustas
import EventsTable from '../event/EventsTable.vue'; // Kui EventManagement.vue on admin kaustas

export default {
  components: {
    EventForm,
    EventsTable,
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async fetchEvents() {
      const response = await fetch('http://localhost:8080/events');
      this.events = await response.json();
      console.log(events.value);
    },
    async deleteEvent(event_id) {
      await fetch(`http://localhost:8080/events/${event_id}`, {
        method: 'DELETE',
      });
      this.fetchEvents(); // Uuendage ürituste loendit
      
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>